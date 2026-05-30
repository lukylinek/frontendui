import { formatDate } from "./helpers"
import { DetailRow } from "./DetailRow"
import { InteractiveMutations } from "../../Mutations/InteractiveMutations"

export const SidebarCard = ({ item }) => {
    return (
        <div className="card shadow-sm h-100">
            <div className="card-body">
                <h5 className="fw-bold mb-3">DETAIL</h5>

                <DetailRow label="Název" value={item.name} />
                <DetailRow label="EN název" value={item.nameEn ?? "-"} />
                <DetailRow label="Začátek" value={formatDate(item.startdate)} />
                <DetailRow label="Konec" value={formatDate(item.enddate)} />
                <DetailRow label="Typ projektu" value={item.type?.name ?? "-"} />
                <DetailRow label="Finance" value={item.finance?.name ?? "-"} />
                <DetailRow label="Projekt" value={item.masterproject?.name ?? "-"} />
                <DetailRow label="Vytvořil" value={item.createdby?.fullname ?? "-"} />
                <DetailRow label="Vytvořeno" value={formatDate(item.created)} />

                <div className="mt-4">
                    <InteractiveMutations item={item} />
                </div>
            </div>
        </div>
    )
}