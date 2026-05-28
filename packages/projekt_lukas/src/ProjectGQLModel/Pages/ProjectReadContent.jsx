import { useGQLEntityContext } from "../../../../_template/src/Base/Helpers/GQLEntityProvider"

import { SidebarCard } from "./ProjectRead/SidebarCard"
import { ProjectOverview } from "./ProjectRead/ProjectOverview"
import { FinanceSummary } from "./ProjectRead/FinanceSummary"
import { GanttTimeline } from "./ProjectRead/GanttTimeline"
import { Subprojects } from "./ProjectRead/Subprojects"

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
        <div className="container-fluid py-3">
            <div className="mb-3">
                <h3 className="fw-bold text-primary mb-1">
                    {item.name ?? "Bez názvu"}
                </h3>

                <div className="text-muted">
                    {item.nameEn || "Anglický název není vyplněn"}
                </div>
            </div>

            <div className="row g-4">
                <div className="col-12 col-xl-4">
                    <SidebarCard item={item} />
                </div>

                <div className="col-12 col-xl-8">
                    <ProjectOverview item={item} />

                    <FinanceSummary finance={item.finance} />

                    <GanttTimeline item={item} />

                    <Subprojects subprojects={item.subprojects} />
                </div>
            </div>
        </div>
    )
}