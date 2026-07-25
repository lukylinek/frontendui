import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared"
import { createAsyncGraphQLAction2 } from "../../../../dynamic/src/Core/createAsyncGraphQLAction2"
import { LargeFragment } from "./Fragments"

const ReadPageQueryStr = `
query financePage($skip: Int, $limit: Int) {
  financePage(skip: $skip, limit: $limit) {
    ...FinanceLarge
  }
}
`

const ReadPageQuery = createQueryStrLazy(ReadPageQueryStr, LargeFragment)
export const ReadPageAsyncAction = createAsyncGraphQLAction2(ReadPageQuery)
