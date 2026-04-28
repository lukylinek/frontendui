import { createGraphQLClient, gqlClient as defaultGqlClient } from "../Core/gqlClient2";

/** @type {() => void} */
const noop = () => {};

/** @type {<T>(x:T) => T} */
const identity = (x) => x;

/** @returns {Map<string, Promise<any>>} */
const createMemoryStore = () => new Map();

/**
 * @param {object} baseVars
 * @param {object|undefined} overrideVars
 */
const defaultMergeVars = (baseVars = {}, overrideVars) => {
    return overrideVars === undefined
        ? (baseVars || {})
        : { ...(baseVars || {}), ...overrideVars };
};

/** @param {any} vars */
const defaultCreateKey = (vars) => JSON.stringify(vars ?? {});

/**
 * Default dispatch kompatibilní s thunk stylem.
 *
 * - pokud je action funkce → zavolá ji jako thunk
 * - jinak vrátí hodnotu jako Promise
 *
 * @param {any} actionOrThunk
 * @returns {Promise<any>}
 */
const defaultDispatch = (actionOrThunk) => {
    if (typeof actionOrThunk === "function") {
        return Promise.resolve(
            actionOrThunk(defaultDispatch, () => ({}), undefined)
        );
    }

    return Promise.resolve(actionOrThunk);
};

/**
 * -----------------------------
 * gqlClient RESOLUTION LAYER
 * -----------------------------
 */

/**
 * @param {any} value
 * @returns {boolean}
 */
const isGraphQLClientInstance = (value) => {
    return !!value
        && typeof value === "object"
        && typeof value.request === "function"
        && typeof value.query === "function"
        && typeof value.mutate === "function";
};

/**
 * @param {any} value
 * @returns {boolean}
 */
const isGraphQLClientOptions = (value) => {
    return !!value
        && typeof value === "object"
        && !isGraphQLClientInstance(value)
        && (
            "endpoint" in value
            || "getHeaders" in value
            || "onGraphQLErrors" in value
        );
};

/**
 * @typedef {object} GraphQLClientLike
 * @property {(req:any)=>Promise<any>} request
 * @property {(query:string, vars?:any)=>Promise<any>} query
 * @property {(mutation:string, vars?:any)=>Promise<any>} mutate
 */

/**
 * gqlClient může být:
 * - instance klienta
 * - factory funkce
 * - options pro createGraphQLClient
 * - null => použije default
 *
 * @param {GraphQLClientLike | Function | object | null | undefined} gqlClientLike
 * @returns {Promise<GraphQLClientLike>}
 */
export const resolveGqlClient = async (gqlClientLike) => {
    if (!gqlClientLike) {
        return defaultGqlClient;
    }

    // factory
    if (typeof gqlClientLike === "function") {
        const resolved = await gqlClientLike();

        if (isGraphQLClientInstance(resolved)) {
            return resolved;
        }

        if (isGraphQLClientOptions(resolved)) {
            return createGraphQLClient(resolved);
        }

        if (!resolved) {
            return defaultGqlClient;
        }

        throw new Error("gqlClient factory returned unsupported value");
    }

    // instance
    if (isGraphQLClientInstance(gqlClientLike)) {
        return gqlClientLike;
    }

    // options
    if (isGraphQLClientOptions(gqlClientLike)) {
        return createGraphQLClient(gqlClientLike);
    }

    throw new Error("Unsupported gqlClient value");
};

/**
 * ---------------------------------------------------
 * CORE EXECUTION FUNCTION (framework agnostic)
 * ---------------------------------------------------
 */

/**
 * @template TResult
 * @param {object} params
 * @param {Function} params.AsyncAction
 * @param {object} [params.baseVars]
 * @param {object} [params.overrideVars]
 * @param {boolean} [params.network]
 *
 * @param {(action:any)=>Promise<any>} [params.dispatch]
 * @param {GraphQLClientLike | Function | object | null} [params.gqlClient]
 *
 * @param {Map<string, Promise<TResult>>} [params.inFlightMap]
 *
 * @param {(baseVars:object, overrideVars?:object)=>object} [params.mergeVars]
 * @param {(vars:any)=>string} [params.createKey]
 * @param {(result:any, vars:any)=>TResult} [params.transformResult]
 *
 * @param {(vars:any)=>void} [params.onStart]
 * @param {(result:TResult, vars:any)=>void} [params.onSuccess]
 * @param {(error:any, vars:any)=>void} [params.onError]
 * @param {(vars:any)=>void} [params.onFinally]
 *
 * @returns {Promise<TResult|null>}
 */
