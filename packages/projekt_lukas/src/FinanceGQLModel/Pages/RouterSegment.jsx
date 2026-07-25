import { PageVector } from "./PageVector"
import { PageReadItem } from "./PageReadItem"
import { ListURI, ReadItemURI, CreateURI } from "../Components/uris"

export const FinanceGQLModelRouterSegments = [
    {
        path: String(ListURI),
        element: <PageVector />,
    },
    {
        path: String(ReadItemURI),
        element: <PageReadItem />,
    },
]
