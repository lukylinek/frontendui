import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { LargeFragment } from "./Fragments";
import { createAsyncGraphQLAction2 } from "../../../../dynamic/src/Core/createAsyncGraphQLAction2";
import { createAsyncThunkRunner } from "../../../../dynamic/src/Hooks/asyncThunkExecutor";


const InsertMutationStr = `
mutation studentInsert($userId: UUID!, $programId: UUID!, $id: UUID, $stateId: UUID, $semesterNumber: Int) {
  studentInsert(student: {userId: $userId, programId: $programId, id: $id, stateId: $stateId, semesterNumber: $semesterNumber}) {
    ... on InsertError { ...InsertError }
    ... on StudentGQLModel  { ...Large }
  }
}


fragment InsertError on InsertError {
  __typename
  msg
  failed
  code
  location
  input

}
`

const InsertMutation = createQueryStrLazy(`${InsertMutationStr}`, LargeFragment)
export const InsertAsyncAction = createAsyncGraphQLAction2(InsertMutation)


/**
 * Vytvoří nový item pomocí GraphQL insert operace.
 *
 * Funkce je vytvořena pomocí `createAsyncThunkRunner` a obaluje
 * `InsertAsyncAction`, což je async action creator (typicky výstup
 * `createAsyncGraphQLAction2(...)`).
 *
 * ------------------------------------------------------------
 * CHOVÁNÍ
 * ------------------------------------------------------------
 *
 * - sloučí `baseVars` (pokud existují) s `overrideVars`
 * - zavolá `InsertAsyncAction(vars, gqlClient)`
 * - výsledek pošle do `dispatch`
 * - vrací Promise s výsledkem operace
 *
 * ------------------------------------------------------------
 * PARAMETRY
 * ------------------------------------------------------------
 *
 * @param {object} [overrideVars]
 *   Data pro vytvoření entity (např. `{ name: "Test" }`)
 *
 * ------------------------------------------------------------
 * NÁVRATOVÁ HODNOTA
 * ------------------------------------------------------------
 *
 * @returns {Promise<any | null>}
 *   Výsledek insert operace (typicky vytvořený objekt nebo GraphQL response)
 *
 * ------------------------------------------------------------
 * PŘÍKLADY
 * ------------------------------------------------------------
 *
 * @example
 * // jednoduché použití
 * const result = await createItem({
 *   name: "New item"
 * });
 *
 * console.log(result);
 *
 * @example
 * // typické použití s GraphQL insert
 *
 * const InsertAsyncAction = createAsyncGraphQLAction2(
 *   `
 *   mutation ($name: String!) {
 *     insertItem(name: $name) {
 *       id
 *       name
 *     }
 *   }
 *   `
 * );
 *
 * const createItem = createAsyncThunkRunner({
 *   AsyncAction: InsertAsyncAction,
 *   dispatch: store.dispatch,
 *   gqlClient
 * });
 *
 * const item = await createItem({ name: "Test" });
 *
 * @example
 * // použití bez Redux (např. v utilitě)
 *
 * const createItem = createAsyncThunkRunner({
 *   AsyncAction: InsertAsyncAction,
 *   gqlClient
 * });
 *
 * const item = await createItem({ name: "Standalone" });
 */
export const createItem = createAsyncThunkRunner({AsyncAction: InsertAsyncAction})