// useAsyncThunkAction.js
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { executeAsyncThunkAction } from "./asyncThunkExecutor";
import { selectItemById } from "../Store/ItemSlice";
import { useGQLClient } from "../Store";

/** @type {() => void} */
const noop = () => {};

/**
 * Mělké porovnání plain objektů.
 *
 * Používá se pro stabilizaci vars, aby každé nové `{}` nebo `{ id }`
 * nespouštělo zbytečně nový fetch cyklus.
 *
 * @param {any} a
 * @param {any} b
 * @returns {boolean}
 */
export const shallowEqual = (a, b) => {
    if (a === b) return true;
    if (!a || !b) return false;
    if (typeof a !== "object" || typeof b !== "object") return false;

    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);

    if (aKeys.length !== bKeys.length) return false;

    for (const key of aKeys) {
        if (a[key] !== b[key]) return false;
    }

    return true;
};

/**
 * Normalizuje vstupní vars na plain object.
 *
 * @param {object | null | undefined} vars
 * @returns {object}
 */
export const normalizeVars = (vars) => vars || {};

/**
 * Vytvoří výchozí stav hooku.
 *
 * @param {object} params
 * @param {boolean} [params.deferred=false]
 * @param {boolean} [params.network=true]
 * @returns {{loading:boolean,error:any,data:any}}
 */
export const createInitialAsyncState = ({ deferred = false, network = true } = {}) => ({
    loading: !deferred && network,
    error: null,
    data: null,
});

/**
 * Handler bridge mezi framework-agnostic executeAsyncThunkAction
 * a React state managementem.
 *
 * @param {React.Dispatch<React.SetStateAction<{loading:boolean,error:any,data:any}>>} setState
 * @returns {{
 *   onStart: (vars:any) => void,
 *   onSuccess: (result:any, vars:any) => void,
 *   onError: (error:any, vars:any) => void,
 *   onFinally: (vars:any) => void
 * }}
 */
export const createReactAsyncStateHandlers = (setState) => ({
    onStart: () => {
        setState((prev) => ({
            ...prev,
            loading: true,
            error: null,
        }));
    },

    onSuccess: (result) => {
        setState({
            loading: false,
            error: null,
            data: result,
        });
    },

    onError: (error) => {
        setState({
            loading: false,
            error,
            data: null,
        });
    },

    onFinally: noop,
});

/**
 * Vytvoří lokální dispatch kompatibilní s thunk stylem:
 * `(dispatch, getState, extra) => any`.
 *
 * Hodí se pro použití mimo Redux store, například v `useAsync`.
 *
 * @param {() => any} [getState=() => ({})]
 * @param {any} [extra]
 * @returns {(actionOrThunk:any) => Promise<any>}
 */
export const createThunkDispatch = (getState = () => ({}), extra = undefined) => {
    /**
     * @param {any} actionOrThunk
     * @returns {Promise<any>}
     */
    const dispatch = (actionOrThunk) => {
        if (typeof actionOrThunk === "function") {
            return Promise.resolve(actionOrThunk(dispatch, getState, extra));
        }

        return Promise.resolve(actionOrThunk);
    };

    return dispatch;
};

/**
 * Výchozí mock dispatch pro variantu bez Redux store.
 *
 * @type {(actionOrThunk:any) => Promise<any>}
 */
const mockDispatch = createThunkDispatch();

/**
 * Hook wrapper vracející lokální thunk dispatch.
 *
 * @returns {(actionOrThunk:any) => Promise<any>}
 */
const useMockDispatch = () => mockDispatch;

/**
 * No-op selector pro variantu bez Redux store.
 *
 * @returns {null}
 */
const noOpSelector = () => null;

/**
 * @typedef {object} UseAsyncThunkActionOptions
 * @property {boolean} [deferred=false]
 *   Pokud je true, hook nespustí async akci automaticky po mountu / změně vars.
 * @property {boolean} [network=true]
 *   Pokud je false, async akce se vůbec nespouští.
 */

