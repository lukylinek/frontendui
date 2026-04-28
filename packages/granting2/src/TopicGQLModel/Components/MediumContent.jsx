import { Attribute, Link as BaseLink, formatDateTime} from "../../../../_template/src/Base"
import { MediumContent as BaseMediumContent } from "../../../../_template/src/Base/Components/MediumContent"
import { Link as ThisLink } from "./Link"

/**
 * A component that displays medium-level content for an template entity.
 *
 * This component renders a label "MediumContent" followed by a serialized representation of the `template` object
 * and any additional child content. It is designed to handle and display information about an template entity object.
 *
 * @component
 * @param {Object} props - The properties for the MediumContent component.
 * @param {Object} props.item - The object representing the template entity.
 * @param {string|number} props.item.id - The unique identifier for the template entity.
 * @param {string} props.item.name - The name or label of the template entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render after the serialized `template` object.
 *
 * @returns {JSX.Element} A JSX element displaying the entity's details and optional content.
 *
 * @example
 * // Example usage:
 * const item = { id: 123, name: "Sample Entity" };
 * 
 * <MediumContent item={item}>
 *   <p>Additional information about the entity.</p>
 * </MediumContent>
 */
export const MediumContent = ({ item, children}) => {
    return (<>
        <Attribute label="Id" item={item} attribute_name={"name"}>
            <ThisLink item={item}>{item?.id}</ThisLink>
        </Attribute>
        <Attribute label="Název" item={item} attribute_name={"name"}>
            <ThisLink item={item} />
        </Attribute>
        <Attribute label="Název anglicky" item={item} attribute_name={item?.nameEn}/>
        <Attribute label="Semestr" item={item} attribute_name={"name"}>
            <BaseLink item={item?.semester}>
                {item?.semester?.order}
            </BaseLink> 
        </Attribute>
        <Attribute label="Předmět" item={item} >
            <BaseLink item={item?.semester?.subject} />
        </Attribute>
        <Attribute label="Pořadí" item={item} attribute_name={item?.order}/>
        <Attribute label="Popis" item={item} attribute_name={item?.description}/>
        <hr/>
        <Attribute label="Vytvořeno" item={item}>
            <BaseLink item={item?.createdby} />{" @ "}
            {formatDateTime(item?.created)}
        </Attribute>
        <Attribute label="Změněno" item={item}>
            <BaseLink item={item?.changedby} />{" @ "}
            {formatDateTime(item?.lastchange)}
        </Attribute>
{/* 
        <BaseMediumContent item={item}>
            {children}
        </BaseMediumContent> */}
        </>
    )
}