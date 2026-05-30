import { Row } from "../../../../_template/src/Base/Components/Row"
import { Col } from "../../../../_template/src/Base/Components/Col"
import { Link } from "./Link"

const formatDate = (value) => {
    if (!value) return "-"
    try { return new Date(value).toLocaleDateString("cs-CZ") }
    catch { return String(value) }
}

const Field = ({ label, children }) => (
    <Row>
        <Col className="col-5"><b>{label}</b></Col>
        <Col className="col-7">{children}</Col>
    </Row>
)

export const MediumContent = ({ item, children }) => {
    if (!item) return null
    return (
        <>
            <Field label="Název"><Link item={item} /></Field>
            <Field label="EN název">{item.nameEn ?? "-"}</Field>
            <Field label="Začátek">{formatDate(item.startdate)}</Field>
            <Field label="Konec">{formatDate(item.enddate)}</Field>
            <Field label="Stav">{item.done === true ? "Hotovo" : "Probíhá"}</Field>
            <Field label="Typ">{item.type?.name ?? "-"}</Field>
            <Field label="Finance">{item.finance?.name ?? "-"}</Field>
            <Field label="Nadřazený">{item.masterproject?.name ?? "-"}</Field>
            <Field label="Vytvořil">{item.createdby?.fullname ?? "-"}</Field>
            {children}
        </>
    )
}
