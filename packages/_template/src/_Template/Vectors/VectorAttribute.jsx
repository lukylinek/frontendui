import { CardCapsule } from "../Components/CardCapsule"
import { Table } from "../Components/Table"
import { Col } from "../../../../_template/src/Base/Components/Col"
import { Row } from "../../../../_template/src/Base/Components/Row"

export const VectorAttributeFactory = (attribute_name) => ({ item }) => {
    const attribute_value = item?.[attribute_name] || []
    return (
        <Row key={attribute_name}>
            <Col className="col-2"><b>{attribute_name}</b></Col>
            <Col className="col-10">
                <CardCapsule item={item}>
                    <Table data={attribute_value} />
                </CardCapsule>
            </Col>
        </Row>
    )
}

export const VectorAttribute_ = ({ attribute_name, item }) => {
    const attribute_value = item?.[attribute_name] || []
    return (
        <Row key={attribute_name}>
            <Col className="col-2"><b>{attribute_name}</b></Col>
            <Col className="col-10">
                <CardCapsule item={item}>
                    <Table data={attribute_value} />
                </CardCapsule>
            </Col>
        </Row>
    )
}

export const VectorAttribute = ({ attribute_name, item }) => {
    const attribute_value = item?.[attribute_name] || []
    return (
        <CardCapsule item={item} title={attribute_name+'[]'}>
            <Table data={attribute_value} />
        </CardCapsule>
    )
}


export const MediumCardVectors = ({ item }) => {
    const sureitem = item || {}

    return (
        <CardCapsule item={sureitem}>
            {Object.entries(sureitem).map(([attribute_name, attribute_value]) => {
                if (Array.isArray(attribute_value)) {
                    return (
                        <VectorAttribute
                            key={attribute_name}
                            attribute_name={attribute_name}
                            item={sureitem}
                        />
                    )
                } else {
                    return null
                }
            })}
        </CardCapsule>
    )
}