import {
    UpdateButton as BaseUpdateButton,
    UpdateDialog as BaseUpdateDialog,
    UpdateLink as BaseUpdateLink
} from "../../../../_template/src/Base/Mutations/Update";

import { useCallback } from "react";
import { useEditAction } from "../../../../dynamic/src/Hooks/useEditAction";
import { AsyncStateIndicator } from "../../../../_template/src/Base/Helpers/AsyncStateIndicator";
import { useGQLEntityContext } from "../../../../_template/src/Base/Helpers/GQLEntityProvider";

import { MediumEditableContent, UpdateItemURI } from "../Components";
import { UpdateAsyncAction } from "../Queries";

const DefaultContent = (props) => <MediumEditableContent {...props} />;
const mutationAsyncAction = UpdateAsyncAction;

const permissions = {};

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

const onDoneDefault = () => null;

export const UpdateBody = ({
    children,
    onDone = onDoneDefault
}) => {
    const { item, onChange: contextOnChange } = useGQLEntityContext();

    const {
        draft,
        dirty,
        onChange,
        onBlur,
        onCancel,
        onConfirm,
        error,
        loading: saving
    } = useEditAction(UpdateAsyncAction, item, { mode: "confirm" });

    const handleCancel = useCallback(() => {
        onCancel();
        onDone();
    }, [onCancel, onDone]);

    const handleConfirm = useCallback(async () => {
        const result = await onConfirm();

        if (result && contextOnChange) {
            const event = { target: { value: result } };
            await contextOnChange(event);
        }

        onDone();
        return result;
    }, [onConfirm, contextOnChange, onDone]);

    if (!item?.id) {
        return (
            <div className="container mt-3">
                <h2>Editace ProjectGQLModel</h2>
                <div className="alert alert-warning">
                    Projekt nebyl načten.
                </div>
            </div>
        );
    }

    const visibleItem = draft ?? item;

    return (
    <div className="container-fluid mt-3">
        <div className="row g-3">
            <div className="col-12 col-md-4">
                <div className="card shadow-sm">
                    <div className="card-header fw-bold">
                        DETAIL
                    </div>

                    <div className="card-body">
                        <h5 className="card-title">
                            {item?.name ?? "Bez názvu"}
                        </h5>

                        <p className="text-muted mb-3">
                            ProjectGQLModel
                        </p>

                        <div className="mb-2">
                            <strong>ID</strong>
                            <div className="small text-break">{item?.id}</div>
                        </div>

                        <div className="mb-2">
                            <strong>Název</strong>
                            <div>{item?.name ?? "-"}</div>
                        </div>

                        <div className="mb-2">
                            <strong>Anglický název</strong>
                            <div>{item?.nameEn ?? "-"}</div>
                        </div>

                        <div className="mb-2">
                            <strong>Začátek</strong>
                            <div>{item?.startdate ?? "-"}</div>
                        </div>

                        <div className="mb-2">
                            <strong>Konec</strong>
                            <div>{item?.enddate ?? "-"}</div>
                        </div>

                        <div className="mb-2">
                            <strong>Lastchange</strong>
                            <div className="small text-break">{item?.lastchange}</div>
                        </div>
                    </div>
                </div>

                <div className="card shadow-sm mt-3">
                    <div className="card-header fw-bold">
                        NÁSTROJE
                    </div>

                    <div className="card-body">
                        <button
                            type="button"
                            className="btn btn-warning form-control mb-2"
                            onClick={handleCancel}
                            disabled={!dirty || saving}
                        >
                            Zrušit změny
                        </button>

                        <button
                            type="button"
                            className="btn btn-primary form-control"
                            onClick={handleConfirm}
                            disabled={!dirty || saving}
                        >
                            Uložit změny
                        </button>
                    </div>
                </div>
            </div>

            <div className="col-12 col-md-8">
                <div className="card shadow-sm">
                    <div className="card-header fw-bold">
                        Dej jméno této entitě
                    </div>

                    <div className="card-body">
                        <AsyncStateIndicator
                            error={error}
                            loading={saving}
                            text="Ukládám"
                        />

                        <MediumEditableContent
                            item={visibleItem}
                            onChange={onChange}
                            onBlur={onBlur}
                        >
                            {children}
                        </MediumEditableContent>
                    </div>
                </div>

                <div className="card shadow-sm mt-3">
                    <div className="card-header fw-bold">
                        Aktuální draft
                    </div>

                    <div className="card-body">
                        <pre className="mb-0">
                            {JSON.stringify(visibleItem, null, 2)}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
};