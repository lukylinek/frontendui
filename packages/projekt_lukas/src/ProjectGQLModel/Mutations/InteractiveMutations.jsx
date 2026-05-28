import { useState } from "react"

import { CardCapsule, VectorItemsURI } from "../Components"
import { UpdateBody, UpdateButton } from "./Update"
import { DeleteButton } from "./Delete"
import { CreateButton } from "./Create"
import { ProxyLink } from "../../../../_template/src/Base/Components/ProxyLink"

export const PageLink = ({ children, preserveHash = true, preserveSearch = true, ...props }) => {
    return (
        <ProxyLink
            to={VectorItemsURI}
            preserveHash={preserveHash}
            preserveSearch={preserveSearch}
            {...props}
        >
            {children}
        </ProxyLink>
    );
};

export const InteractiveMutations = ({ item }) => {
    const [showInlineEdit, setShowInlineEdit] = useState(false)

    return (
        <CardCapsule item={item} title="Nástroje">
            <PageLink className="btn btn-outline-success">
                Stránka
            </PageLink>

            <button
                type="button"
                className="btn btn-outline-success"
                onClick={() => setShowInlineEdit((value) => !value)}
            >
                Upravit
            </button>

            <UpdateButton className="btn btn-outline-success" item={item}>
                Upravit Dialog
            </UpdateButton>

            <DeleteButton className="btn btn-outline-danger" item={item}>
                Odstranit
            </DeleteButton>
            <CreateButton
    className="btn btn-outline-primary"
    item={{
        name: "Nový projekt",
        nameEn: "New project",
        done: false,
        masterprojectId: item.id,
        projectTypeId: item.projectTypeId,
    }}
>
    Vytvořit podprojekt
</CreateButton>


            {showInlineEdit && (
                <div className="mt-3">
                    <UpdateBody />
                </div>
            )}
        </CardCapsule>
    )
}