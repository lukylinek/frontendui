import { useSelector } from "react-redux"
import { useParams } from "react-router"

import { selectItemById } from "../../../packages/dynamic/src/Store";
// import { MyNavDropdown as GroupTypeNavDropdown } from "../../../packages/_template/src/GroupTypeGQLModel";
import { MyNavDropdown as UserNavDropdown } from "../../../packages/_template/src/UserGQLModel";
import { MyNavDropdown as GroupNavDropdown } from "../../../packages/_template/src/GroupGQLModel";
import { MyNavDropdown as RoleNavDropdown } from "../../../packages/_template/src/RoleGQLModel";
// import { MyNavDropdown as RoleTypeNavDropdown } from "../../../packages/_template/src/RoleTypeGQLModel";
import { PageNavbar } from "../../../packages/_template/src/Base/Pages/PageNavbar";

export const AppNavbar = () => {
    const { id } = useParams()
    const item = useSelector((dataroot) => selectItemById(dataroot, id)) || {}
    // console.log("AppNavbar", id, item)
    return (
        <PageNavbar item={item}>
            <UserNavDropdown item={item} />
            <GroupNavDropdown item={item} />
            <RoleNavDropdown item={item} />
            {/* <GroupTypeNavDropdown item={item} /> */}
            {/* <RoleTypeNavDropdown item={item} /> */}
        </PageNavbar>
    )
}
