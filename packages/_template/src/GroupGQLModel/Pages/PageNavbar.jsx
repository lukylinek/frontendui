import Nav from 'react-bootstrap/Nav'
import { ProxyLink, MyNavbar, useHash } from '@hrbolek/uoisfrontend-shared';

import { LinkURI } from '../Components'
import { RolesURI } from './PageReadItemEx';
import { Link as GroupLink } from '../Components';
import { Link as UserLink } from '../../UserGQLModel/Components';
import { NavDropdown } from 'react-bootstrap';
import { VectorItemsURI as GroupVectorItemsURI } from '../Components/Link';
import { CreateURI as CreateRoleTypeURI } from '../../RoleTypeGQLModel/Components/Link';
import { CreateURI as CreateGroupTypeURI } from '../../GroupTypeGQLModel/Components/Link';
import { VectorItemsURI as UserVectorItemsURI } from '../../UserGQLModel/Components/Link';
import { VectorItemsURI as GroupTypeVectorItemsURI } from '../../GroupTypeGQLModel/Components/Link';
import { CreateGroupInserMembershipButton } from '../Mutations/AddMembership';
import { UpdateButton, UpdateLink } from '../Mutations/Update';
// import { AddRoleOnGroupButton } from '../../RoleGQLModel/Mutations/AddRoleonGroup';
import { Link } from '../../../../_template/src/Base/Components';
import { ReadItemUniverisityURI } from './PageVectorBase';

/**
 * Allow to use HashContainer for determination which component at page will be rendered.
 * That must be manually inserted at TemplatePageContent, usually this should be done 
 * as children of TemplateLargeCard.
 * <TemplateLargeCard>
 *     <HashContainer>
 *         <VectorA id="history"/>
 *         <VectorB id="roles"/>
 *         <VectorC id="graph"/>
 *     </HashContainer>
 * </TemplateLargeCard>
 * it is usefull to define globally active "areas" like science, administration, teaching, ...
 */
const TemplatePageSegments = [
    { segment: 'education', label: 'Výuka' },
    { segment: 'reaserach', label: 'Tvůrčí činnost' },
    { segment: 'administration', label: 'Organizační činnost' },
    { segment: 'development', label: 'Rozvoj' },
]

/**
 * A navigation button component that generates a URL based on the template's ID and a specific segment.
 * The button uses a `ProxyLink` to navigate while preserving hash and query parameters.
 *
 * ### Features:
 * - Dynamically constructs the URL with a hash fragment pointing to the specified segment.
 * - Displays a label for the navigation link.
 * - Integrates seamlessly with `ProxyLink` for enhanced navigation.
 *
 * @component
 * @param {Object} props - The properties for the TitleNavButton component.
 * @param {Object} props.template - The template object containing details about the template.
 * @param {string|number} props.template.id - The unique identifier for the template.
 * @param {string} props.segment - The segment to append as a hash fragment in the URL.
 * @param {string} props.label - The text to display as the label for the navigation button.
 *
 * @returns {JSX.Element} A styled navigation button linking to the constructed URL.
 *
 * @example
 * // Example 1: Basic usage with a template and segment
 * const template = { id: 123 };
 * const segment = "details";
 * const label = "View Details";
 *
 * <TitleNavButton template={template} segment={segment} label={label} />
 * // Resulting URL: `/ug/template/view/123#details`
 *
 * @example
 * // Example 2: Different segment and label
 * <TitleNavButton template={{ id: 456 }} segment="settings" label="Template Settings" />
 * // Resulting URL: `/ug/template/view/456#settings`
 */
const TitleNavButton = ({ item, segment, label, ...props }) => {
    // const urlbase = (segment) => `/templates/template/${segment}/${template?.id}`;
    const urlbase = (segment) => `${LinkURI}${item?.id}#${segment}`;
    return (
        <Nav.Link as={"span"} {...props}>
            {/* <ProxyLink to={urlbase(segment)}>{label}</ProxyLink> */}
        </Nav.Link>
    );
};

/**
 * Renders the navigation bar for an Template page.
 *
 * This component uses a custom hook, `useHash()`, to determine the current hash
 * and highlights the active segment. It displays a navigation bar (using MyNavbar)
 * with several segments (e.g. "history", "roles", "graph"), each rendered as a 
 * TitleNavButton. The segments are hardcoded in this component and only rendered 
 * if an `template` object is provided.
 *
 * @component
 * @param {Object} props - The component properties.
 * @param {Object} props.template - The template entity object that provides context for the page.
 * @param {string|number} props.template.id - The unique identifier for the template.
 * @param {Function} props.onSearchChange - Callback function to handle changes in the search input.
 *
 * @returns {JSX.Element} The rendered TemplatePageNavbar component.
 *
 * @example
 * // Example usage:
 * const template = { id: 123, ... };
 * <TemplatePageNavbar template={template} onSearchChange={handleSearchChange} />
 */
