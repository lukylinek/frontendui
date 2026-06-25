import { SimpleCardCapsule } from "../../../../../_template/src/Base/Components/CardCapsule"
import { ProxyLink } from "../../../../../_template/src/Base/Components/ProxyLink"
import { DetailRow } from "./DetailRow"
import { formatMoney } from "./helpers"

export const FinanceSummary = ({ finance }) => {
    if (!finance) {
        return (
            <SimpleCardCapsule title="Finance projektu">
                <div className="text-muted small">Projekt nemá přiřazené finance.</div>
            </SimpleCardCapsule>
        )
    }

    const financeURI = `/finance/FinanceGQLModel/view/${finance.id}`
    const amount = finance.value ?? finance.amount ?? finance.total

    return (
        <SimpleCardCapsule title="Finance projektu">
            <DetailRow
                label="Název"
                value={
                    <ProxyLink to={financeURI} className="text-decoration-none">
                        {finance.name ?? "-"}
                    </ProxyLink>
                }
            />
            {finance.nameEn && (
                <DetailRow label="EN název" value={finance.nameEn} />
            )}
            <DetailRow label="Hodnota" value={formatMoney(amount)} />
            {finance.description && (
                <DetailRow label="Popis" value={finance.description} />
            )}
        </SimpleCardCapsule>
    )
}
