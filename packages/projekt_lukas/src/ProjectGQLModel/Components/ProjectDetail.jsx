import { SimpleCardCapsule } from "../../../../_template/src/Base/Components/CardCapsule"
import { Row } from "../../../../_template/src/Base/Components/Row"
import { Col } from "../../../../_template/src/Base/Components/Col"
import { Link } from "../../../../_template/src/Base/Components"

const Row2 = ({ label, val }) => (
    <Row>
        <Col className="col-4"><b>{label}</b></Col>
        <Col className="col-8">{val ?? "-"}</Col>
    </Row>
)

const fmtDate = (v) => {
    if (!v) return "-"
    return new Date(v).toLocaleDateString("cs-CZ")
}

export const ProjectDetail = ({ item }) => {
    if (!item) return null
    return (
        <SimpleCardCapsule title="Detail">
            <Row2 label="Název" val={item.name} />
            <Row2 label="EN název" val={item.nameEn} />
            <Row2 label="Popis" val={item.description} />
            <Row2 label="Začátek" val={fmtDate(item.startdate)} />
            <Row2 label="Konec" val={fmtDate(item.enddate)} />
            <Row2 label="Stav" val={item.done ? "Dokončeno" : item.done === false ? "Probíhá" : "-"} />
            <Row2 label="Typ projektu" val={item.type ? <Link item={item.type}>{item.type.name}</Link> : null} />
            <Row2 label="Finance" val={item.finance ? <Link item={item.finance}>{item.finance.name}</Link> : null} />
            <Row2 label="Nadřazený projekt" val={item.masterproject ? <Link item={item.masterproject}>{item.masterproject.name}</Link> : null} />
            <Row2 label="Vytvořil" val={item.createdby ? <Link item={item.createdby}>{item.createdby.fullname}</Link> : null} />
        </SimpleCardCapsule>
    )
}
