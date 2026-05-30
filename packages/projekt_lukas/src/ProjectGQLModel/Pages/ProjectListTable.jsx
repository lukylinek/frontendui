import { Link } from "../Components/Link"

const formatDate = (value) => {
    if (!value) return "-"
    try {
        return new Date(value).toLocaleDateString("cs-CZ")
    } catch {
        return String(value)
    }
}

const StatusBadge = ({ done }) => {
    if (done === true) return <span className="badge text-bg-success">Dokončeno</span>
    if (done === false) return <span className="badge text-bg-warning">Nedokončeno</span>
    return <span className="badge text-bg-secondary">Bez stavu</span>
}

export const ProjectListTable = ({ items = [] }) => {
    if (!items.length) {
        return (
            <div className="card shadow-sm">
                <div className="card-body">
                    <div className="alert alert-light border mb-0">
                        Nebyly nalezeny žádné projekty.
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="card shadow-sm">
            <div className="card-header fw-bold d-flex justify-content-between align-items-center">
                <span>SEZNAM PROJEKTŮ</span>
                <span className="badge text-bg-primary">{items.length}</span>
            </div>

            <div className="card-body p-0">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>Název</th>
                                <th>EN název</th>
                                <th>Začátek</th>
                                <th>Konec</th>
                                <th>Stav</th>
                                <th>Typ</th>
                                <th>Finance</th>
                                <th>Nadřazený projekt</th>
                            </tr>
                        </thead>

                        <tbody>
                            {items.map((item) => (
                                <tr key={item.id}>
                                    <td className="fw-semibold">
                                        <Link item={item} />
                                    </td>
                                    <td>{item.nameEn ?? "-"}</td>
                                    <td>{formatDate(item.startdate)}</td>
                                    <td>{formatDate(item.enddate)}</td>
                                    <td><StatusBadge done={item.done} /></td>
                                    <td>{item.type?.name ?? "-"}</td>
                                    <td>{item.finance?.name ?? "-"}</td>
                                    <td>{item.masterproject?.name ?? "-"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
