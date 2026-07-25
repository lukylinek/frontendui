import { uri } from "../../uriroot"

const FinanceRoot = uri({ app: "finance", model: "FinanceGQLModel" })

export const ListURI = String(FinanceRoot.action("list"))
export const CreateURI = String(FinanceRoot.action("create"))
export const ReadItemURI = String(FinanceRoot.action("view").id())
export const UpdateItemURI = String(FinanceRoot.action("edit").id())
export const VectorItemsURI = ListURI
