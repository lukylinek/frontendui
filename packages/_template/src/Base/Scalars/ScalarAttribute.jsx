import { CardCapsule } from "../Components/CardCapsule"
import { MediumCard } from "../Components/MediumCard"
import { useMemo } from "react"
import { Col } from "../Components/Col"
import { Row } from "../Components/Row"
import { Link } from "../Components"

export const ScalarAttributeFactory = (deafult_attribute_name) => ({ item, attribute_name: attribute_name=deafult_attribute_name }) => {
    const attribute_value = item?.[attribute_name] || {}
    return (
        <Row key={deafult_attribute_name}>
            <Col className="col-2"><b>{attribute_name}</b></Col>
            <Col className="col-10">
                <MediumCard item={attribute_value} />
            </Col>
        </Row>
    )
}

export const ScalarAttribute = ({ attribute_name, item }) => {
    const attribute_value = item?.[attribute_name] || {}
    return (<>
        
        <MediumCard item={attribute_value} header={<>
            <Link item={item}><b>{attribute_name}</b></Link>/ 
            <Link item={attribute_value} />
            </>}/>
    </>
        // <CardCapsule title={<Link item={item}>{attribute_name}</Link>}>
        //     <MediumCard item={attribute_value} />
        // </CardCapsule>
    )
}

export const MediumCardScalars = ({ item }) => {
    const sureitem = item || {}

    const scalars = useMemo(
        () =>
            Object.fromEntries(
                Object.entries(sureitem).filter(([_, v]) => {
                    return (
                        v != null &&
                        (
                            typeof v === "string" ||
                            typeof v === "number" ||
                            typeof v === "boolean"
                        )
                    )
                })
            ),
        [sureitem]
    )

    return (
        <CardCapsule item={sureitem}>
            {Object.entries(scalars).map(([attribute_name, value]) => (
                <Row key={attribute_name}>
                    <Col className="col-2">
                        <b>{attribute_name}</b>
                    </Col>
                    <Col className="col-10">
                        <span>{String(value)}</span>
                    </Col>
                </Row>
            ))}
        </CardCapsule>
    )
}