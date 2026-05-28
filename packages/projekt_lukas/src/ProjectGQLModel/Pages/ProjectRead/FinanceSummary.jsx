import { Link as RouterLink } from "react-router-dom"
import { formatMoney } from "./helpers"

const makeFinanceDetailURI = (id) => {
    if (!id) return "#"
    return `/finance/FinanceGQLModel/view/${id}`
}

export const FinanceSummary = ({ finance }) => {
    if (!finance) {
        return (
            <div className="card shadow-sm mb-4">
                <div className="card-header fw-bold d-flex justify-content-between align-items-center">
                    <span>FINANCE PROJEKTU</span>

                    <span className="badge text-bg-secondary">
                        Nepřiřazeno
                    </span>
                </div>

                <div className="card-body">
                    <div className="alert alert-light border mb-0">
                        Projekt nemá přiřazené finance.
                    </div>
                </div>
            </div>
        )
    }

    const financeName = finance.name ?? "-"
    const financeNameEn = finance.nameEn ?? finance.name_en ?? "-"
    const financeAmount = finance.amount ?? finance.value ?? finance.total ?? "-"
    const financeDescription = finance.description ?? "Popis financí není vyplněn."

    return (
        <div className="card shadow-sm mb-4">
            <div className="card-header fw-bold d-flex justify-content-between align-items-center">
                <span>FINANCE PROJEKTU</span>

                <span className="badge text-bg-primary">
                    Přiřazeno
                </span>
            </div>

            <div className="card-body">
                <div className="row g-3">
                    <div className="col-md-6">
                        <div className="border rounded p-3 h-100">
                            <div className="fw-bold mb-2">Název financí</div>

                            {finance.id ? (
                                <RouterLink
                                    to={makeFinanceDetailURI(finance.id)}
                                    className="text-decoration-none"
                                >
                                    {financeName}
                                </RouterLink>
                            ) : (
                                <div>{financeName}</div>
                            )}
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="border rounded p-3 h-100">
                            <div className="fw-bold mb-2">EN název</div>
                            <div>{financeNameEn}</div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="border rounded p-3 h-100">
                            <div className="fw-bold mb-2">Částka / hodnota</div>

                            <div className="fs-5 fw-semibold">
                                {formatMoney(financeAmount)}
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="border rounded p-3 h-100">
                            <div className="fw-bold mb-2">Stav financí</div>

                            <span className="badge text-bg-primary">
                                Přiřazeno
                            </span>
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="border rounded p-3">
                            <div className="fw-bold mb-2">Popis</div>
                            <div>{financeDescription}</div>
                        </div>
                    </div>

                    {finance.path && (
                        <div className="col-12">
                            <div className="border rounded p-3">
                                <div className="fw-bold mb-2">Umístění / cesta</div>

                                <div className="text-muted small text-break">
                                    {finance.path}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}