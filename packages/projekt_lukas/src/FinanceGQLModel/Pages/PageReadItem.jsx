import { useParams } from "react-router"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ReadAsyncAction } from "../Queries/ReadAsyncAction"
import { UpdateFinanceButton, UpdateFinanceBody } from "../Mutations/Update"
import { FinanceDetail } from "../Components/FinanceDetail"

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
