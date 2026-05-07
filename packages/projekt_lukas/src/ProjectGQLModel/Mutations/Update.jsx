import {
    UpdateBody as BaseUpdateBody,
    UpdateButton as BaseUpdateButton,
    UpdateDialog as BaseUpdateDialog,
    UpdateLink as BaseUpdateLink
} from "../../../../_template/src/Base/Mutations/Update";

import { MediumEditableContent, UpdateItemURI } from "../Components";
import { UpdateAsyncAction } from "../Queries";

const DefaultContent = (props) => <MediumEditableContent {...props} />;
const mutationAsyncAction = UpdateAsyncAction;

/*
 * Template původně používal:
 * oneOfRoles: ["superadmin"]
 * mode: "absolute"
 *
 * My používáme reálné role, které má uživatel přidané přes backend RBAC.
 * Role jsme přidali přes GraphQL mutaci roleInsert.
 */
const permissions = {
    oneOfRoles: ["administrátor", "studijní administrátor"],
    mode: "item",
};

export const UpdateLink = ({
    uriPattern = UpdateItemURI,
    ...props
}) => {
    return (
        <BaseUpdateLink
            {...props}
            uriPattern={uriPattern}
            {...permissions}
        />
    );
};

export const UpdateDialog = ({
    DefaultContent: DefaultContent_ = DefaultContent,
    mutationAsyncAction: mutationAsyncAction_ = mutationAsyncAction,
    ...props
}) => {
    return (
        <BaseUpdateDialog
            {...props}
            DefaultContent={DefaultContent_}
            mutationAsyncAction={mutationAsyncAction_}
            {...permissions}
        />
    );
};

export const UpdateButton = ({
    DefaultContent: DefaultContent_ = DefaultContent,
    Dialog = UpdateDialog,
    mutationAsyncAction: mutationAsyncAction_ = mutationAsyncAction,
    ...props
}) => {
    return (
        <BaseUpdateButton
            {...props}
            DefaultContent={DefaultContent_}
            Dialog={Dialog}
            mutationAsyncAction={mutationAsyncAction_}
            {...permissions}
        />
    );
};

export const UpdateBody = ({
    DefaultContent: DefaultContent_ = DefaultContent,
    mutationAsyncAction: mutationAsyncAction_ = mutationAsyncAction,
    ...props
}) => {
    return (
        <BaseUpdateBody
            {...props}
            DefaultContent={DefaultContent_}
            mutationAsyncAction={mutationAsyncAction_}
            {...permissions}
        />
    );
};