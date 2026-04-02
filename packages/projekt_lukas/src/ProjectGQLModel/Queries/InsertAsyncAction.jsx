import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { LargeFragment } from "./Fragments";
import { createAsyncGraphQLAction2 } from "../../../../dynamic/src/Core/createAsyncGraphQLAction2";


const InsertMutationStr = `
mutation roleTypeInsert(
	$mastertypeId: UUID # null, 
	$id: UUID # null, 
	$name: String # null, 
	$nameEn: String # null, 
	$subtypes: [RoleTypeInsertGQLModel!] # null
) {
  roleTypeInsert(
	roleType: {
	mastertypeId: $mastertypeId, 
	id: $id, 
	name: $name, 
	nameEn: $nameEn, 
	subtypes: $subtypes}
  ) {
    ... on InsertError { ...InsertError }
    ... on RoleTypeGQLModel { ...Large }
  }
}


fragment InsertError on InsertError {
  __typename
  msg
  failed
  code
  location
  input

}
`

const InsertMutation = createQueryStrLazy(`${InsertMutationStr}`, LargeFragment)
export const InsertAsyncAction = createAsyncGraphQLAction2(InsertMutation)