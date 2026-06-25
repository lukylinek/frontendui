import { CreateURI, MediumEditableContent, ReadItemURI } from "../Components"
import { MasterInsertAsyncAction } from "../Queries/MasterInsertAsyncAction"
import {
    CreateButton as BaseCreateButton,
    CreateDialog as BaseCreateDialog,
} from "../../../../_template/src/Base/Mutations/Create"
import { Label } from "../../../../_template/src/Base/FormControls/Label"
import { Input } from "../../../../_template/src/Base/FormControls/Input"
import { useEffect, useState } from "react"
import { useGQLClient } from "../../../../dynamic/src/Store"

const PROJECT_TYPE_QUERY = `
query {
  projectTypePage(skip: 0, limit: 200) {
    __typename id name nameEn
  }
}
`

const GROUP_QUERY = `
query {
  groupPage(skip: 0, limit: 200) {
    __typename id name
  }
}
`

const ProjectTypeSelect = ({ value, onChange }) => {
    const [types, setTypes] = useState([])
    const gqlClient = useGQLClient()

    useEffect(() => {
        if (!gqlClient) return
        gqlClient.query(PROJECT_TYPE_QUERY)
            .then(result => setTypes(result?.data?.projectTypePage ?? []))
            .catch(() => {})
    }, [gqlClient])

    return (
        <Label title="Typ projektu">
            <select
                id="projectTypeId"
                className="form-control"
                value={value ?? ""}
                onChange={(e) => onChange({ target: { id: "projectTypeId", value: e.target.value || null } })}
            >
                <option value="">— bez typu —</option>
                {types.map((t) => (
                    <option key={t.id} value={t.id}>
                        {t.name}{t.nameEn ? ` / ${t.nameEn}` : ""}
                    </option>
                ))}
            </select>
        </Label>
    )
}

const GroupSelect = ({ value, onChange }) => {
    const [groups, setGroups] = useState([])
    const gqlClient = useGQLClient()

    useEffect(() => {
        if (!gqlClient) return
        gqlClient.query(GROUP_QUERY)
            .then(result => setGroups(result?.data?.groupPage ?? []))
            .catch(() => {})
    }, [gqlClient])

    return (
        <Label title="Skupina / Katedra *">
            <select
                id="groupId"
                className="form-control"
                value={value ?? ""}
                onChange={(e) => onChange({ target: { id: "groupId", value: e.target.value || null } })}
            >
                <option value="">— vyberte skupinu —</option>
                {groups.map((g) => (
                    <option key={g.id} value={g.id}>{g.name}</option>
                ))}
            </select>
        </Label>
    )
}

const DefaultContent = ({ item, onChange, onBlur, children }) => (
    <MediumEditableContent item={item} onChange={onChange} onBlur={onBlur}>
        <Input id="description" label="Popis" className="form-control" value={item?.description ?? ""} onChange={onChange} onBlur={onBlur} />
        <Label title="Dokončeno">
            <select
                id="done"
                className="form-control"
                value={String(item?.done ?? false)}
                onChange={(e) => onChange({ target: { id: "done", value: e.target.value === "true" } })}
            >
                <option value="false">Nedokončeno</option>
                <option value="true">Dokončeno</option>
            </select>
        </Label>
        <ProjectTypeSelect value={item?.projectTypeId} onChange={onChange} />
        <GroupSelect value={item?.groupId} onChange={onChange} />
        {children}
    </MediumEditableContent>
)

const defaultitem = { name: "Nový projekt", nameEn: "New project", done: false }

export const CreateMasterDialog = ({
    title = "Nový hlavní projekt",
    DefaultContent: defaultContent = DefaultContent,
    readItemURI = ReadItemURI,
    item = defaultitem,
    ...props
}) => (
    <BaseCreateDialog
        {...props}
        title={title}
        DefaultContent={defaultContent}
        readItemURI={readItemURI}
        item={item}
    />
)

export const CreateMasterButton = ({
    item = defaultitem,
    ...props
}) => (
    <BaseCreateButton
        {...props}
        item={item}
        CreateDialog={CreateMasterDialog}
        DefaultContent={DefaultContent}
        mutationAsyncAction={MasterInsertAsyncAction}
        readItemURI={ReadItemURI}
        oneOfRoles={["administrátor", "studijní administrátor"]}
        mode="absolute"
    />
)
