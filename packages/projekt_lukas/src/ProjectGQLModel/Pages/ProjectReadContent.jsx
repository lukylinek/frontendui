import { useGQLEntityContext } from "../../../../_template/src/Base/Helpers/GQLEntityProvider"

export const ProjectReadContent = () => {
    const { item } = useGQLEntityContext()

    if (!item) return <div>Project nebyl nalezen.</div>

    return (
        <div style={{ padding: "1rem" }}>
            <h1>Detail projektu</h1>

            <p><strong>ID:</strong> {item.id}</p>
            <p><strong>Název:</strong> {item.name}</p>
            <p><strong>Název EN:</strong> {item.nameEn}</p>
            <p><strong>Vytvořeno:</strong> {item.created}</p>
            <p><strong>Poslední změna:</strong> {item.lastchange}</p>
        </div>
    )
}