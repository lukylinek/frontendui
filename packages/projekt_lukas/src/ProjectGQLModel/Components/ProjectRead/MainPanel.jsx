import { useState } from "react"
import { CardCapsule } from "../../../../../_template/src/Base/Components/CardCapsule"
import { Table, CellName } from "../../../../../_template/src/Base/Components/Table"
import { Link } from "../../../../../_template/src/Base/Components"
import { GanttTimeline } from "./GanttTimeline"

const formatDate = (raw) => {
    if (!raw) return null
    const d = new Date(raw)
    return isNaN(d) ? raw : d.toLocaleDateString("cs-CZ")
}

const tableDef = {
    name: { label: "Název", component: CellName },
    nameEn: { label: "EN název", component: ({ row }) => <td>{row.nameEn ?? "-"}</td> },
    startdate: { label: "Začátek", component: ({ row }) => <td>{formatDate(row.startdate) ?? "-"}</td> },
    enddate: { label: "Konec", component: ({ row }) => <td>{formatDate(row.enddate) ?? "-"}</td> },
    done: { label: "Stav", component: ({ row }) => <td>{row.done ? "Dokončeno" : "Nedokončeno"}</td> },
}

export const MainPanel = ({ item }) => {
    const [tab, setTab] = useState("table")
    const subprojects = item?.subprojects ?? []

    return (
        <div>
            <div className="d-flex gap-2 mb-3">
                <button type="button" className={`btn btn-sm ${tab === "table" ? "btn-primary" : "btn-outline-secondary"}`} onClick={() => setTab("table")}>Tabulka podprojektů</button>
                <button type="button" className={`btn btn-sm ${tab === "gantt" ? "btn-primary" : "btn-outline-secondary"}`} onClick={() => setTab("gantt")}>Gantt diagram</button>
            </div>
            {tab === "table" && (
                <CardCapsule item={item} header={<Link item={item} action="subprojects">{`subprojects [${subprojects.length}]`}</Link>}>
                    <Table data={subprojects} table_def={tableDef} />
                </CardCapsule>
            )}
            {tab === "gantt" && <GanttTimeline item={item} />}
        </div>
    )
}
