import {
    UpdateButton as BaseUpdateButton,
    UpdateBody as BaseUpdateBody,
} from "../../../../_template/src/Base/Mutations/Update"
import { Input } from "../../../../_template/src/Base/FormControls/Input"
import { UpdateAsyncAction } from "../Queries/UpdateAsyncAction"

const DefaultContent = ({ item, onChange, onBlur }) => (
    <>
        <Input id="name" label="Název" className="form-control" value={item?.name ?? ""} onChange={onChange} onBlur={onBlur} />
        <Input id="nameEn" label="Anglický název" className="form-control" value={item?.nameEn ?? ""} onChange={onChange} onBlur={onBlur} />
        <Input id="description" label="Popis" className="form-control" value={item?.description ?? ""} onChange={onChange} onBlur={onBlur} />
    </>
)

const permissions = {
    oneOfRoles: ["administrátor", "studijní administrátor"],
    mode: "absolute",
}

export const UpdateFinanceButton = ({ item, ...props }) => (
    <BaseUpdateButton
        {...props}
        item={item}
        DefaultContent={DefaultContent}
        mutationAsyncAction={UpdateAsyncAction}
        {...permissions}
    />
)

export const UpdateFinanceBody = ({ item, ...props }) => (
    <BaseUpdateBody
        {...props}
        item={item}
        DefaultContent={DefaultContent}
        mutationAsyncAction={UpdateAsyncAction}
        {...permissions}
    />
)
