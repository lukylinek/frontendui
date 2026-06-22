import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared"
import { createAsyncGraphQLAction2 } from "../../../../dynamic/src/Core/createAsyncGraphQLAction2"
import { reduceToFirstEntity } from "../../../../dynamic/src/Store/Middlewares"
import { LinkFragment } from "./Fragments"

const SearchQueryStr = `
query ProjectSearchQuery($skip: Int, $limit: Int, $pattern: String) {
  projectPage(skip: $skip, limit: $limit, where: {
    name: { _ilike: $pattern }
    id: null
    done: null
    startDate: null
    endDate: null
    projectTypeId: null
    masterprojectId: null
  }) {
    ...ProjectLink
  }
}
`

export const SearchAsyncActionQuery = createQueryStrLazy(`${SearchQueryStr}`, LinkFragment)
export const SearchAsyncAction = createAsyncGraphQLAction2(SearchAsyncActionQuery, reduceToFirstEntity)
