import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { LargeFragment } from "./Fragments";
import { createAsyncGraphQLAction2 } from "../../../../dynamic/src/Core/createAsyncGraphQLAction2";
import { reduceToFirstEntity, updateItemsFromGraphQLResult } from "../../../../dynamic/src/Store";

const UpdateMutationStr = `
mutation topicUpdate($id: UUID!, $lastchange: DateTime!, $name: String, $nameEn: String, $order: Int, $description: String, $semesterId: UUID) {
  topicUpdate(topic: {id: $id, lastchange: $lastchange, name: $name, nameEn: $nameEn, order: $order, description: $description, semesterId: $semesterId}) {
    ... on TopicGQLModel  { ...Large }
    ... on TopicGQLModelUpdateError  { ...Error }
  }
}

fragment Error on TopicGQLModelUpdateError  {
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