export const executeAsyncThunkAction = async ({
    AsyncAction,
    baseVars = {},
    overrideVars,
    network = true,

    dispatch = defaultDispatch,
    gqlClient = null,

    inFlightMap = createMemoryStore(),

    mergeVars = defaultMergeVars,
    createKey = defaultCreateKey,
    transformResult = identity,

    onStart = noop,
    onSuccess = noop,
    onError = noop,
    onFinally = noop,
} = {}) => {
    if (!network || !AsyncAction) {
        return null;
    }

    const mergedVars = mergeVars(baseVars, overrideVars);
    const key = createKey(mergedVars);

    const existing = inFlightMap.get(key);
    if (existing) {
        return existing;
    }

    try {
        onStart(mergedVars);

        const promise = Promise.resolve()
            .then(() => resolveGqlClient(gqlClient))
            .then((resolvedClient) =>
                dispatch(AsyncAction(mergedVars, resolvedClient))
            )
            .then((result) => {
                const finalResult = transformResult(result, mergedVars);
                onSuccess(finalResult, mergedVars);
                return finalResult;
            })
            .catch((error) => {
                onError(error, mergedVars);
                throw error;
            })
            .finally(() => {
                inFlightMap.delete(key);
                onFinally(mergedVars);
            });

        inFlightMap.set(key, promise);

        return promise;
    } catch (error) {
        onError(error, mergedVars);
        onFinally(mergedVars);
        throw error;
    }
};

/**
 * ---------------------------------------------------
 * RUNNER FACTORY
 * ---------------------------------------------------
 */

