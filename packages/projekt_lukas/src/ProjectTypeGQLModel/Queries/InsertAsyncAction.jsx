import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared"
import { createAsyncGraphQLAction2 } from "../../../../dynamic/src/Core/createAsyncGraphQLAction2"

// Ověř mutation name v Apollo/GraphiQL:
// query { __schema { mutationType { fields { name } } } }
const InsertMutationStr = `
mutation ProjectTypeInsert($name: String, $nameEn: String, $mastertypeId: UUID!) {
  projectTypeInsert(projectType: { name: $name, nameEn: $nameEn, mastertypeId: $mastertypeId }) {
    ... on ProjectTypeGQLModel {
      __typename
      id
      name
      nameEn
    }
    ... on ProjectTypeGQLModelInsertError {
      __typename
      msg
      failed
      input
    }
  }
}
`

const InsertMutation = createQueryStrLazy(InsertMutationStr)

export const InsertAsyncAction = createAsyncGraphQLAction2(InsertMutation)
