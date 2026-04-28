import { MediumContent as BaseMediumContent } from "../../../../_template/src/Base/Components/MediumContent"

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
    return (
        <BaseMediumContent item={item}>
            {children}
        </BaseMediumContent>
    )
}