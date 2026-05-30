import { parseDate, formatDate, daysBetween } from "./helpers"

export const GanttTimeline = ({ item }) => {
    const projects = [
        {
            id: item.id,
            name: item.name ?? "Hlavní projekt",
            startdate: item.startdate,
            enddate: item.enddate,
            done: item.done,
            isMain: true,
        },
        ...(item.subprojects ?? []),
    ]

    const validProjects = projects
        .map((project) => ({
            ...project,
            start: parseDate(project.startdate),
            end: parseDate(project.enddate),
        }))
        .filter((project) => project.start && project.end)

    if (!validProjects.length) {
        return (
            <div className="card shadow-sm mb-4">
                <div className="card-header fw-bold d-flex justify-content-between align-items-center">
                    <span>GANTT DIAGRAM</span>

                    <span className="badge text-bg-secondary">
                        Bez dat
                    </span>
                </div>

                <div className="card-body">
                    <div className="alert alert-light border mb-0">
                        Pro Gantt diagram nejsou dostupná data začátku a konce projektu.
                    </div>
                </div>
            </div>
        )
    }

    const minDate = new Date(
        Math.min(...validProjects.map((project) => project.start.getTime()))
    )

    const maxDate = new Date(
        Math.max(...validProjects.map((project) => project.end.getTime()))
    )

    const totalDays = daysBetween(minDate, maxDate)

    const today = new Date()
    const isTodayVisible = today >= minDate && today <= maxDate

    const todayOffset = isTodayVisible
        ? Math.max(0, (daysBetween(minDate, today) - 1) / totalDays) * 100
        : null

    return (
        <div className="card shadow-sm mb-4">
            <div className="card-header fw-bold d-flex justify-content-between align-items-center">
                <span>GANTT DIAGRAM</span>

                <span className="badge text-bg-primary">
                    {validProjects.length}
                </span>
            </div>

            <div className="card-body">
                <div className="d-flex justify-content-between text-muted small mb-3">
                    <span>{formatDate(minDate)}</span>
                    <span>{formatDate(maxDate)}</span>
                </div>

                {isTodayVisible && (
                    <div className="d-flex align-items-center gap-2 text-muted small mb-3">
                        <span
                            style={{
                                display: "inline-block",
                                width: "12px",
                                height: "12px",
                                backgroundColor: "#dc3545",
                                borderRadius: "2px",
                            }}
                        />
                        <span>Dnes: {formatDate(today)}</span>
                    </div>
                )}

                <div className="d-flex flex-column gap-3">
                    {validProjects.map((project) => {
                        const offset = daysBetween(minDate, project.start) - 1
                        const duration = daysBetween(project.start, project.end)

                        const left = Math.max(0, (offset / totalDays) * 100)
                        const width = Math.max(6, (duration / totalDays) * 100)

                        return (
                            <div key={project.id} className="row align-items-center g-2">
                                <div className="col-12 col-md-3">
                                    <div className={project.isMain ? "fw-bold text-primary" : "fw-semibold"}>
                                        {project.name ?? "-"}
                                    </div>

                                    <div className="text-muted small">
                                        {formatDate(project.start)} – {formatDate(project.end)}
                                    </div>
                                </div>

                                <div className="col-12 col-md-9">
                                    <div
                                        className="position-relative rounded"
                                        style={{
                                            height: "34px",
                                            backgroundColor: "#f1f3f5",
                                            overflow: "hidden",
                                        }}
                                    >
                                        {isTodayVisible && (
                                            <div
                                                className="position-absolute top-0 h-100"
                                                title="Dnes"
                                                style={{
                                                    left: `${todayOffset}%`,
                                                    width: "3px",
                                                    backgroundColor: "#dc3545",
                                                    zIndex: 3,
                                                }}
                                            />
                                        )}

                                        <div
                                            className={`position-absolute top-0 h-100 rounded d-flex align-items-center px-2 text-white small fw-semibold ${
                                                project.isMain ? "bg-primary" : "bg-success"
                                            }`}
                                            style={{
                                                left: `${left}%`,
                                                width: `${width}%`,
                                                minWidth: "75px",
                                                zIndex: 2,
                                            }}
                                        >
                                            {project.done === true ? "Hotovo" : "Probíhá"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}