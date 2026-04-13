import { useGQLEntityContext } from "../../../../_template/src/Base/Helpers/GQLEntityProvider"

const safeValue = (value) => {
    if (value == null) return ""
    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
        return String(value)
    }
    if (typeof value === "object") {
        if ("content" in value) return String(value.content ?? "")
        return JSON.stringify(value)
    }
    return String(value)
}

export const ProjectReadContent = () => {
    const { item } = useGQLEntityContext()

    if (!item) return <div>Project nebyl nalezen.</div>

    return (
        <div style={{ padding: "1rem" }}>
            <h1>Detail projektu</h1>

            <p><strong>ID:</strong> {safeValue(item.id)}</p>
            <p><strong>Název:</strong> {safeValue(item.name)}</p>
            <p><strong>Název EN:</strong> {safeValue(item.nameEn)}</p>
            <p><strong>Vytvořeno:</strong> {safeValue(item.created)}</p>
            <p><strong>Poslední změna:</strong> {safeValue(item.lastchange)}</p>
        </div>
    )
}