import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared"
import { createAsyncGraphQLAction2 } from "../../../../dynamic/src/Core/createAsyncGraphQLAction2"

const ReadPageQueryStr = `
query projectTypePage($skip: Int, $limit: Int) {
  projectTypePage(skip: $skip, limit: $limit) {
    __typename
    id
    name
    nameEn
  }
}
`

const ReadPageQuery = createQueryStrLazy(ReadPageQueryStr)
export const ReadPageAsyncAction = createAsyncGraphQLAction2(ReadPageQuery)