/**
 * @typedef {object} UseAsyncThunkActionResult<TData, TEntity>
 * @property {boolean} loading
 * @property {any} error
 * @property {TData | null} data
 * @property {TEntity | null} entity
 * @property {(overrideVars?: object) => Promise<TData | null>} run
 */

/**
 * Factory pro vytvoření hooku nad zvoleným dispatch/select rozhraním.
 *
 * Typicky:
 * - `useAsyncThunkAction` používá Redux `useDispatch` + `useSelector`
 * - `useAsync` používá lokální thunk dispatch + no-op selector
 *
 * `AsyncAction` se očekává ve tvaru kompatibilním s tvým kódem:
 * `AsyncAction(vars, gqlClient) => thunk | promise | value`
 *
 * @param {Function} useDispatchHook
 * @param {Function} useSelectorHook
 * @returns {
 *   <TData = any, TEntity = any>(
 *     AsyncAction: Function,
 *     vars?: object,
 *     options?: UseAsyncThunkActionOptions
 *   ) => UseAsyncThunkActionResult<TData, TEntity>
 * }
 */
export const useAsyncThunkActionFactory = (useDispatchHook, useSelectorHook) =>
    (AsyncAction, vars, options = {}) => {
        const { deferred = false, network = true } = options;

        const dispatch = useDispatchHook();
        const gqlClient = useGQLClient();

        /**
         * Stabilizovaná verze vars.
         * Díky tomu nové reference stejných dat nespouštějí zbytečný re-fetch.
         */
        const [varsState, setVarsState] = useState(() => normalizeVars(vars));

        /**
         * Lokální async stav hooku.
         */
        const [state, setState] = useState(() =>
            createInitialAsyncState({ deferred, network })
        );

        /**
         * Dedup cache právě běžících requestů.
         */
        const inFlightRef = useRef(new Map());

        /**
         * Synchronizace vstupních vars -> stabilizovaný varsState.
         */
        useEffect(() => {
            const nextVars = normalizeVars(vars);

            if (!shallowEqual(nextVars, varsState)) {
                setVarsState(nextVars);
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [vars]);

        /**
         * Pokud ve vars existuje id, načteme entitu z ItemSlice.
         */
        const id = varsState?.id;

        const entity = useSelectorHook((rootState) => {
            return id != null ? selectItemById(rootState, id) : null;
        });

        /**
         * React handlery pro executeAsyncThunkAction.
         * Memo jen kvůli čitelnosti a stabilitě reference.
         */
        const asyncStateHandlers = useMemo(
            () => createReactAsyncStateHandlers(setState),
            []
        );

        /**
         * Spustí async akci ručně.
         *
         * `gqlClient` se předává jako factory, aby executeAsyncThunkAction
         * pracovalo s jednotným "resolvable" kontraktem.
         *
         * @param {object} [overrideVars]
         * @returns {Promise<any>}
         */
        const run = useCallback((overrideVars) => {
            return executeAsyncThunkAction({
                AsyncAction,
                baseVars: varsState,
                overrideVars,
                network,
                dispatch,
                gqlClient: () => gqlClient,
                inFlightMap: inFlightRef.current,
                ...asyncStateHandlers,
            });
        }, [AsyncAction, varsState, network, dispatch, gqlClient, asyncStateHandlers]);

        /**
         * Auto-run při mountu / změně varsState,
         * pokud není režim deferred.
         */
        useEffect(() => {
            if (!deferred && network) {
                run();
            }
        }, [deferred, network, run]);

        return {
            loading: state.loading,
            error: state.error,
            data: state.data,
            entity,
            run,
        };
    };

/**
 * React hook pro spuštění async thunk-like akce napojené na Redux store.
 *
 * ------------------------------------------------------------
 * KONTRAKT AsyncAction
 * ------------------------------------------------------------
 * AsyncAction musí mít tvar:
 *
 *   (vars: object, gqlClient: GraphQLClient) => Thunk | Promise | any
 *
 * kde:
 * - `vars` jsou vstupní parametry (např. `{ id: number }`)
 * - `gqlClient` je GraphQL client z contextu (useGQLClient)
 * - návratová hodnota může být:
 *     - thunk: (dispatch, getState) => Promise<any>
 *     - Promise<any>
 *     - nebo sync hodnota
 *
 * ------------------------------------------------------------
 * CHOVÁNÍ HOOKU
 * ------------------------------------------------------------
 * - automaticky spouští AsyncAction při mountu / změně `vars`
 *   (pokud `deferred !== true`)
 * - deduplikuje paralelní requesty podle `vars`
 * - spravuje stav: loading / error / data
 * - pokud `vars.id` existuje, načítá `entity` z Redux store (ItemSlice)
 *
 * ------------------------------------------------------------
 * PARAMETRY
 * ------------------------------------------------------------
 *
 * @template TData = any      // výsledek AsyncAction (data)
 * @template TEntity = any   // entita z Redux store (ItemSlice)
 *
 * @param {Function} AsyncAction
 *   Async thunk-like akce: (vars, gqlClient) => Promise | thunk | any
 *
 * @param {object} [vars]
 *   Vstupní parametry pro AsyncAction.
 *   Stabilizují se pomocí shallowEqual, aby nedocházelo k zbytečným refetchům.
 *
 * @param {UseAsyncThunkActionOptions} [options]
 * @param {boolean} [options.deferred=false]
 *   Pokud true, akce se nespustí automaticky (nutno volat run()).
 *
 * @param {boolean} [options.network=true]
 *   Pokud false, akce se vůbec nespouští.
 *
 * ------------------------------------------------------------
 * NÁVRATOVÁ HODNOTA
 * ------------------------------------------------------------
 *
 * @returns {UseAsyncThunkActionResult<TData, TEntity>}
 *
 * @property {boolean} loading
 *   Indikuje probíhající request.
 *
 * @property {any} error
 *   Chyba z AsyncAction (pokud nastane).
 *
 * @property {TData | null} data
 *   Výsledek AsyncAction.
 *
 * @property {TEntity | null} entity
 *   Entita z Redux store podle `vars.id` (pokud existuje).
 *
 * @property {(overrideVars?: object) => Promise<TData | null>} run
 *   Ruční spuštění AsyncAction (volitelně s override vars).
 * @example
 * // --- 1. Jednoduché použití (auto-fetch podle id) ---
 *
 * const UserDetail = ({ id }) => {
 *   const { data, loading, error } = useAsyncThunkAction(
 *     UserReadAsyncAction,
 *     { id }
 *   );
 *
 *   if (loading) return <div>Loading...</div>;
 *   if (error) return <div>Error</div>;
 *
 *   return <div>{data?.name}</div>;
 * };
 *
 * @example
 * // --- 2. Manuální spuštění (deferred) ---
 *
 * const UserLoader = () => {
 *   const { data, run, loading } = useAsyncThunkAction(
 *     UserReadAsyncAction,
 *     null,
 *     { deferred: true }
 *   );
 *
 *   return (
 *     <div>
 *       <button onClick={() => run({ id: 5 })}>
 *         Load user
 *       </button>
 *
 *       {loading && <span>Loading...</span>}
 *       {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
 *     </div>
 *   );
 * };
 *
 * @example
 * // --- 3. Override vars při run() ---
 *
 * const UserSwitcher = () => {
 *   const { data, run } = useAsyncThunkAction(
 *     UserReadAsyncAction,
 *     { id: 1 }
 *   );
 *
 *   return (
 *     <div>
 *       <button onClick={() => run({ id: 2 })}>User 2</button>
 *       <button onClick={() => run({ id: 3 })}>User 3</button>
 *
 *       <pre>{JSON.stringify(data, null, 2)}</pre>
 *     </div>
 *   );
 * };
 *
 * @example
 * // --- 4. Použití entity z Redux store ---
 *
 * const UserWithCache = ({ id }) => {
 *   const { entity, data } = useAsyncThunkAction(
 *     UserReadAsyncAction,
 *     { id }
 *   );
 *
 *   // entity = z Redux cache
 *   // data   = výsledek requestu
 *
 *   return (
 *     <div>
 *       <div>Cached: {entity?.name}</div>
 *       <div>Fetched: {data?.name}</div>
 *     </div>
 *   );
 * };
 *
 * @example
 * // --- 5. Typická AsyncAction ---
 *
 * const UserReadAsyncAction = (vars, gqlClient) => async (dispatch) => {
 *   const response = await gqlClient.query(
 *     `
 *     query ($id: ID!) {
 *       user(id: $id) {
 *         id
 *         name
 *       }
 *     }
 *     `,
 *     vars
 *   );
 *
 *   const user = response.data.user;
 *
 *   dispatch({ type: "user/upsert", payload: user });
 *
 *   return user;
 * };
 */
export const useAsyncThunkAction = useAsyncThunkActionFactory(useDispatch, useSelector);



/**
 * Lehká varianta hooku bez Redux store.
 *
 * ------------------------------------------------------------
 * ROZDÍL OPROTI useAsyncThunkAction
 * ------------------------------------------------------------
 * - NEPOUŽÍVÁ Redux store
 * - nemá `entity`
 * - používá lokální thunk dispatch (createThunkDispatch)
 *
 * Jinak je API i chování IDENTICKÉ:
 * - stejné AsyncAction
 * - stejné `vars`
 * - stejné `run`
 * - stejné řízení stavu (loading/error/data)
 *
 * ------------------------------------------------------------
 * KDY POUŽÍT
 * ------------------------------------------------------------
 * - mimo Redux kontext
 * - pro isolated komponenty / utility
 * - pro testy
 * - když nepotřebuješ `selectItemById`
 *
 * ------------------------------------------------------------
 * PARAMETRY
 * ------------------------------------------------------------
 *
 * @template TData = any
 *
 * @param {Function} AsyncAction
 *   Async thunk-like akce: (vars, gqlClient) => Promise | thunk | any
 *
 * @param {object} [vars]
 *   Vstupní parametry pro AsyncAction
 *
 * @param {UseAsyncThunkActionOptions} [options]
 *
 * ------------------------------------------------------------
 * NÁVRATOVÁ HODNOTA
 * ------------------------------------------------------------
 *
 * @returns {UseAsyncThunkActionResult<TData, null>}
 *
 * @property {boolean} loading
 * @property {any} error
 * @property {TData | null} data
 * @property {null} entity
 *   Vždy null (není Redux store)
 *
 * @property {(overrideVars?: object) => Promise<TData | null>} run
 * @example
 * // --- 1. Použití mimo Redux ---
 *
 * const SimpleComponent = () => {
 *   const { data, loading } = useAsync(
 *     UserReadAsyncAction,
 *     { id: 1 }
 *   );
 *
 *   return (
 *     <div>
 *       {loading && "Loading..."}
 *       {data && data.name}
 *     </div>
 *   );
 * };
 *
 * @example
 * // --- 2. Manuální run ---
 *
 * const ManualFetch = () => {
 *   const { run, data } = useAsync(
 *     UserReadAsyncAction,
 *     null,
 *     { deferred: true }
 *   );
 *
 *   return (
 *     <div>
 *       <button onClick={() => run({ id: 10 })}>
 *         Fetch
 *       </button>
 *
 *       {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
 *     </div>
 *   );
 * };
 *
 * @example
 * // --- 3. AsyncAction bez Redux dispatch ---
 *
 * const SimpleAsyncAction = async (vars, gqlClient) => {
 *   const res = await gqlClient.query(
 *     `query { ping }`
 *   );
 *
 *   return res.data;
 * };
 *
 * const Comp = () => {
 *   const { data } = useAsync(SimpleAsyncAction);
 *
 *   return <div>{JSON.stringify(data)}</div>;
 * };
 */
export const useAsync = useAsyncThunkActionFactory(useMockDispatch, noOpSelector);