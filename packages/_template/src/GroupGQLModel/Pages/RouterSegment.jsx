import { PageVector } from "./PageVector"
import { PageUpdateItem } from "./PageUpdateItem"
import { PageCreateItem } from "./PageCreateItem"
import { PageReadItem } from "./PageReadItem"
import { PageDeleteItem } from "./PageDeleteItem"

import { MembershipsURI, PageReadItemMemberships, PageReadItemRoles, PageReadItemRolesOn, PageReadItemSubgroups, RolesOnURI, RolesURI, SubgroupsURI } from './PageReadItemEx'
import { CreateURI, DeleteItemURI, DeleteURI, ListURI, ReadItemURI, UpdateItemURI, UpdateURI } from "../Components"
import { PageVectorBase, ReadItemUniverisityURI } from "./PageVectorBase"

/**
 * Definice segmentů rout pro Template stránky.
 *
 * Každý objekt v tomto poli popisuje jednu trasu (route) v aplikaci:
 *  - `path`: Stringová URL s parametrem `:id`, která identifikuje konkrétní instanci template entity.
 *  - `element`: React komponenta, která se má renderovat při shodě s cestou.
 *
 * Pokud komponenta stránky podporuje children jako render funkci,
 * všechny children předané přes router budou dostávat objekt:
 *   - `template` — načtená entita podle `:id`
 *   - `onChange` — callback pro změnu hodnoty pole
 *   - `onBlur` — callback pro blur event (například při opuštění pole)
 *
 * @constant
 * @type {Array<{ path: string, element: JSX.Element }>}
 *
 * @example
 * // Tato route reaguje na URL jako "/template/123"
 * {
 *   path: "/template/:id",
 *   element: <TemplatePage />
 * }
 *
 * // Editační route: "/template/edit/123"
 * {
 *   path: "/template/edit/:id",
 *   element: <TemplateEditPage />
 * }
 */
export const GroupRouterSegments = [
    {
        path: CreateURI,
        element: (<PageCreateItem />),
    },
    {
        path: ListURI,
        element: (<PageVector />),
    },
    {
        path: ReadItemURI,
        element: (<PageReadItem />),
    },
    {
        path: UpdateItemURI,
        element: (<PageUpdateItem />),
    },   
    {
        path: DeleteItemURI,
        element: (<PageDeleteItem />),
    },   
    {
        path: RolesOnURI,
        element: (<PageReadItemRolesOn />)
    },
    {
        path: RolesURI,
        element: (<PageReadItemRoles />)
    },
    {
        path: SubgroupsURI,
        element: (<PageReadItemSubgroups />)
    },
    {
        path: MembershipsURI,
        element: (<PageReadItemMemberships />)
    },
    {
        path: ListURI.replace("list", ":any"),
        element: (<PageVector />),
    },
    {
        path: ReadItemURI.replace("view", ":any"),
        element: (<PageReadItem />),
    },

    {
        path: ReadItemUniverisityURI,
        element: (<PageVectorBase />)
    },
]