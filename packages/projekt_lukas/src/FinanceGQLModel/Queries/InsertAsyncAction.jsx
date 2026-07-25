import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared"
import { createAsyncGraphQLAction2 } from "../../../../dynamic/src/Core/createAsyncGraphQLAction2"
import { LargeFragment } from "./Fragments"

const InsertMutationStr = `
mutation financeInsert($id: UUID, $name: String, $nameEn: String, $description: String, $value: Float, $masterfinanceId: UUID!, $financeTypeId: UUID) {
  financeInsert(finance: {
    id: $id
    name: $name
    nameEn: $nameEn
    description: $description
    value: $value
    masterfinanceId: $masterfinanceId
    financeTypeId: $financeTypeId
  }) {
    ... on FinanceGQLModel {
      ...FinanceLarge
    }
    ... on FinanceGQLModelInsertError {
      __typename
      msg
      failed
    }
  }
}
`

const InsertMutation = createQueryStrLazy(InsertMutationStr, LargeFragment)
export const InsertAsyncAction = createAsyncGraphQLAction2(InsertMutation)
