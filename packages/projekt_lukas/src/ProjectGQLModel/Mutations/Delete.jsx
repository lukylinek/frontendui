import { DeleteItemURI, ListURI } from "../Components";
import { DeleteAsyncAction } from "../Queries";
import { 
    DeleteBody as BaseDeleteBody, 
    DeleteButton as BaseDeleteButton, 
    DeleteDialog as BaseDeleteDialog, 
    DeleteLink as BaseDeleteLink
} from "../../../../_template/src/Base/Mutations/Delete";

const MutationAsyncAction = DeleteAsyncAction;

const permissions = {
    oneOfRoles: ["administrátor", "studijní administrátor"],
    mode: "absolute",
};

const formatDate = (value) => {
    if (!value) return "-";

    try {
        return new Date(value).toLocaleDateString("cs-CZ");
    } catch {
        return String(value);
    }
};

const DeletePreview = ({ item }) => {
    if (!item) {
        return (
            <div className="alert alert-warning mb-0">
                Projekt nebyl nalezen.
            </div>
        );
    }

    return (
        <div className="d-flex flex-column gap-3">
            <div className="alert alert-danger mb-0">
                Opravdu chcete odstranit tento projekt?
            </div>

            <div className="card border-0 shadow-sm">
                <div className="card-body">
                    <h5 className="card-title mb-1">
                        {item.name ?? "Bez názvu"}
                    </h5>

                    <div className="text-muted mb-3">
                        {item.nameEn || "Anglický název není vyplněn"}
                    </div>

                    <div className="d-flex justify-content-between gap-3 border-bottom py-2">
                        <strong className="text-muted">Začátek</strong>
                        <span className="text-end">{formatDate(item.startdate)}</span>
                    </div>

                    <div className="d-flex justify-content-between gap-3 border-bottom py-2">
                        <strong className="text-muted">Konec</strong>
                        <span className="text-end">{formatDate(item.enddate)}</span>
                    </div>

                    <div className="d-flex justify-content-between gap-3 border-bottom py-2">
                        <strong className="text-muted">Typ projektu</strong>
                        <span className="text-end">{item.type?.name ?? "-"}</span>
                    </div>

                    <div className="d-flex justify-content-between gap-3 border-bottom py-2">
                        <strong className="text-muted">Finance</strong>
                        <span className="text-end">{item.finance?.name ?? "-"}</span>
                    </div>

                    <div className="d-flex justify-content-between gap-3 py-2">
                        <strong className="text-muted">Nadřazený projekt</strong>
                        <span className="text-end">{item.masterproject?.name ?? "-"}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DefaultContent = DeletePreview;

export const DeleteLink = ({ 
    uriPattern = DeleteItemURI,
    ...props
}) => {
    return (
        <BaseDeleteLink 
            {...props} 
            uriPattern={uriPattern} 
            {...permissions}
        />
    );
};

export const DeleteButton = ({
    mutationAsyncAction = MutationAsyncAction,
    DefaultContent: DefaultContent_ = DefaultContent,
    Dialog = DeleteDialog,
    vectorItemsURI = ListURI,
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
    );
};

export const DeleteDialog = ({
    mutationAsyncAction = MutationAsyncAction,
    DefaultContent: DefaultContent_ = DefaultContent,
    vectorItemsURI = ListURI,
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
    );
};

export const DeleteBody = ({ 
    mutationAsyncAction = MutationAsyncAction,
    DefaultContent: DefaultContent_ = DefaultContent,
    vectorItemsURI = ListURI,
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
    );
};