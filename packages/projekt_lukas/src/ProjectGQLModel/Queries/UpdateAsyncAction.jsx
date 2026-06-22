import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { LargeFragment } from "./Fragments";
import { createAsyncGraphQLAction2 } from "../../../../dynamic/src/Core/createAsyncGraphQLAction2";
import { reduceToFirstEntity, updateItemsFromGraphQLResult } from "../../../../dynamic/src/Store";

const UpdateMutationStr = `
mutation projectUpdate(
    $id: UUID!
    $lastchange: DateTime!
    $name: String
    $nameEn: String
) {
  projectUpdate(
    project: {
      id: $id
      lastchange: $lastchange
      name: $name
      nameEn: $nameEn
    }
  ) {
    ... on ProjectGQLModel {
      ...ProjectLarge
    }
    ... on ProjectGQLModelUpdateError {
      ...Error
    }
  }
}

fragment Error on ProjectGQLModelUpdateError {
  __typename
  Entity {
    ...ProjectLarge
  }
  msg
  failed
  code
  location
  input
}
`;

const UpdateMutation = createQueryStrLazy(`${UpdateMutationStr}`, LargeFragment);

export const UpdateAsyncAction = createAsyncGraphQLAction2(
  UpdateMutation,
  updateItemsFromGraphQLResult,
  reduceToFirstEntity
);