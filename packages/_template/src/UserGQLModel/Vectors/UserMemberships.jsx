import { BaseUI } from "../../Base"
import { Attribute } from "../../../../_template/src/Base/Components/Attribute"
import { Table } from "../../../../_template/src/Base/Components/Table"
import { CardCapsule } from "../Components"

export const UserMembershipsCard = ({ item, children }) => {
    const { memberships=[] } = item || {}

    return (
        <CardCapsule item={item} title="Členství">
            {children}
            <Memberships memberships={memberships} />
            {/* <AllRoles roles={rolesOn} /> */}
        </CardCapsule>
    )
}

export const Memberships = ({ memberships }) => {
    const groups = memberships?.map(m => m?.group || {}) || []
    const katedry = groups?.filter(g => g?.grouptype?.name === "katedra") || []
    const fakulty = groups?.filter(g => g?.grouptype?.name === "fakulta") || []
    const univerzity = groups?.filter(g => g?.grouptype?.name === "univerzita") || []
    
    return (
        <>
            {katedry.map(group => (
                <Attribute key={group.id} label="Katedra">
                    <BaseUI.Link item={group} />
                </Attribute>
            ))}
            {/* {katedry.length > 0 && <hr />}     */}
            {fakulty.map(group => (
                <Attribute key={group.id} label="Fakulta">
                    <BaseUI.Link item={group} />
                </Attribute>
            ))}
            {univerzity.map(group => (
                <Attribute key={group.id} label="Univerzita">
                    <BaseUI.Link item={group} />
                </Attribute>
            ))}
        </>
    )
}


export const UserMembershipsTable = ({ item, title="Členství", children }) => {
    const { memberships=[] } = item || {}
    const groups = memberships.map(m => m?.group).filter(Boolean)
    return (
        <CardCapsule title={title} item={item}>
            {children}
            <Table data={groups} />
        </CardCapsule>
    )
}