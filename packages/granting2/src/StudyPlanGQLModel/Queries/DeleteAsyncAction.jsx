import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { LargeFragment } from "./Fragments";
import { createAsyncGraphQLAction2 } from "../../../../dynamic/src/Core/createAsyncGraphQLAction2";

const DeleteMutationStr = `
mutation roleTypeDelete(
	$id: UUID! # null, 
	$lastchange: DateTime! # null
) {
  roleTypeDelete(
	roleType: {
	id: $id, 
	lastchange: $lastchange}
  ) {
        ...RoleTypeGQLModelDeleteError
    }
}

fragment RoleTypeGQLModelDeleteError on RoleTypeGQLModelDeleteError {
  __typename
  Entity {
    ...Large
  }
  msg
  code
  failed
  location
  input
}
`
const DeleteMutation = createQueryStrLazy(`${DeleteMutationStr}`, LargeFragment)
export const DeleteAsyncAction = createAsyncGraphQLAction2(DeleteMutation)