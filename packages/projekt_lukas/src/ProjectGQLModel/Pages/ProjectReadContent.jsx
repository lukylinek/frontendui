import { useMemo } from "react"
import { useGQLEntityContext } from "../../../../_template/src/Base/Helpers/GQLEntityProvider"
import { LargeCard } from "../Components"

const formatDate = (value) => {
    if (!value) return ""
    try {
        return new Date(value).toLocaleString("cs-CZ")
    } catch {
        return String(value)
    }
}

const isScalar = (value) => {
    return (
        value == null ||
        typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean"
    )
}

const isArray = (value) => Array.isArray(value)

const isObject = (value) => {
    return value !== null && typeof value === "object" && !Array.isArray(value)
}

const safeScalarValue = (key, value) => {
    if (value == null) return ""
    if (typeof value === "boolean") return value ? "Ano" : "Ne"

    const lowered = String(key).toLowerCase()
    if (
        lowered.includes("date") ||
        lowered.includes("created") ||
        lowered.includes("lastchange") ||
        lowered.includes("updated")
    ) {
        return formatDate(value)
    }

    return String(value)
}

const Section = ({ title, children }) => (
    <div
        style={{
            marginBottom: "1.5rem",
            padding: "1rem 1.25rem",
            border: "1px solid #d9d9d9",
            borderRadius: "10px",
            background: "white",
        }}
    >
        <h2
            style={{
                marginTop: 0,
                marginBottom: "1rem",
                fontSize: "1.8rem",
                fontWeight: 700,
            }}
        >
            {title}
        </h2>
        {children}
    </div>
)

const Row = ({ label, value }) => {
    if (value === "") return null

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "220px 1fr",
                gap: "0.75rem",
                padding: "0.45rem 0",
                borderBottom: "1px solid #f0f0f0",
            }}
        >
            <div style={{ fontWeight: 700, wordBreak: "break-word" }}>{label}</div>
            <div style={{ wordBreak: "break-word" }}>{value}</div>
        </div>
    )
}

const ArrayItemCard = ({ item, index }) => {
    if (isScalar(item)) {
        return (
            <div
                style={{
                    padding: "0.9rem",
                    border: "1px solid #e5e5e5",
                    borderRadius: "8px",
                    marginBottom: "0.75rem",
                    background: "white",
                }}
            >
                {String(item)}
            </div>
        )
    }

    if (isObject(item)) {
        const entries = Object.entries(item).filter(([, value]) => isScalar(value))

        return (
            <div
                style={{
                    padding: "0.9rem",
                    border: "1px solid #e5e5e5",
                    borderRadius: "8px",
                    marginBottom: "0.75rem",
                    background: "white",
                }}
            >
                <div style={{ fontWeight: 700, marginBottom: "0.6rem" }}>
                    Položka {index + 1}
                </div>

                {entries.length === 0 ? (
                    <div>Objekt nemá přímo zobrazitelné skalární hodnoty.</div>
                ) : (
                    entries.map(([key, value]) => (
                        <Row
                            key={key}
                            label={key}
                            value={safeScalarValue(key, value)}
                        />
                    ))
                )}
            </div>
        )
    }

    return null
}

const TreeNode = ({ label, value, level = 0 }) => {
    const marginLeft = `${level * 18}px`

    if (isScalar(value)) {
        const rendered = safeScalarValue(label, value)
        if (rendered === "") return null

        return (
            <div style={{ marginLeft, marginBottom: "0.4rem" }}>
                <span style={{ fontWeight: 700 }}>{label}:</span> {rendered}
            </div>
        )
    }

    if (isArray(value)) {
        return (
            <div style={{ marginLeft, marginBottom: "0.75rem" }}>
                <div style={{ fontWeight: 700, marginBottom: "0.35rem" }}>
                    {label} [{value.length}]
                </div>

                {value.length === 0 ? (
                    <div style={{ marginLeft: "1rem" }}>Prázdné pole</div>
                ) : (
                    value.map((item, index) => (
                        <div
                            key={item?.id ?? `${label}-${index}`}
                            style={{
                                marginLeft: "1rem",
                                paddingLeft: "0.75rem",
                                borderLeft: "2px solid #e6e6e6",
                                marginBottom: "0.5rem",
                            }}
                        >
                            <TreeNode
                                label={`${label}[${index}]`}
                                value={item}
                                level={0}
                            />
                        </div>
                    ))
                )}
            </div>
        )
    }

    if (isObject(value)) {
        const entries = Object.entries(value)

        return (
            <div style={{ marginLeft, marginBottom: "0.75rem" }}>
                <div style={{ fontWeight: 700, marginBottom: "0.35rem" }}>{label}</div>
                <div
                    style={{
                        marginLeft: "1rem",
                        paddingLeft: "0.75rem",
                        borderLeft: "2px solid #e6e6e6",
                    }}
                >
                    {entries.length === 0 ? (
                        <div>Prázdný objekt</div>
                    ) : (
                        entries.map(([childKey, childValue]) => (
                            <TreeNode
                                key={`${label}-${childKey}`}
                                label={childKey}
                                value={childValue}
                                level={0}
                            />
                        ))
                    )}
                </div>
            </div>
        )
    }

    return null
}

