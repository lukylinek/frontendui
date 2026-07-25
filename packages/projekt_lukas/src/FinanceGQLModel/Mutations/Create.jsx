import { Input } from "../../../../_template/src/Base/FormControls/Input"
import { Label } from "../../../../_template/src/Base/FormControls/Label"
import {
    CreateButton as BaseCreateButton,
    CreateDialog as BaseCreateDialog,
} from "../../../../_template/src/Base/Mutations/Create"
import { InsertAsyncAction } from "../Queries/InsertAsyncAction"
import { ReadItemURI } from "../Components/uris"

const DefaultContent = ({ item, onChange, onBlur }) => (
    <>
        <Input id="name" label="Název" className="form-control" value={item?.name ?? ""} onChange={onChange} onBlur={onBlur} />
        <Input id="nameEn" label="Anglický název" className="form-control" value={item?.nameEn ?? ""} onChange={onChange} onBlur={onBlur} />
        <Input id="description" label="Popis" className="form-control" value={item?.description ?? ""} onChange={onChange} onBlur={onBlur} />
        <Input id="value" label="Hodnota (Kč)" type="number" className="form-control" value={item?.value ?? ""} onChange={onChange} onBlur={onBlur} />
        <Label title="ID nadřazené finance *">
            <input
                id="masterfinanceId"
                className="form-control"
                placeholder="UUID nadřazené finance"
                value={item?.masterfinanceId ?? ""}
                onChange={(e) => onChange({ target: { id: "masterfinanceId", value: e.target.value } })}
            />
        </Label>
    </>
)

const defaultItem = { name: "Nová finance", nameEn: "New finance" }

const permissions = {
    oneOfRoles: ["administrátor", "studijní administrátor"],
    mode: "absolute",
}

export const CreateFinanceDialog = ({ item = defaultItem, title = "Nová finance", ...props }) => (
    <BaseCreateDialog {...props} title={title} item={item} DefaultContent={DefaultContent} />
)

export const CreateFinanceButton = ({ item = defaultItem, ...props }) => (
    <BaseCreateButton
        {...props}
        item={item}
        CreateDialog={CreateFinanceDialog}
        DefaultContent={DefaultContent}
        mutationAsyncAction={InsertAsyncAction}
        readItemURI={ReadItemURI}
        {...permissions}
    />
)
