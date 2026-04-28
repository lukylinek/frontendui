/**
 * Očistí segment URL/URI od přebytečných lomítek na začátku a na konci.
 *
 * Používá se pro segmenty `app`, `model`, `action` tak, aby výsledná cesta
 * nevznikala jako `//app//model/...` a aby se dalo bezpečně skládat i z hodnot,
 * které už obsahují `/`.
 *
 * @private
 * @param {any} s
 *   Hodnota segmentu (typicky string); `null/undefined` se převede na prázdný string.
 * @returns {string}
 *   Segment bez úvodních a koncových `/`.
 */
const clean = (s) => String(s ?? "").replace(/^\/+|\/+$/g, "");

/**
 * Vytvoří "stringovatelný" objekt reprezentující kanonickou aplikací definovanou URI cestu
 * ve tvaru:
 *
 * - bez `:id`: `/{app}/{model}/{action}`
 * - s `:id`:   `/{app}/{model}/{action}/{:id}`
 *
 * Objekt je určený pro postupné skládání a odvozování cest napříč aplikací:
 * - sdílení společného základu (např. `app` nebo `app+model`)
 * - tvorbu odvozenin přes `.change(...)` bez mutace původního objektu
 * - pohodlné použití v routeru, linkách a šablonách díky "stringovatelnosti"
 *
 * ### Stringovatelnost
 * Vrácený objekt se chová jako string:
 * - `String(obj)` vrátí finální cestu
 * - template literal: `` `${obj}` `` vrátí finální cestu
 * - `obj.path` obsahuje totéž explicitně
 *
 * ### Odvozování bez mutace (immutable styl)
 * Metoda `.change(patch)` vrací NOVÝ URI objekt s aplikovanými změnami.
 * Původní objekt zůstává nedotčen, takže je bezpečné ho sdílet napříč moduly.
 *
 * ### Zkratky
 * Kromě `.change(...)` poskytuje i zkratky:
 * - `.app("...")`
 * - `.model("...")`
 * - `.action("...")`
 * - `.id(true|false)` (alias pro `withId`)
 * - `.idParam(":id")` (změna názvu parametru id)
 *
 * @example
 * // Základ pro konkrétní model:
 * const GroupView = uri({ app: "app", model: "group", action: "view" });
 *
 * String(GroupView)        // "/app/group/view"
 * String(GroupView.id())   // "/app/group/view/:id"
 *
 * @example
 * // Odvozené akce nad stejným modelem:
 * const Group = uri({ app: "app", model: "group", action: "view" });
 * const GroupEdit = Group.action("edit").id(true);
 * const GroupDelete = Group.action("delete").id(true);
 *
 * String(GroupEdit)   // "/app/group/edit/:id"
 * String(GroupDelete) // "/app/group/delete/:id"
 *
 * @example
 * // Přepnutí id parametru:
 * const UserView = uri({ app: "app", model: "user", action: "view" }).id(true).idParam(":userId");
 * String(UserView) // "/app/user/view/:userId"
 *
 * @function uri
 * @param {object} [options]
 * @param {string} [options.app]
 *   První segment cesty (např. "app"). Přebytečné "/" na začátku/konci se odstraní.
 * @param {string} [options.model]
 *   Druhý segment cesty (např. "group", "roleType"...).
 * @param {string} [options.action]
 *   Třetí segment cesty (např. "view", "create", "edit", "delete", "rolesOn"...).
 * @param {boolean} [options.withId=false]
 *   Pokud `true`, připojí se na konec ještě segment s parametrem id (`/:idParam`).
 * @param {string} [options.idParam=":id"]
 *   Název parametru pro identifikátor entity. Můžeš zadat `":id"` nebo `"id"` – v obou
 *   případech bude interně normalizováno na formát s dvojtečkou (např. `":id"`).
 *
 * @returns {UriBuilder}
 *   "Stringovatelný" objekt s výslednou cestou, segmenty a metodami pro odvozování.
 *
 * @typedef {object} UriBuilder
 * @property {string} path
 *   Finální cesta (např. `"/app/group/view"` nebo `"/app/group/view/:id"`).
 * @property {{app:string, model:string, action:string, withId:boolean, idParam:string}} segments
 *   Normalizované segmenty, ze kterých byla cesta složena.
 *   Pozn.: pokud `segments` budeš ručně měnit, `path` se tím nezmění (je spočítaný).
 *   Doporučení: segmenty používej jen pro čtení.
 *
 * @property {() => string} toString
 *   Vrací `path`. Umožňuje použití v template literal a při `String(obj)`.
 * @property {() => string} valueOf
 *   Vrací `path`. Doplňková string/primitive konverze.
 * @property {(hint: "number"|"string"|"default") => string} [Symbol.toPrimitive]
 *   Vrací `path` pro implicitní konverzi (např. `` `${obj}` ``).
 *
 * @property {(patch?: Partial<UriPatch>) => UriBuilder} change
 *   Vytvoří nový `UriBuilder` s aplikovaným patchem (libovolná část URI může být změněna).
 *
 * @property {(app: string) => UriBuilder} app
 *   Zkratka pro `change({ app })`.
 * @property {(model: string) => UriBuilder} model
 *   Zkratka pro `change({ model })`.
 * @property {(action: string) => UriBuilder} action
 *   Zkratka pro `change({ action })`.
 * @property {(on?: boolean) => UriBuilder} id
 *   Zkratka pro `change({ withId: on })`. Default `true`.
 * @property {(p?: string) => UriBuilder} idParam
 *   Zkratka pro `change({ idParam: p })`. Default `":id"`.
 *
 * @typedef {object} UriPatch
 * @property {string} [app]
 * @property {string} [model]
 * @property {string} [action]
 * @property {boolean} [withId]
 * @property {string} [idParam]
 */
export const uri = ({ app="_", model="_", action="view", withId = false, idParam = ":id" } = {}) => {
    const seg = {
        app: clean(app),
        model: clean(model),
        action: clean(action),
        withId: Boolean(withId),
        idParam: String(idParam).startsWith(":") ? String(idParam) : `:${String(idParam)}`,
    };

    const base = `/${seg.app}/${seg.model}/${seg.action}`.replace(/\/+/g, "/");
    const path = seg.withId ? `${base}/${seg.idParam}` : base;

    const obj = {
        path,
        segments: seg,

        // stringovatelnost
        toString() { return path; },
        valueOf() { return path; },
        [Symbol.toPrimitive]() { return path; },

        // "immutable" změna: vrátí nový objekt
        change(patch = {}) {
            return uri({ ...seg, ...patch });
        },

        // volitelné zkratky
        app(app) { return obj.change({ app }); },
        model(model) { return obj.change({ model }); },
        action(action) { return obj.change({ action }); },
        id(on = true) { return obj.change({ withId: on }); },
        idParam(p = ":id") { return obj.change({ idParam: p }); },
    };

    return obj;
};

export const URIRoot = "/ug"
export const URIRootObj = uri({ app: URIRoot })