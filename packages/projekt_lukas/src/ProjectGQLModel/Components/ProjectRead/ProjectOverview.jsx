import { SimpleCardCapsule } from "../../../../../_template/src/Base/Components/CardCapsule"
import { StatusBadge } from "./StatusBadge"
import { DetailRow } from "./DetailRow"
import { parseDate, formatDate } from "./helpers"

const getTimelineStatus = (item) => {
    if (item.done === true) {
        return { label: "Dokončeno", className: "text-bg-success" }
    }
    const start = parseDate(item.startdate)
    const end = parseDate(item.enddate)
    const today = new Date()
    if (!start || !end) return { label: "Bez termínu", className: "text-bg-secondary" }
    if (today < start) return { label: "Ještě nezačal", className: "text-bg-info" }
    if (today > end) return { label: "Po termínu", className: "text-bg-danger" }
    return { label: "Probíhá", className: "text-bg-primary" }
}

const getProgress = (item) => {
    const subprojects = item.subprojects ?? []
    if (!subprojects.length) {
        return { percentage: item.done === true ? 100 : 0, completed: item.done === true ? 1 : 0, total: 1 }
    }
    const completed = subprojects.filter((p) => p.done === true).length
    const total = subprojects.length
    return { percentage: Math.round((completed / total) * 100), completed, total }
}

export const ProjectOverview = ({ item }) => {
    if (!item) return null
    const timelineStatus = getTimelineStatus(item)
    const progress = getProgress(item)

    return (
        <SimpleCardCapsule title="Přehled projektu">
            <DetailRow
                label="Stav"
                value={<StatusBadge done={item.done} />}
            />
            <DetailRow
                label="Časový stav"
                value={<span className={`badge ${timelineStatus.className}`}>{timelineStatus.label}</span>}
            />
            <DetailRow label="Začátek" value={formatDate(item.startdate)} />
            <DetailRow label="Konec" value={formatDate(item.enddate)} />
            <DetailRow label="Podprojekty" value={String(item.subprojects?.length ?? 0)} />

            <div className="mt-3">
                <div className="d-flex justify-content-between small mb-1">
                    <span>Průběh ({progress.completed}/{progress.total})</span>
                    <span className="fw-semibold">{progress.percentage}%</span>
                </div>
                <div className="progress" style={{ height: "8px" }}>
                    <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: `${progress.percentage}%` }}
                        aria-valuenow={progress.percentage}
                        aria-valuemin="0"
                        aria-valuemax="100"
                    />
                </div>
            </div>
        </SimpleCardCapsule>
    )
}
