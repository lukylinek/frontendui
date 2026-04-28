import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { LargeFragment } from "./Fragments";
import { createAsyncGraphQLAction2 } from "../../../../dynamic/src/Core/createAsyncGraphQLAction2";
import { reduceToFirstEntity, updateItemsFromGraphQLResult } from "../../../../dynamic/src/Store";

const UpdateMutationStr = `
mutation studentUpdate($id: UUID!, $lastchange: DateTime!, $programId: UUID, $stateId: UUID, $semesterNumber: Int) {
  studentUpdate(student: {id: $id, lastchange: $lastchange, programId: $programId, stateId: $stateId, semesterNumber: $semesterNumber}) {
    ... on StudentGQLModel  { ...Large }
    ... on StudentGQLModelUpdateError  { ...Error }
  }
}

fragment Error on StudentGQLModelUpdateError  {
  __typename
  Entity {
    ...Large
  }
  msg
  failed
  code
  location
  input
}
`

const UpdateMutation = createQueryStrLazy(`${UpdateMutationStr}`, LargeFragment)
export const UpdateAsyncAction = createAsyncGraphQLAction2(UpdateMutation, 
    updateItemsFromGraphQLResult, reduceToFirstEntity)