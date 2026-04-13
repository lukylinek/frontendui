import { registerLink } from "../../../../_template/src/Base/Components/Link";
import { ProxyLink } from "../../../../_template/src/Base/Components/ProxyLink";
import { ReadItemURI } from "./uris";

export const Link = ({
    item,
    action = "view",
    children,
    ...props
}) => {
    // vezmeme URI z routeru (např. /projekt_lukas/project/view/:id)
    const baseURI = String(ReadItemURI);

    // upravíme akci (view → edit / delete atd.)
    const actionURI = baseURI.replace("view", action);

    // doplníme id
    const targetURI = actionURI.replace(":id", item?.id);

    return (
        <ProxyLink to={targetURI} {...props}>
            {children || item?.fullname || item?.name || item?.id || "Nevim"}
        </ProxyLink>
    );
};

// 🔥 důležité: správný název modelu
registerLink("ProjectGQLModel", Link);