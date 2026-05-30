import { DateTimeFilter, Filter as BaseFilter, StringFilter, UUIDFilter } from "../../../../_template/src/Base/FormControls/Filter"

export const Filter = ({ id, onChange: handleChange, children }) => {
    return (
        <BaseFilter id={id} onChange={handleChange}>
            <UUIDFilter id="id" label="ID" />
            <StringFilter id="name" label="Název" />
            <DateTimeFilter id="startdate" label="Začátek od" emitUtcIso={false} />
            <DateTimeFilter id="enddate" label="Konec do" emitUtcIso={false} />
            {children}
        </BaseFilter>
    )
}

