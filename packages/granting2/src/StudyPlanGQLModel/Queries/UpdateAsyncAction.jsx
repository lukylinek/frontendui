import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { LargeFragment } from "./Fragments";
import { createAsyncGraphQLAction2 } from "../../../../dynamic/src/Core/createAsyncGraphQLAction2";
import { reduceToFirstEntity, updateItemsFromGraphQLResult } from "../../../../dynamic/src/Store";

const UpdateMutationStr = `
mutation studyPlanUpdate($id: UUID!, $lastchange: DateTime!, $examId: UUID, $eventId: UUID) {
  studyPlanUpdate(studyPlan: {id: $id, lastchange: $lastchange, examId: $examId, eventId: $eventId}) {
    ... on StudyPlanGQLModel  { ...Large }
    ... on StudyPlanGQLModelUpdateError  { ...Error }
  }
}

fragment Error on StudyPlanGQLModelUpdateError  {
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