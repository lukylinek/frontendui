import { Link as RouterLink } from "react-router-dom"

import { useGQLEntityContext } from "../../../../_template/src/Base/Helpers/GQLEntityProvider"
import { LargeCard, ReadItemURI } from "../Components"

const formatDate = (value) => {
    if (!value) return "-"

    try {
        return new Date(value).toLocaleDateString("cs-CZ")
    } catch {
        return String(value)
    }
}

const makeProjectDetailURI = (id) => {
    if (!id) return "#"
    return ReadItemURI.replace(":id", id)
}

const DetailLine = ({ label, value }) => (
    <div className="d-flex justify-content-between gap-3 border-bottom py-2">
        <strong className="text-muted">{label}</strong>
        <span className="text-end text-break">{value ?? "-"}</span>
    </div>
)

const ProjectHeader = ({ item }) => (
    <div
        className="p-4 mb-3 rounded shadow-sm"
        style={{
            background: "linear-gradient(135deg, #e8f1ff 0%, #ffffff 100%)",
            border: "1px solid #cfe2ff",
        }}
    >
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
            <div>
                <div className="text-primary fw-bold mb-1">
                    ProjectGQLModel
                </div>

                <h2 className="mb-1 text-primary">
                    {item?.name ?? "Bez názvu"}
                </h2>

                <div className="text-muted">
                    {item?.nameEn || "Anglický název není vyplněn"}
                </div>
            </div>

            <span className="badge text-bg-primary fs-6">
                {item?.done === true
                    ? "Dokončeno"
                    : item?.done === false
                        ? "Nedokončeno"
                        : ""}
            </span>
        </div>
    </div>
)

const Subprojects = ({ subprojects = [] }) => {
    if (!subprojects.length) {
        return (
            <div className="alert alert-light border mb-0">
                Projekt nemá žádné podprojekty.
            </div>
        )
    }

    return (
        <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
                <thead>
                    <tr>
                        <th>Název</th>
                        <th>Anglický název</th>
                        <th>Začátek</th>
                        <th>Konec</th>
                        <th>Stav</th>
                    </tr>
                </thead>

                <tbody>
                    {subprojects.map((project) => (
                        <tr key={project.id}>
                            <td className="fw-semibold">
                                <RouterLink
                                    to={makeProjectDetailURI(project.id)}
                                    className="text-primary text-decoration-none"
                                >
                                    {project.name ?? "-"}
                                </RouterLink>
                            </td>

                            <td>{project.nameEn ?? "-"}</td>
                            <td>{formatDate(project.startdate)}</td>
                            <td>{formatDate(project.enddate)}</td>

                            <td>
                                {project.done === true ? (
                                    <span className="badge text-bg-success">
                                        Dokončeno
                                    </span>
                                ) : project.done === false ? (
                                    <span className="badge text-bg-warning">
                                        Nedokončeno
                                    </span>
                                ) : (
                                    <span className="badge text-bg-secondary">
                                        
                                    </span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export const ProjectReadContent = () => {
    const { item } = useGQLEntityContext()

    if (!item) {
        return (
            <div className="alert alert-warning">
                Projekt nebyl nalezen.
            </div>
        )
    }

    return (
        <LargeCard item={item}>
            <ProjectHeader item={item} />

            <div className="row g-3">
                <div className="col-12 col-lg-6">
                    <div className="card shadow-sm h-100">
                        <div className="card-header fw-bold">
                            Informace o projektu
                        </div>

                        <div className="card-body">
                            <DetailLine label="ID" value={item.id} />
                            <DetailLine label="Název" value={item.name} />
                            <DetailLine label="Anglický název" value={item.nameEn} />
                            <DetailLine label="Začátek" value={formatDate(item.startdate)} />
                            <DetailLine label="Konec" value={formatDate(item.enddate)} />
                            <DetailLine label="Typ projektu" value={item.type?.name ?? item.projectTypeId} />
                            <DetailLine label="Finance" value={item.finance?.name ?? item.financeId} />
                            <DetailLine label="Master project" value={item.masterproject?.name ?? item.masterprojectId} />
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-6">
                    <div className="card shadow-sm h-100">
                        <div className="card-header fw-bold">
                            Technické údaje
                        </div>

                        <div className="card-body">
                            <DetailLine label="Created" value={formatDate(item.created)} />
                            <DetailLine label="Lastchange" value={item.lastchange} />
                            <DetailLine label="Created by" value={item.createdby?.fullname ?? item.createdbyId} />
                            <DetailLine label="Changed by" value={item.changedby?.fullname ?? item.changedbyId} />
                            <DetailLine label="RBAC object" value={item.rbacobjectId} />
                            <DetailLine label="Project type ID" value={item.projectTypeId} />
                        </div>
                    </div>
                </div>

                <div className="col-12">
                    <div className="card shadow-sm">
                        <div className="card-header fw-bold d-flex justify-content-between align-items-center">
                            <span>Podprojekty</span>

                            <span className="badge text-bg-primary">
                                {item.subprojects?.length ?? 0}
                            </span>
                        </div>

                        <div className="card-body">
                            <Subprojects subprojects={item.subprojects} />
                        </div>
                    </div>
                </div>

                {item.description && (
                    <div className="col-12">
                        <div className="card shadow-sm">
                            <div className="card-header fw-bold">
                                Popis
                            </div>

                            <div className="card-body">
                                {item.description}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </LargeCard>
    )
}