import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared"
import { createAsyncGraphQLAction2 } from "../../../../dynamic/src/Core/createAsyncGraphQLAction2"

const query = `
query groupPage(
  $limit: Int = 100,
  $grouptypeIds: [UUID!]! = [
    "cd49e152-610c-11ed-9f29-001a7dda7110",
    "cd49e153-610c-11ed-bf19-001a7dda7110",
    "cd49e155-610c-11ed-844e-001a7dda7110",
    "cd49e154-610c-11ed-bdbf-001a7dda7110",
    "cd49e155-610c-11ed-bdbf-001a7dda7110"
  ]
){
  groupPage(
    limit: $limit,
    where: {
      grouptype: { id: { _in: $grouptypeIds } }
    }
  ) {
    id
    name

    mastergroupId
    mastergroup {
      id
      name
    }

    subgroups(
      limit: $limit,
      where: {
        grouptype: { id: { _in: $grouptypeIds } }
      }
    ) {
      id
      name
    }

    grouptypeId
    grouptype {
      id
      name
    }

    rbacobject {
      currentUserRoles {
        id
        roletype {
          id
          name
        }
        group {
          id
          name
        }
        valid
        startdate
        enddate
      }
    }
  }
}`

export const ReadStructureQuery = createQueryStrLazy(`${query}`)

/**
 * An async action for executing a GraphQL query to read  entities.
 *
 * This action is created using `createAsyncGraphQLAction` with a predefined `QueryRead` query.
 * It can be dispatched with query variables to fetch data related to  entities from the GraphQL API.
 *
 * @constant
 * @type {Function}
 *
 * @param {Object} query_variables - The variables for the GraphQL query.
 * @param {string|number} query_variables.id - The unique identifier for the  entity to fetch.
 *
 * @returns {Function} A dispatchable async action that performs the GraphQL query, applies middleware, and dispatches the result.
 *
 * @throws {Error} If `query_variables` is not a valid JSON object.
 *
 * @example
 * // Example usage:
 * const queryVariables = { id: "12345" };
 *
 * dispatch(ReadAsyncAction(queryVariables))
 *   .then((result) => {
 *     console.log("Fetched data:", result);
 *   })
 *   .catch((error) => {
 *     console.error("Error fetching data:", error);
 *   });
 */
// export const ReadAsyncAction = createAsyncGraphQLAction2(ReadQuery, reduceToFirstEntity("result"))
export const ReadStructureAsyncAction = createAsyncGraphQLAction2(ReadStructureQuery)