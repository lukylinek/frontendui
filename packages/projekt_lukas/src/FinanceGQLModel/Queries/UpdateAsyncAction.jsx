import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared"
import { createAsyncGraphQLAction2 } from "../../../../dynamic/src/Core/createAsyncGraphQLAction2"
import { updateItemsFromGraphQLResult, reduceToFirstEntity } from "../../../../dynamic/src/Store"
import { LargeFragment } from "./Fragments"

const UpdateMutationStr = `
mutation financeUpdate($id: UUID!, $lastchange: DateTime!, $name: String, $nameEn: String, $description: String) {
  financeUpdate(finance: {
    id: $id
    lastchange: $lastchange
    name: $name
    nameEn: $nameEn
    description: $description
  }) {
    ... on FinanceGQLModel {
      ...FinanceLarge
    }
    ... on FinanceGQLModelUpdateError {
      __typename
      msg
      failed
    }
  }
}
`

const UpdateMutation = createQueryStrLazy(UpdateMutationStr, LargeFragment)
export const UpdateAsyncAction = createAsyncGraphQLAction2(UpdateMutation, updateItemsFromGraphQLResult, reduceToFirstEntity)
