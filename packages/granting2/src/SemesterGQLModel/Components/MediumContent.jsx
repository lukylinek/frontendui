import { Link } from "./Link"
import { MediumContent as MediumContent_ } from "../../../../_template/src/Base/Components/MediumContent"
import { Attribute, formatDateTime } from "../../../../_template/src/Base/Components"
import { Link as BaseLink } from "../../../../_template/src/Base/Components"


/**
 * A component that displays medium-level content for an template entity.
 *
 * This component renders a label "TemplateMediumContent" followed by a serialized representation of the `template` object
 * and any additional child content. It is designed to handle and display information about an template entity object.
 *
 * @component
 * @param {Object} props - The properties for the TemplateMediumContent component.
 * @param {Object} props.template - The object representing the template entity.
 * @param {string|number} props.template.id - The unique identifier for the template entity.
 * @param {string} props.template.name - The name or label of the template entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render after the serialized `template` object.
 *
 * @returns {JSX.Element} A JSX element displaying the entity's details and optional content.
 *
 * @example
 * // Example usage:
 * const templateEntity = { id: 123, name: "Sample Entity" };
 * 
 * <TemplateMediumContent template={templateEntity}>
 *   <p>Additional information about the entity.</p>
 * </TemplateMediumContent>
 */

export const MediumContent = ({ item, children }) => {

    return (
        <>
            <Attribute label="Id">
                <Link item={item} />
            </Attribute>
            <Attribute label="Order">
                <Link item={item}>
                    {item?.order || item?.id || "Data error"}
                </Link>
            </Attribute>
            <Attribute label="Předmět">
                <BaseLink item={item?.subject} />
            </Attribute>
            <hr/>
            <Attribute label="Vytvořeno" item={item}>
                <BaseLink item={item?.createdby} />{" @ "}
                {formatDateTime(item?.created)}
            </Attribute>
            <Attribute label="Změněno" item={item}>
                <BaseLink item={item?.changedby} />{" @ "}
                {formatDateTime(item?.lastchange)}
            </Attribute>
            <hr/>
            <pre>
                {JSON.stringify(item, null, 2)}
            </pre>
            {/* <hr/>
            {item?.id}{" "}
            {item?.order}
            <hr/>
            <pre>
                {JSON.stringify(item, null, 2)}
            </pre> */}
            {/* <MediumContent_ item={item}>
                Byl jsem zde Fantomas.
                {children}
            </MediumContent_> */}
        </>)
}