export const PageNavbar = ({ item, children, onSearchChange }) => {
    // const [currentHash, setHash] = useHash(); // Use the custom hook to manage hash
    const currentHash = "da"
    return (
        <div className='screen-only'>
            <MyNavbar onSearchChange={onSearchChange} >
                {/* {item && TemplatePageSegments.map(({ segment, label }) => (
                    <Nav.Item key={segment} >
                        <TitleNavButton
                            template={item}
                            segment={segment}
                            label={label}
                            className={segment === currentHash ? "active" : ""} aria-current={segment === currentHash ? "page" : undefined}
                        />
                    </Nav.Item>
                ))} */}
                {item && (<>
                    <NavDropdown title="Skupiny">
                        <NavDropdown.Item as={ProxyLink} to={GroupVectorItemsURI}>
                            Seznam všech skupin
                        </NavDropdown.Item>
                        {/* <span className="border-start mx-2" aria-hidden="true" /> */}
                        <NavDropdown.Item as={GroupLink} item={item} action="roles">
                            Role
                        </NavDropdown.Item>
                        {/* <span className="border-start mx-2" aria-hidden="true" /> */}
                        <NavDropdown.Item as={GroupLink} item={item} action="subgroups">
                            Podskupiny
                        </NavDropdown.Item>
                        <NavDropdown.Item as={GroupLink} item={item} action="memberships">
                            Členové
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item 
                            as={CreateGroupInserMembershipButton} 
                            item={item} 
                            // item={{
                            //     group: item,
                            //     groupId: item?.groupId
                            // }}
                            action="memberships"
                        >
                            Nové členství
                        </NavDropdown.Item>
                    </NavDropdown>

                    <NavDropdown title="Uživatelé">
                        <NavDropdown.Item as={UserLink} to={UserVectorItemsURI}>
                            Seznam všech uživatelů
                        </NavDropdown.Item>
                        {/* <span className="border-start mx-2" aria-hidden="true" /> */}
                        <NavDropdown.Item as={UserLink} item={item} action="roles">
                            Role
                        </NavDropdown.Item>
                        {/* <span className="border-start mx-2" aria-hidden="true" /> */}
                        <NavDropdown.Item as={UserLink} item={item} action="subgroups">
                            Podskupiny
                        </NavDropdown.Item>
                    </NavDropdown>


                    <NavDropdown title="Typy">
                        <NavDropdown.Item as={UserLink} to={GroupTypeVectorItemsURI}>
                            Seznam všech typů skupin
                        </NavDropdown.Item>
                        <NavDropdown.Item as={ProxyLink} to={CreateGroupTypeURI}>
                            Nový typ skupiny
                        </NavDropdown.Item>
                        <NavDropdown.Item as={"span"} disabled>
                            {/* <hr/> */}
                        </NavDropdown.Item>
                        {/* <span className="border-start mx-2" aria-hidden="true" /> */}
                        <NavDropdown.Item as={UserLink} item={item} action="roles">
                            Seznam všech typů rolí
                        </NavDropdown.Item>
                        {/* <span className="border-start mx-2" aria-hidden="true" /> */}
                        <NavDropdown.Item as={ProxyLink} to={CreateRoleTypeURI}>
                            Nový typ role
                        </NavDropdown.Item>
                    </NavDropdown>

                    <Nav.Item>
                        <Nav.Link as={ProxyLink} to={GroupVectorItemsURI}>
                            Seznam všech skupin
                            
                        </Nav.Link>
                    </Nav.Item>
                    {/* <span className="border-start mx-2" aria-hidden="true" /> */}
                    <Nav.Item>
                        <Nav.Link as={GroupLink} item={item} action="roles">
                            Role
                        </Nav.Link>
                    </Nav.Item>
                    {/* <span className="border-start mx-2" aria-hidden="true" /> */}
                    <Nav.Item>
                        <Nav.Link as={GroupLink} item={item} action="subgroups">
                            Podskupiny
                        </Nav.Link>
                    </Nav.Item>
                </>)}

                {children}
            </MyNavbar>
        </div>
    );
};

export const MyNavDropdown = ({ item }) => {
    const { __typename } = item || {}
    const hasProperType = __typename === "GroupGQLModel"
    return (
        <NavDropdown title="Skupiny">
            <NavDropdown.Item as={ProxyLink} to={GroupVectorItemsURI}>
                Seznam všech skupin
            </NavDropdown.Item>

            <NavDropdown.Item as={ProxyLink} to={ReadItemUniverisityURI.replace(":id", item?.id)} disabled={!hasProperType} item={item}>
                Univerzitní struktura
            </NavDropdown.Item>

            <NavDropdown.Divider />
            
            <NavDropdown.Item as={GroupLink} item={item} action="roles" disabled={!hasProperType}>
                Role {hasProperType&& <>({item?.name})</>}
            </NavDropdown.Item>
            <NavDropdown.Item as={GroupLink} item={item} action="subgroups" disabled={!hasProperType}>
                Podskupiny {hasProperType&& <>({item?.name})</>}
            </NavDropdown.Item>
            <NavDropdown.Item as={GroupLink} item={item} action="memberships" disabled={!hasProperType}>
                Členové {hasProperType&& <>({item?.name})</>}
            </NavDropdown.Item>
        
        
            <NavDropdown.Divider />
            
            <NavDropdown.Item 
                as={UpdateLink} 
                item={item}
                disabled={!hasProperType} 
            >
                Upravit {hasProperType&& <>({item?.name})</>}
            </NavDropdown.Item>
            <NavDropdown.Item 
                as={CreateGroupInserMembershipButton} 
                // item={item} 
                disabled={!hasProperType} 
                item={item}
            >
                Nové členství {hasProperType&& <>({item?.name})</>}
            </NavDropdown.Item>
            {/* <NavDropdown.Item 
                as={AddRoleOnGroupButton} 
                // item={item} 
                rbacitem={item}
                item={{
                    group: item,
                    groupId: item?.id,
                }}
                disabled={!hasProperType}
            >
                Nové oprávnění {hasProperType&& <>({item?.name})</>}
            </NavDropdown.Item> */}
            
            <NavDropdown.Divider />
            <NavDropdown.Item as={ProxyLink} to={`/generic/${item?.__typename}/__def/${item?.id}`} reloadDocument={false}>Definice</NavDropdown.Item >
        </NavDropdown>
    )
}