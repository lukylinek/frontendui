import { useSelector } from "react-redux";

// import { selectItemById } from "../Store/ItemSlice"; // uprav cestu

import { CardCapsule } from "../Components/CardCapsule"
import { MediumCard } from "../Components/MediumCard"
import { Col } from "../../../../_template/src/Base/Components/Col"
import { Row } from "../../../../_template/src/Base/Components/Row"
import { selectItemById } from "../../../../dynamic/src/Store";
import { useMemo } from "react";

export const ScalarAttributeCapsule = ({ attribute_name, item, children }) => {
    return (
        <Row>
            <Col className="col-2"><b>{attribute_name}</b></Col>
            <Col className="col-10">
                {children}
            </Col>
        </Row>
    )
}

export const ScalarAttributeBase = ({ attribute_name, item }) => {
    return (
        <ScalarAttributeCapsule attribute_name={attribute_name} item={item}>
            <MediumCard item={item} />
        </ScalarAttributeCapsule>
    )
}

export const ScalarAttributeBind = ({ attribute_name, item }) => {
    const id = item?.[attribute_name]?.id
    const storedItem = useSelector((rootState) => {
        const result = id != null ? selectItemById(rootState, id) : null
        return result
    })
    return (
        <ScalarAttributeBase attribute_name={attribute_name} item={storedItem} />
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
        [item]
    )

    return (
        <CardCapsule item={sureitem}>
            {Object.entries(scalars).map(([attribute_name, value]) => (
                <ScalarAttributeCapsule
                    key={attribute_name}
                    attribute_name={attribute_name}
                    item={item}
                >
                    <span>{String(value)}</span>
                </ScalarAttributeCapsule>
            ))}
        </CardCapsule>
    )
}