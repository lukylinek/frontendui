import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { LargeFragment } from "./Fragments";
import { createAsyncGraphQLAction2 } from "../../../../dynamic/src/Core/createAsyncGraphQLAction2";

const DeleteMutationStr = `
mutation ProjectDelete(
  $id: UUID!
  $lastchange: DateTime!
) {
  projectDelete(
    project: {
      id: $id
      lastchange: $lastchange
    }
  ) {
    ...ProjectGQLModelDeleteError
  }
}

fragment ProjectGQLModelDeleteError on ProjectGQLModelDeleteError {
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
`;

const DeleteMutation = createQueryStrLazy(`${DeleteMutationStr}`, LargeFragment);

export const DeleteAsyncAction = createAsyncGraphQLAction2(DeleteMutation);