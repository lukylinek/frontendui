import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { LargeFragment } from "./Fragments";
import { createAsyncGraphQLAction2 } from "../../../../dynamic/src/Core/createAsyncGraphQLAction2";
import { reduceToFirstEntity, updateItemsFromGraphQLResult } from "../../../../dynamic/src/Store";

const UpdateMutationStr = `
mutation subjectUpdate($id: UUID!, $lastchange: DateTime!, $name: String, $nameEn: String, $description: String, $descriptionEn: String) {
  subjectUpdate(subject: {id: $id, lastchange: $lastchange, name: $name, nameEn: $nameEn, description: $description, descriptionEn: $descriptionEn}) {
    ... on SubjectGQLModel  { ...Large }
    ... on SubjectGQLModelUpdateError  { ...Error }
  }
}

fragment Error on SubjectGQLModelUpdateError  {
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