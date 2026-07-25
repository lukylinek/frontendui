import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { LargeFragment } from "./Fragments";
import { createAsyncGraphQLAction2 } from "../../../../dynamic/src/Core/createAsyncGraphQLAction2";

const InsertMutationStr = `
mutation ProjectInsert(
    $id: UUID
    $name: String
    $nameEn: String
    $description: String
    $done: Boolean
    $startdate: DateTime
    $enddate: DateTime
    $projectTypeId: UUID
    $masterprojectId: UUID!
) {
  projectInsert(
    project: {
      id: $id
      name: $name
      nameEn: $nameEn
      description: $description
      done: $done
      startdate: $startdate
      enddate: $enddate
      projectTypeId: $projectTypeId
      masterprojectId: $masterprojectId
    }
  ) {
    ... on ProjectGQLModel {
      ...ProjectLarge
    }

    ... on ProjectGQLModelInsertError {
      ...ProjectGQLModelInsertError
    }
  }
}

fragment ProjectGQLModelInsertError on ProjectGQLModelInsertError {
  __typename
  Entity {
    ...ProjectLarge
  }
  msg
  code
  failed
  location
  input
}
`;

const InsertMutation = createQueryStrLazy(`${InsertMutationStr}`, LargeFragment);

export const InsertAsyncAction = createAsyncGraphQLAction2(InsertMutation);