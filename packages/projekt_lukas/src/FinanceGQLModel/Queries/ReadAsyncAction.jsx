import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared"
import { createAsyncGraphQLAction2 } from "../../../../dynamic/src/Core/createAsyncGraphQLAction2"
import { LargeFragment } from "./Fragments"

const ReadQueryStr = `
query financeById($id: UUID!) {
  financeById(id: $id) {
    ...FinanceLarge
  }
}
`

const ReadQuery = createQueryStrLazy(ReadQueryStr, LargeFragment)
export const ReadAsyncAction = createAsyncGraphQLAction2(ReadQuery)
