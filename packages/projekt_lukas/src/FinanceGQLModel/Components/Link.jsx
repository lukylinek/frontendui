import { registerLink } from "../../../../_template/src/Base/Components/Link"
import { ProxyLink } from "../../../../_template/src/Base/Components/ProxyLink"
import { ReadItemURI } from "./uris"

export const Link = ({ item, children, ...props }) => {
    const to = String(ReadItemURI).replace(":id", item?.id)
    return (
        <ProxyLink to={to} {...props}>
            {children || item?.name || item?.id || "-"}
        </ProxyLink>
    )
}

registerLink("FinanceGQLModel", Link)
