import { SimpleCardCapsule } from "../../../../_template/src/Base/Components/CardCapsule"

export const FinanceDetail = ({ item }) => {
    if (!item) return null
    return (
        <SimpleCardCapsule title={item.name ?? "Finance"}>
            <div><b>Název:</b> {item.name ?? "-"}</div>
            <div><b>EN název:</b> {item.nameEn ?? "-"}</div>
            <div><b>Hodnota:</b> {item.value != null ? `${item.value} Kč` : "-"}</div>
            <div><b>Popis:</b> {item.description ?? "-"}</div>
            <div><b>Projekt:</b> {item.project?.name ?? "-"}</div>
            <div><b>Nadřazená finance:</b> {item.masterfinance?.name ?? "-"}</div>
        </SimpleCardCapsule>
    )
}
