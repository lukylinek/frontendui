import { Input } from "../../../../_template/src/Base/FormControls/Input"

export const MediumEditableContent = ({ item, onChange=(e)=>null, onBlur=(e)=>null, children}) => {
    return (
        <>
            <Input id="name" label="Název" className="form-control" value={item?.name ?? ""} onChange={onChange} onBlur={onBlur} />
            <Input id="nameEn" label="Anglický název" className="form-control" value={item?.nameEn ?? ""} onChange={onChange} onBlur={onBlur} />
            {children}
        </>
    )
}
