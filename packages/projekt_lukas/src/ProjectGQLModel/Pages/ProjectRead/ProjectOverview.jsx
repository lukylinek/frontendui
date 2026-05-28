import { parseDate, formatDate } from "./helpers"
import { StatusBadge } from "./StatusBadge"

const getTimelineStatus = (item) => {
    if (item.done === true) {
        return {
            label: "Dokončeno",
            className: "text-bg-success",
            description: "Projekt je označený jako dokončený.",
        }
    }

    const start = parseDate(item.startdate)
    const end = parseDate(item.enddate)
    const today = new Date()

    if (!start || !end) {
        return {
            label: "Bez termínu",
            className: "text-bg-secondary",
            description: "Projekt nemá vyplněné datum začátku nebo konce.",
        }
    }

    if (today < start) {
        return {
            label: "Ještě nezačal",
            className: "text-bg-info",
            description: "Projekt má začít až v budoucnu.",
        }
    }

    if (today > end) {
        return {
            label: "Po termínu",
            className: "text-bg-danger",
            description: "Projekt překročil plánované datum dokončení.",
        }
    }

    return {
        label: "Probíhá",
        className: "text-bg-primary",
        description: "Projekt právě probíhá podle časového rámce.",
    }
}

const getProjectProgress = (item) => {
    const subprojects = item.subprojects ?? []

    if (!subprojects.length) {
        return {
            completed: item.done === true ? 1 : 0,
            total: 1,
            percentage: item.done === true ? 100 : 0,
        }
    }

    const completed = subprojects.filter((project) => project.done === true).length
    const total = subprojects.length
    const percentage = Math.round((completed / total) * 100)

    return {
        completed,
        total,
        percentage,
    }
}

const ProjectProgress = ({ item }) => {
    const progress = getProjectProgress(item)

    return (
        <div>
            <div className="d-flex justify-content-between mb-2">
                <span className="fw-bold">Průběh projektu</span>
                <span className="fw-semibold">{progress.percentage}%</span>
            </div>

            <div className="progress" style={{ height: "22px" }}>
                <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: `${progress.percentage}%` }}
                    aria-valuenow={progress.percentage}
                    aria-valuemin="0"
                    aria-valuemax="100"
                >
                    {progress.percentage}%
                </div>
            </div>

            <div className="text-muted small mt-2">
                Dokončeno {progress.completed} z {progress.total} podprojektů.
            </div>
        </div>
    )
}

export const ProjectOverview = ({ item }) => {
    const timelineStatus = getTimelineStatus(item)

    return (
        <div className="card shadow-sm mb-4">
            <div className="card-header fw-bold">
                PŘEHLED PROJEKTU
            </div>

            <div className="card-body">
                <div className="row g-3">
                    <div className="col-md-6">
                        <div className="border rounded p-3 h-100">
                            <div className="fw-bold mb-2">Stav</div>
                            <StatusBadge done={item.done} />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="border rounded p-3 h-100">
                            <div className="fw-bold mb-2">Automatický stav</div>

                            <span className={`badge ${timelineStatus.className}`}>
                                {timelineStatus.label}
                            </span>

                            <div className="text-muted small mt-2">
                                {timelineStatus.description}
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="border rounded p-3 h-100">
                            <div className="fw-bold mb-2">Počet podprojektů</div>

                            <div className="fs-4 fw-semibold">
                                {item.subprojects?.length ?? 0}
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="border rounded p-3 h-100">
                            <div className="fw-bold mb-2">Časový rámec</div>

                            <div>
                                <strong>Od:</strong> {formatDate(item.startdate)}
                            </div>

                            <div>
                                <strong>Do:</strong> {formatDate(item.enddate)}
                            </div>
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="border rounded p-3">
                            <ProjectProgress item={item} />
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="border rounded p-3">
                            <div className="fw-bold mb-2">Popis</div>

                            <div>
                                {item.description || "Popis není vyplněn."}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}