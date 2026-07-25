import { useParams } from "react-router"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { SimpleCardCapsule } from "../../../../_template/src/Base/Components/CardCapsule"
import { ReadAsyncAction } from "../Queries/ReadAsyncAction"
import { UpdateFinanceButton, UpdateFinanceBody } from "../Mutations/Update"
import { useState } from "react"

const FinanceDetail = ({ item }) => {
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

export const PageReadItem = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const [showEdit, setShowEdit] = useState(false)

    const item = useSelector(state => state.items[id])

    useEffect(() => {
        if (id) dispatch(ReadAsyncAction({ id }))
    }, [id])

    return (
        <div className="container mt-3">
            <FinanceDetail item={item} />
            <div className="d-flex gap-2 mt-3">
                <button className="btn btn-outline-success" onClick={() => setShowEdit(v => !v)}>
                    Upravit
                </button>
                <UpdateFinanceButton item={item} className="btn btn-outline-primary">
                    Upravit (dialog)
                </UpdateFinanceButton>
            </div>
            {showEdit && (
                <div className="mt-3">
                    <UpdateFinanceBody item={item} />
                </div>
            )}
        </div>
    )
}
