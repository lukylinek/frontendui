import { ProjectOverview } from "./ProjectRead/ProjectOverview"
import { FinanceSummary } from "./ProjectRead/FinanceSummary"
import { GanttTimeline } from "./ProjectRead/GanttTimeline"
import { Subprojects } from "./ProjectRead/Subprojects"

export const ProjectReadContent = ({ item }) => {
    if (!item) return (
        <div className="alert alert-warning">Projekt nebyl nalezen.</div>
    )

    return (
        <div className="py-2">
            <ProjectOverview item={item} />
            <FinanceSummary finance={item.finance} />
            <GanttTimeline item={item} />
            <Subprojects subprojects={item.subprojects} />
        </div>
    )
}
