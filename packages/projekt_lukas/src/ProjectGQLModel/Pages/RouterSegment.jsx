import { PageVector } from "./PageVector"
import { PageUpdateItem } from "./PageUpdateItem"
import { PageCreateItem } from "./PageCreateItem"
import { PageReadItem } from "./PageReadItem"
import { PageDeleteItem } from "./PageDeleteItem"

import {
    DeleteItemURI,
    UpdateItemURI,
    CreateURI,
    ReadItemURI,
    VectorItemsURI
} from "../Components/uris"

export const ProjectGQLModelRouterSegments = [
    {
        path: String(CreateURI),
        element: (<PageCreateItem />),
    },
    {
        path: String(VectorItemsURI),
        element: (<PageVector />),
    },
    {
        path: String(ReadItemURI),
        element: (<PageReadItem />),
    },
    {
        path: String(UpdateItemURI),
        element: (<PageUpdateItem />),
    },
    {
        path: String(DeleteItemURI),
        element: (<PageDeleteItem />),
    },
]