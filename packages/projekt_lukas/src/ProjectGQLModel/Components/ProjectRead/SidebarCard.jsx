import { SimpleCardCapsule } from "../../../../../_template/src/Base/Components/CardCapsule"
import { formatDate } from "./helpers"
import { DetailRow } from "./DetailRow"

export const SidebarCard = ({ item }) => {
    return (
        <SimpleCardCapsule title="Detail">
            <DetailRow label="Název" value={item.name} />
            <DetailRow label="EN název" value={item.nameEn ?? "-"} />
            <DetailRow label="Začátek" value={formatDate(item.startdate)} />
            <DetailRow label="Konec" value={formatDate(item.enddate)} />
            <DetailRow label="Typ projektu" value={item.type?.name ?? "-"} />
            <DetailRow label="Finance" value={item.finance?.name ?? "-"} />
            <DetailRow label="Projekt" value={item.masterproject?.name ?? "-"} />
            <DetailRow label="Vytvořil" value={item.createdby?.fullname ?? "-"} />
            <DetailRow label="Vytvořeno" value={formatDate(item.created)} />
            {item.description && (
                <div className="mt-2 pt-2 border-top small text-muted">
                    {item.description}
                </div>
            )}
        </SimpleCardCapsule>
    )
}