export const ProjectReadContent = () => {
    const { item } = useGQLEntityContext()

    const { scalarEntries, vectorEntries, objectEntries } = useMemo(() => {
        if (!item || typeof item !== "object") {
            return {
                scalarEntries: [],
                vectorEntries: [],
                objectEntries: [],
            }
        }

        const entries = Object.entries(item)

        return {
            scalarEntries: entries.filter(([, value]) => isScalar(value)),
            vectorEntries: entries.filter(([, value]) => isArray(value)),
            objectEntries: entries.filter(([, value]) => isObject(value)),
        }
    }, [item])

    if (!item) return <div>Project nebyl nalezen.</div>

    return (
        <LargeCard item={item}>
            <div
                style={{
                    padding: "1.5rem",
                    maxWidth: "1100px",
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

                <Section title={`TREE ${item.id ?? ""}`}>
                    <div style={{ marginBottom: "0.75rem" }}>
                        <a
                            href="#tree-root"
                            onClick={(e) => {
                                e.preventDefault()
                                const el = document.getElementById("tree-root")
                                if (el) el.scrollIntoView({ behavior: "smooth" })
                            }}
                        >
                            Open
                        </a>
                    </div>

                    <div id="tree-root">
                        <TreeNode label={item.__typename ?? "ProjectGQLModel"} value={item} />
                    </div>
                </Section>

                <Section title="SKALÁRNÍ ATRIBUTY">
                    {scalarEntries.length === 0 ? (
                        <div>Žádné skalární atributy.</div>
                    ) : (
                        scalarEntries.map(([key, value]) => (
                            <Row
                                key={key}
                                label={key}
                                value={safeScalarValue(key, value)}
                            />
                        ))
                    )}
                </Section>

                <Section title="VEKTOROVÉ ATRIBUTY">
                    {vectorEntries.length === 0 ? (
                        <div>Žádné vektorové atributy.</div>
                    ) : (
                        vectorEntries.map(([key, value]) => (
                            <div key={key} style={{ marginBottom: "1.25rem" }}>
                                <div
                                    style={{
                                        fontWeight: 700,
                                        fontSize: "1.1rem",
                                        marginBottom: "0.75rem",
                                    }}
                                >
                                    {key} [{value.length}]
                                </div>

                                {value.length === 0 ? (
                                    <div>Prázdné pole.</div>
                                ) : (
                                    value.map((arrayItem, index) => (
                                        <ArrayItemCard
                                            key={arrayItem?.id ?? `${key}-${index}`}
                                            item={arrayItem}
                                            index={index}
                                        />
                                    ))
                                )}
                            </div>
                        ))
                    )}
                </Section>

                {objectEntries.length > 0 && (
                    <Section title="OBJEKTOVÉ ATRIBUTY">
                        {objectEntries.map(([key, value]) => (
                            <div key={key} style={{ marginBottom: "1.25rem" }}>
                                <div
                                    style={{
                                        fontWeight: 700,
                                        fontSize: "1.1rem",
                                        marginBottom: "0.75rem",
                                    }}
                                >
                                    {key}
                                </div>

                                <div
                                    style={{
                                        padding: "0.9rem",
                                        border: "1px solid #e5e5e5",
                                        borderRadius: "8px",
                                        background: "white",
                                    }}
                                >
                                    {Object.entries(value)
                                        .filter(([, nestedValue]) => isScalar(nestedValue))
                                        .map(([nestedKey, nestedValue]) => (
                                            <Row
                                                key={nestedKey}
                                                label={nestedKey}
                                                value={safeScalarValue(nestedKey, nestedValue)}
                                            />
                                        ))}
                                </div>
                            </div>
                        ))}
                    </Section>
                )}
            </div>
        </LargeCard>
    )
}