/**
 * Vytvoří znovupoužitelný runner nad `executeAsyncThunkAction`.
 *
 * Runner si zapamatuje výchozí konfiguraci (`AsyncAction`, `baseVars`, `dispatch`,
 * `gqlClient`, handlery...) a při každém volání přijme už jen volitelné `overrideVars`.
 *
 * Typicky se používá s async akcí, která je sama výstupem factory funkce,
 * například `createAsyncGraphQLAction2(...)`.
 *
 * ------------------------------------------------------------
 * KONTRAKT AsyncAction
 * ------------------------------------------------------------
 *
 * `config.AsyncAction` není obvykle "ručně psaná" funkce, ale výsledek
 * nějakého action factory volání, například:
 *
 *   const AsyncAction = createAsyncGraphQLAction2(query, ...middlewares)
 *
 * Výsledná signatura AsyncAction je:
 *
 *   AsyncAction(vars, gqlClient) => thunk
 *
 * kde vrácený thunk má typicky tvar:
 *
 *   async (dispatch, getState, next) => Promise<any>
 *
 * Runner tedy:
 * 1. sloučí `baseVars` a `overrideVars`
 * 2. vyřeší `gqlClient`
 * 3. zavolá `AsyncAction(mergedVars, gqlClient)`
 * 4. výsledek pošle do `dispatch(...)`
 *
 * ------------------------------------------------------------
 * TYPOVÝ MODEL
 * ------------------------------------------------------------
 *
 * @template TResult
 * @param {object} config
 *
 * @param {Function} config.AsyncAction
 *   Async action creator.
 *   Typicky výstup `createAsyncGraphQLAction2(...)`.
 *   Očekávaný tvar:
 *   `(vars, gqlClient) => thunk | Promise<any> | any`
 *
 * @param {object} [config.baseVars]
 *   Výchozí vstupní proměnné, které se použijí při každém spuštění runneru.
 *
 * @param {boolean} [config.network=true]
 *   Pokud je false, runner neprovede žádnou akci a vrátí `null`.
 *
 * @param {(action:any)=>Promise<any>} [config.dispatch]
 *   Dispatch funkce schopná zpracovat thunk nebo plain hodnotu.
 *
 * @param {GraphQLClientLike | Function | object | null} [config.gqlClient]
 *   GraphQL client, factory vracející client, options objekt pro vytvoření klienta,
 *   nebo `null` pro použití default klienta.
 *
 * @param {Map<string, Promise<TResult>>} [config.inFlightMap]
 *   Sdílená mapa právě běžících requestů pro deduplikaci.
 *
 * @param {(baseVars:object, overrideVars?:object)=>object} [config.mergeVars]
 *   Funkce pro sloučení `baseVars` a `overrideVars`.
 *
 * @param {(vars:any)=>string} [config.createKey]
 *   Funkce vytvářející deduplikační klíč z merged vars.
 *
 * @param {(result:any, vars:any)=>TResult} [config.transformResult]
 *   Funkce pro transformaci výsledku před vrácením callerovi.
 *
 * @param {(vars:any)=>void} [config.onStart]
 *   Callback volaný před spuštěním async akce.
 *
 * @param {(result:TResult, vars:any)=>void} [config.onSuccess]
 *   Callback volaný při úspěšném dokončení.
 *
 * @param {(error:any, vars:any)=>void} [config.onError]
 *   Callback volaný při chybě.
 *
 * @param {(vars:any)=>void} [config.onFinally]
 *   Callback volaný vždy po dokončení.
 *
 * @returns {(overrideVars?:object)=>Promise<TResult|null>}
 *   Funkce, která spustí async akci s volitelným přepsáním výchozích vars.
 *
 * @example
 * // --- 1. Typický AsyncAction vytvořený přes createAsyncGraphQLAction2 ---
 *
 * const UserReadAsyncAction = createAsyncGraphQLAction2(
 *   `
 *   query ($id: ID!) {
 *     userById(id: $id) {
 *       id
 *       name
 *     }
 *   }
 *   `
 * );
 *
 * const runner = createAsyncThunkRunner({
 *   AsyncAction: UserReadAsyncAction,
 *   baseVars: { id: 1 },
 *   dispatch: store.dispatch,
 *   gqlClient
 * });
 *
 * const user = await runner();
 * console.log(user);
 *
 * @example
 * // --- 2. Override vars při spuštění ---
 *
 * const UserReadAsyncAction = createAsyncGraphQLAction2(
 *   `
 *   query ($id: ID!) {
 *     userById(id: $id) {
 *       id
 *       name
 *     }
 *   }
 *   `
 * );
 *
 * const runner = createAsyncThunkRunner({
 *   AsyncAction: UserReadAsyncAction,
 *   baseVars: { id: 1 },
 *   dispatch: store.dispatch,
 *   gqlClient
 * });
 *
 * const user1 = await runner();
 * const user2 = await runner({ id: 2 });
 *
 * console.log(user1, user2);
 *
 * @example
 * // --- 3. gqlClient jako options objekt ---
 *
 * const UserReadAsyncAction = createAsyncGraphQLAction2(
 *   `
 *   query ($id: ID!) {
 *     userById(id: $id) {
 *       id
 *       name
 *     }
 *   }
 *   `
 * );
 *
 * const runner = createAsyncThunkRunner({
 *   AsyncAction: UserReadAsyncAction,
 *   baseVars: { id: 10 },
 *   dispatch: store.dispatch,
 *   gqlClient: {
 *     endpoint: "/api/gql",
 *     getHeaders: async () => ({
 *       Authorization: "Bearer token"
 *     })
 *   }
 * });
 *
 * const result = await runner();
 *
 * @example
 * // --- 4. Middleware v createAsyncGraphQLAction2 ---
 *
 * const logMiddleware = (result) => async (dispatch, getState, next) => {
 *   console.log("GraphQL result:", result);
 *   return next(result);
 * };
 *
 * const UserReadAsyncAction = createAsyncGraphQLAction2(
 *   `
 *   query ($id: ID!) {
 *     userById(id: $id) {
 *       id
 *       name
 *     }
 *   }
 *   `,
 *   logMiddleware
 * );
 *
 * const runner = createAsyncThunkRunner({
 *   AsyncAction: UserReadAsyncAction,
 *   baseVars: { id: 3 },
 *   dispatch: store.dispatch,
 *   gqlClient
 * });
 *
 * const result = await runner();
 *
 * @example
 * // --- 5. Transformace výsledku ---
 *
 * const UserReadAsyncAction = createAsyncGraphQLAction2(
 *   `
 *   query ($id: ID!) {
 *     userById(id: $id) {
 *       id
 *       name
 *     }
 *   }
 *   `
 * );
 *
 * const runner = createAsyncThunkRunner({
 *   AsyncAction: UserReadAsyncAction,
 *   baseVars: { id: 1 },
 *   dispatch: store.dispatch,
 *   gqlClient,
 *   transformResult: (result) => result?.data?.userById ?? null
 * });
 *
 * const user = await runner();
 * console.log(user?.name);
 *
 * @example
 * // --- 6. Lifecycle handlery ---
 *
 * const UserReadAsyncAction = createAsyncGraphQLAction2(
 *   `
 *   query ($id: ID!) {
 *     userById(id: $id) {
 *       id
 *       name
 *     }
 *   }
 *   `
 * );
 *
 * const runner = createAsyncThunkRunner({
 *   AsyncAction: UserReadAsyncAction,
 *   baseVars: { id: 1 },
 *   dispatch: store.dispatch,
 *   gqlClient,
 *   onStart: (vars) => console.log("start", vars),
 *   onSuccess: (result, vars) => console.log("success", vars, result),
 *   onError: (error, vars) => console.error("error", vars, error),
 *   onFinally: (vars) => console.log("finally", vars)
 * });
 *
 * await runner();
 *
 * @example
 * // --- 7. Použití bez explicitního gqlClient ---
 * // použije se default gqlClient
 *
 * const UserReadAsyncAction = createAsyncGraphQLAction2(
 *   `
 *   query ($id: ID!) {
 *     userById(id: $id) {
 *       id
 *       name
 *     }
 *   }
 *   `
 * );
 *
 * const runner = createAsyncThunkRunner({
 *   AsyncAction: UserReadAsyncAction,
 *   baseVars: { id: 5 },
 *   dispatch: store.dispatch
 * });
 *
 * const result = await runner();
 */
export const createAsyncThunkRunner = (config = {}) => {
    const {
        AsyncAction,
        baseVars = {},
        network = true,
        dispatch = defaultDispatch,
        gqlClient = null,
        inFlightMap = createMemoryStore(),
        mergeVars = defaultMergeVars,
        createKey = defaultCreateKey,
        transformResult = identity,
        onStart = noop,
        onSuccess = noop,
        onError = noop,
        onFinally = noop,
    } = config;

    return (overrideVars) =>
        executeAsyncThunkAction({
            AsyncAction,
            baseVars,
            overrideVars,
            network,
            dispatch,
            gqlClient,
            inFlightMap,
            mergeVars,
            createKey,
            transformResult,
            onStart,
            onSuccess,
            onError,
            onFinally,
        });
};