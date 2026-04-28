import { useGQLEntityContext } from "../../../../_template/src/Base/Helpers/GQLEntityProvider"
import { UpdateItemURI } from "../Components"

const formatDate = (value) => {
    if (!value) return "-"
    try {
        return new Date(value).toLocaleDateString("cs-CZ")
    } catch {
        return String(value)
    }
}

const getEditURI = (item) => {
    if (!item?.id) return "#"
    return UpdateItemURI.replace(":id", item.id)
}

const DetailRow = ({ label, value }) => (
    <div style={{ marginBottom: "0.85rem" }}>
        <div style={{ fontSize: "0.78rem", color: "#6c757d", fontWeight: 700, textTransform: "uppercase" }}>
            {label}
        </div>
        <div style={{ fontSize: "0.95rem", wordBreak: "break-word" }}>
            {value || "-"}
        </div>
    </div>
)

const Card = ({ title, children }) => (
    <div
        style={{
            border: "1px solid #d8dee4",
            borderRadius: "10px",
            background: "#fff",
            marginBottom: "1rem",
            boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        }}
    >
        {title && (
            <div
                style={{
                    padding: "0.85rem 1rem",
                    borderBottom: "1px solid #e9ecef",
                    fontWeight: 800,
                    color: "#495057",
                    textTransform: "uppercase",
                    fontSize: "0.9rem",
                }}
            >
                {title}
            </div>
        )}
        <div style={{ padding: "1rem" }}>
            {children}
        </div>
    </div>
)

export const ProjectReadContent = () => {
    const { item } = useGQLEntityContext()

    if (!item) {
        return (
            <div style={{ padding: "1.5rem" }}>
                Projekt nebyl nalezen.
            </div>
        )
    }

    const subprojects = item.subprojects ?? []

    return (
        <div style={{ padding: "1.25rem", background: "#f6f8fa", minHeight: "100vh" }}>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "340px 1fr",
                    gap: "1.25rem",
                    alignItems: "start",
                }}
            >
                <div>
                    <Card title="Detail">
                        <h2 style={{ marginTop: 0, marginBottom: "0.35rem", fontSize: "1.35rem" }}>
                            {item.name ?? "Bez názvu"}
                        </h2>

                        <div style={{ color: "#6c757d", marginBottom: "1.2rem" }}>
                            ProjectGQLModel
                        </div>

                        <DetailRow label="ID" value={item.id} />
                        <DetailRow label="Název" value={item.name} />
                        <DetailRow label="Anglický název" value={item.nameEn} />
                        <DetailRow label="Začátek" value={formatDate(item.startdate)} />
                        <DetailRow label="Konec" value={formatDate(item.enddate)} />
                        <DetailRow label="Typ projektu" value={item.type?.name ?? item.projectTypeId} />
                        <DetailRow label="Finance" value={item.finance?.name ?? item.financeId} />
                        <DetailRow label="Lastchange" value={item.lastchange} />
                    </Card>

                    <Card title="Nástroje">
                        <a
                            href={getEditURI(item)}
                            style={{
                                display: "block",
                                padding: "0.55rem 0.8rem",
                                border: "1px solid #0d6efd",
                                borderRadius: "6px",
                                color: "#0d6efd",
                                textDecoration: "none",
                                textAlign: "center",
                                fontWeight: 700,
                                marginBottom: "0.6rem",
                            }}
                        >
                            Upravit projekt
                        </a>

                        <a
                            href="/projekt/project/list"
                            style={{
                                display: "block",
                                padding: "0.55rem 0.8rem",
                                border: "1px solid #6c757d",
                                borderRadius: "6px",
                                color: "#495057",
                                textDecoration: "none",
                                textAlign: "center",
                                fontWeight: 700,
                            }}
                        >
                            Zpět na seznam
                        </a>
                    </Card>
                </div>

                <div>
                    <Card title="Informace o projektu">
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: "1rem",
                            }}
                        >
                            <DetailRow label="Název" value={item.name} />
                            <DetailRow label="Anglický název" value={item.nameEn} />
                            <DetailRow label="Start date" value={formatDate(item.startdate)} />
                            <DetailRow label="End date" value={formatDate(item.enddate)} />
                            <DetailRow label="Dokončeno" value={item.done === true ? "Ano" : item.done === false ? "Ne" : "-"} />
                            <DetailRow label="Master project" value={item.masterproject?.name ?? item.masterprojectId} />
                        </div>

                        {item.description && (
                            <div style={{ marginTop: "1rem" }}>
                                <DetailRow label="Popis" value={item.description} />
                            </div>
                        )}
                    </Card>

                    <Card title={`Podprojekty (${subprojects.length})`}>
                        {subprojects.length === 0 ? (
                            <div style={{ color: "#6c757d" }}>
                                Tento projekt nemá žádné podprojekty.
                            </div>
                        ) : (
                            <div style={{ overflowX: "auto" }}>
                                <table
                                    style={{
                                        width: "100%",
                                        borderCollapse: "collapse",
                                        fontSize: "0.95rem",
                                    }}
                                >
                                    <thead>
                                        <tr style={{ borderBottom: "2px solid #dee2e6" }}>
                                            <th style={{ textAlign: "left", padding: "0.65rem" }}>Název</th>
                                            <th style={{ textAlign: "left", padding: "0.65rem" }}>Anglický název</th>
                                            <th style={{ textAlign: "left", padding: "0.65rem" }}>Začátek</th>
                                            <th style={{ textAlign: "left", padding: "0.65rem" }}>Konec</th>
                                            <th style={{ textAlign: "left", padding: "0.65rem" }}>Dokončeno</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {subprojects.map((project) => (
                                            <tr
                                                key={project.id}
                                                style={{ borderBottom: "1px solid #e9ecef" }}
                                            >
                                                <td style={{ padding: "0.65rem" }}>
                                                    <a href={`/projekt/project/view/${project.id}`}>
                                                        {project.name ?? "-"}
                                                    </a>
                                                </td>
                                                <td style={{ padding: "0.65rem" }}>
                                                    {project.nameEn ?? "-"}
                                                </td>
                                                <td style={{ padding: "0.65rem" }}>
                                                    {formatDate(project.startdate)}
                                                </td>
                                                <td style={{ padding: "0.65rem" }}>
                                                    {formatDate(project.enddate)}
                                                </td>
                                                <td style={{ padding: "0.65rem" }}>
                                                    {project.done === true ? "Ano" : project.done === false ? "Ne" : "-"}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    )
}