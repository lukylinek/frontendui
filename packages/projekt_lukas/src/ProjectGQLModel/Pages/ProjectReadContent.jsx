import { useGQLEntityContext } from "../../../../_template/src/Base/Helpers/GQLEntityProvider"
import { LargeCard } from "../Components"

const safeValue = (value) => {
    if (value == null) return ""
    if (
        typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean"
    ) {
        return String(value)
    }
    if (typeof value === "object") {
        if ("content" in value) return String(value.content ?? "")
        return JSON.stringify(value)
    }
    return String(value)
}

const InfoRow = ({ label, value }) => {
    const rendered = safeValue(value)
    if (!rendered) return null

    return (
        <div style={{ marginBottom: "1rem" }}>
            <div style={{ fontWeight: 700, marginBottom: "0.2rem" }}>{label}</div>
            <div>{rendered}</div>
        </div>
    )
}

export const ProjectReadContent = () => {
    const { item } = useGQLEntityContext()

    if (!item) return <div>Project nebyl nalezen.</div>

    return (
        <LargeCard item={item}>
            <div
                style={{
                    padding: "1.5rem",
                    maxWidth: "700px",
                }}
            >
                <h1
                    style={{
                        marginTop: 0,
                        marginBottom: "1.5rem",
                        fontSize: "2.2rem",
                        fontWeight: 700,
                    }}
                >
                    Detail projektu
                </h1>

                <InfoRow label="ID" value={item.id} />
                <InfoRow label="Název" value={item.name} />
                <InfoRow label="Název EN" value={item.nameEn} />
                <InfoRow label="Vytvořeno" value={item.created} />
                <InfoRow label="Poslední změna" value={item.lastchange} />
            </div>
        </LargeCard>
    )
}