import { Link as RouterLink } from "react-router-dom"

import { ReadItemURI } from "../../Components"
import { formatDate } from "./helpers"

const makeProjectDetailURI = (id) => {
    if (!id) return "#"
    return ReadItemURI.replace(":id", id)
}

export const Subprojects = ({ subprojects = [] }) => {
    if (!subprojects.length) {
        return (
            <div className="card shadow-sm">
                <div className="card-header fw-bold d-flex justify-content-between align-items-center">
                    <span>PODPROJEKTY</span>

                    <span className="badge text-bg-secondary">
                        0
                    </span>
                </div>

                <div className="card-body">
                    <div className="alert alert-light border mb-0">
                        Projekt nemá žádné podprojekty.
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="card shadow-sm">
            <div className="card-header fw-bold d-flex justify-content-between align-items-center">
                <span>PODPROJEKTY</span>

                <span className="badge text-bg-primary">
                    {subprojects.length}
                </span>
            </div>

            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead>
                            <tr>
                                <th>Název</th>
                                <th>EN název</th>
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
                                            className="text-decoration-none"
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
                                                Bez stavu
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}