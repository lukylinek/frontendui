import { DeleteItemURI, ListURI, MediumContent, VectorItemsURI } from "../Components";
import { DeleteAsyncAction } from "../Queries";
import { 
    DeleteBody as BaseDeleteBody, 
    DeleteButton as BaseDeleteButton, 
    DeleteDialog as BaseDeleteDialog, 
    DeleteLink as BaseDeleteLink
} from "../../../../_template/src/Base/Mutations/Delete";

const DefaultContent = MediumContent
const MutationAsyncAction = DeleteAsyncAction

const permissions = {
    oneOfRoles: ["superadmin"],
    mode: "absolute",
}

/**
 * Link na delete route pro konkrétní entitu.
 *
 * Wrapper nad `BaseDeleteLink`. Nastavuje výchozí `uriPattern` pro delete route a aplikuje RBAC
 * přes `permissions`. Ostatní props přeposílá do Base komponenty.
 *
 * @param {Object} params
 * @param {string} [params.uriPattern=DeleteItemURI]
 *   URI pattern pro delete route (typicky obsahuje `:id` nebo odpovídá routování aplikace).
 * @param {Object} params.props
 *   Další props přeposílané do `BaseDeleteLink` (např. `children`, `className`,
 *   `preserveSearch`, `preserveHash`, atd.).
 *
 * @returns {JSX.Element}
 */
export const DeleteLink = ({ 
    uriPattern=DeleteItemURI,
    ...props
 }) => {
    return (
        <BaseDeleteLink 
            {...props} 
            uriPattern={uriPattern} 
            {...permissions}
        />
    )
};

/**
 * Tlačítko pro smazání entity (obvykle otevře confirm dialog a spustí delete mutaci).
 *
 * Wrapper nad `BaseDeleteButton`. Dodává výchozí `DefaultContent`, `mutationAsyncAction`
 * a `vectorItemsURI` (kam se naviguje po úspěšném smazání, pokud není použit `onOk`).
 *
 * Chování navigace / callback:
 * - Pokud je definované `onOk`, použije se pro “feedback”, že mazání proběhlo (tj. uživatel si
 *   rozhodne, co dál).
 * - Pokud `onOk` definované není, Base implementace typicky naviguje na `vectorItemsURI`.
 *
 * @param {Object} params
 * @param {Function} [params.mutationAsyncAction=MutationAsyncAction]
 *   Async action (thunk) pro delete operaci (např. DeleteAsyncAction).
 *
 * @param {React.ComponentType<Object>} [params.DefaultContent=MediumContent]
 *   Komponenta pro zobrazení mazáné entity v confirm dialogu (read-only).
 *
 * @param {string} [params.vectorItemsURI=ListURI]
 *   URI pro návrat po úspěšném smazání (typicky list stránka / kolekce).
 *
 * @param {Function} [params.onOk]
 *   Callback po úspěšném smazání. Pokud není zadán, Base implementace typicky použije navigaci na `vectorItemsURI`.
 *
 * @param {Object}} params.props
 *   Další props přeposílané do `BaseDeleteButton` (např. `children`, `title`, `className`,
 *   `rbacitem`, `item`, `disabled`, atd. – podle Base/General implementace).
 *
 * @returns {JSX.Element}
 */
export const DeleteButton = ({
    mutationAsyncAction=MutationAsyncAction,
    DefaultContent:DefaultContent_=DefaultContent,
    Dialog=DeleteDialog,
    vectorItemsURI=ListURI,
    onOk,
    ...props 
}) => {
    return (
        <BaseDeleteButton 
            {...props} 
            DefaultContent={DefaultContent_} 
            Dialog={Dialog}
            mutationAsyncAction={mutationAsyncAction}
            vectorItemsURI={vectorItemsURI}
            onOk={onOk}
            {...permissions}
        />
    )
}

/**
 * Confirm dialog pro smazání entity.
 *
 * Wrapper nad `BaseDeleteDialog`. Dodává výchozí `DefaultContent` (read-only zobrazení entity),
 * `mutationAsyncAction` a `vectorItemsURI` pro návrat po úspěchu (dle Base/General implementace).
 *
 * @param {Object} params
 * @param {Function} [params.mutationAsyncAction=MutationAsyncAction]
 *   Async action (thunk) pro delete operaci (např. DeleteAsyncAction).
 *
 * @param {React.ComponentType<Object>} [params.DefaultContent=MediumContent]
 *   Komponenta pro zobrazení mazáné entity (read-only).
 *
 * @param {string} [params.vectorItemsURI=ListURI]
 *   URI pro návrat po úspěšném smazání (typicky list stránka / kolekce).
 *
 * @param {Object}} params.props
 *   Další props přeposílané do `BaseDeleteDialog` (např. `title`, `oklabel`, `cancellabel`,
 *   `item`, `onOk`, `onCancel`, atd.).
 *
 * @returns {JSX.Element}
 */
export const DeleteDialog = ({
    mutationAsyncAction=MutationAsyncAction,
    DefaultContent:DefaultContent_=DefaultContent,
    vectorItemsURI=ListURI,
    ...props 
}) => {
    return (
        <BaseDeleteDialog 
            {...props} 
            DefaultContent={DefaultContent_} 
            mutationAsyncAction={mutationAsyncAction}
            vectorItemsURI={vectorItemsURI}
            {...permissions}
        />
    )
}

/**
 * “Page-level” delete workflow (mazání na celé stránce / v těle stránky).
 *
 * Wrapper nad `BaseDeleteBody`. Dodává výchozí `DefaultContent`, `mutationAsyncAction`
 * a `vectorItemsURI` a aplikuje RBAC přes `permissions`.
 *
 * @param {Object} params
 * @param {Function} [params.mutationAsyncAction=MutationAsyncAction]
 *   Async action (thunk) pro delete operaci (např. DeleteAsyncAction).
 *
 * @param {React.ComponentType<Object>} [params.DefaultContent=MediumContent]
 *   Komponenta pro zobrazení mazáné entity (read-only).
 *
 * @param {string} [params.vectorItemsURI=ListURI]
 *   URI pro návrat po úspěšném smazání (typicky list stránka / kolekce).
 *
 * @param {Object}} params.props
 *   Další props přeposílané do `BaseDeleteBody` (např. `title`, `oklabel`, `cancellabel`,
 *   `item`, `onOk`, `onCancel`, atd.).
 *
 * @returns {JSX.Element}
 */
export const DeleteBody = ({ 
    mutationAsyncAction=MutationAsyncAction,
    DefaultContent:DefaultContent_=DefaultContent,
    vectorItemsURI=ListURI,
    ...props
}) => {
    return (
        <BaseDeleteBody 
            {...props} 
            DefaultContent={DefaultContent_} 
            mutationAsyncAction={mutationAsyncAction}
            vectorItemsURI={vectorItemsURI}
            {...permissions}
        />
    )
}
