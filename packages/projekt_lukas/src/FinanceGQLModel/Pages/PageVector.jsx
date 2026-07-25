import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { SimpleCardCapsule } from "../../../../_template/src/Base/Components/CardCapsule"
import { ReadPageAsyncAction } from "../Queries/ReadPageAsyncAction"
import { Link } from "../Components/Link"
import { CreateFinanceButton } from "../Mutations/Create"

export const PageVector = () => {
    const dispatch = useDispatch()
    const [items, setItems] = useState([])

    useEffect(() => {
        dispatch(ReadPageAsyncAction({ skip: 0, limit: 50 })).then(result => {
            const data = result?.data?.financePage ?? []
            setItems(data)
        })
    }, [])

    return (
        <div className="container mt-3">
            <SimpleCardCapsule title="Finance">
                <div className="mb-3">
                    <CreateFinanceButton className="btn btn-success">
                        + Přidat finance
                    </CreateFinanceButton>
                </div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Název</th>
                            <th>EN název</th>
                            <th>Hodnota</th>
                            <th>Projekt</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
                            <tr key={item.id}>
                                <td><Link item={item} /></td>
                                <td>{item.nameEn ?? "-"}</td>
                                <td>{item.value != null ? `${item.value} Kč` : "-"}</td>
                                <td>{item.project?.name ?? "-"}</td>
                            </tr>
                        ))}
                        {items.length === 0 && (
                            <tr><td colSpan={4} className="text-muted text-center">Žádné záznamy</td></tr>
                        )}
                    </tbody>
                </table>
            </SimpleCardCapsule>
        </div>
    )
}
