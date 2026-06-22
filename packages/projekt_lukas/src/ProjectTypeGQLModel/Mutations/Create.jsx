import { Input } from "../../../../_template/src/Base/FormControls/Input"
import {
    CreateButton as BaseCreateButton,
    CreateDialog as BaseCreateDialog,
} from "../../../../_template/src/Base/Mutations/Create"
import { InsertAsyncAction } from "../Queries/InsertAsyncAction"



const DefaultContent = ({ item, onChange, onBlur }) => (
    <>
        <Input
            id="name"
            label="Název"
            className="form-control"
            value={item?.name ?? ""}
            onChange={onChange}
            onBlur={onBlur}
        />
        <Input
            id="nameEn"
            label="Anglický název"
            className="form-control"
            value={item?.nameEn ?? ""}
            onChange={onChange}
            onBlur={onBlur}
        />
        <Input
            id="mastertypeId"
            label="ID nadřazeného typu (UUID)"
            className="form-control"
            value={item?.mastertypeId ?? ""}
            onChange={onChange}
            onBlur={onBlur}
        />
    </>
)

const defaultItem = { name: "Nový typ projektu", nameEn: "New project type", mastertypeId: "" }

const permissions = {
    oneOfRoles: ["administrátor", "studijní administrátor"],
    mode: "absolute",
}

export const CreateProjectTypeDialog = ({ item = defaultItem, title = "Nový typ projektu", ...props }) => (
    <BaseCreateDialog
        {...props}
        title={title}
        item={item}
        DefaultContent={DefaultContent}
    />
)

export const CreateProjectTypeButton = ({ item = defaultItem, ...props }) => (
    <BaseCreateButton
        {...props}
        item={item}
        CreateDialog={CreateProjectTypeDialog}
        DefaultContent={DefaultContent}
        mutationAsyncAction={InsertAsyncAction}
        {...permissions}
    />
)
