import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { LargeFragment } from "./Fragments";
import { createAsyncGraphQLAction2 } from "../../../../dynamic/src/Core/createAsyncGraphQLAction2";

const MasterInsertMutationStr = `
mutation ProjectMasterInsert(
    $id: UUID
    $name: String
    $nameEn: String
    $description: String
    $done: Boolean
    $startdate: DateTime
    $enddate: DateTime
    $projectTypeId: UUID
    $groupId: UUID!
) {
  projectMasterInsert(
    project: {
      id: $id
      name: $name
      nameEn: $nameEn
      description: $description
      done: $done
      startdate: $startdate
      enddate: $enddate
      projectTypeId: $projectTypeId
      groupId: $groupId
    }
  ) {
    ... on ProjectGQLModel {
      ...ProjectLarge
    }
    ... on ProjectGQLModelInsertError {
      __typename
      msg
      failed
    }
  }
}
`;

const MasterInsertMutation = createQueryStrLazy(`${MasterInsertMutationStr}`, LargeFragment);

export const MasterInsertAsyncAction = createAsyncGraphQLAction2(MasterInsertMutation);
