import { useParams } from "react-router";
import { AsyncStateIndicator, CardCapsule, Col, LeftColumn, MiddleColumn, Row } from "../../Base"
import { Link, ReadItemURI } from "..";
import { ReadStructureAsyncAction } from "../Queries/ReadStructureAsynAction";
import { useMemo } from "react";
import { PageReadItem } from "./PageReadItem";
import { useAsync } from "../../../../dynamic/src/Hooks";


export const ReadItemUniverisityURI = ReadItemURI.replace("view", "university")

const extractArrayFromThunkResult = (thunkResult) => {
    // očekáváš { data: { something: [...] } } nebo podobně
    const root = thunkResult?.data ? thunkResult.data : thunkResult;
    const values = root ? Object.values(root) : [];

    // 1) přímo první hodnota
    let candidate = values?.[0];
    if (Array.isArray(candidate)) return candidate;

    // 2) najdi první pole uvnitř
    candidate = values.find((v) => Array.isArray(v));
    if (Array.isArray(candidate)) return candidate;

    // 3) fallback
    return [];
};


const SelfLink = ({...props}) => <Link {...props} action="university"/>

export const GroupTreeByParent = ({
    items,
    rootId = null,
    NodeComponent = SelfLink,
}) => {
    const childrenByParent = useMemo(() => {
        const map = new Map();

        for (const item of items ?? []) {
            const key = item.mastergroupId ?? "__root__";
            if (!map.has(key)) {
                map.set(key, []);
            }
            map.get(key).push(item);
        }

        return map;
    }, [items]);

    const roots = useMemo(() => {
        if (rootId) {
            return (items ?? []).filter((x) => x.id === rootId);
        }
        return childrenByParent.get("__root__") ?? [];
    }, [items, rootId, childrenByParent]);

    if (!NodeComponent) {
        throw new Error("GroupTreeByParent: prop 'NodeComponent' je povinný.");
    }

    const renderNode = (node) => {
        const children = childrenByParent.get(node.id) ?? [];

        return (
            <li key={node.id}>
                <NodeComponent item={node} />
                {children.length > 0 && <ul>{children.map(renderNode)}</ul>}
            </li>
        );
    };

    return (
        <CardCapsule>
            <ul>{roots.map(renderNode)}</ul>
        </CardCapsule>
    );
}

export const BaseVectorPageLayout = ({ 
    items,
    VectorComponent = GroupTreeByParent,
    SubPage=PageReadItem,
}) => {    
    return (
        <Row>
            <LeftColumn>
                <VectorComponent items={items} />
            </LeftColumn>
            <MiddleColumn>
                <SubPage />
            </MiddleColumn>
        </Row>
    )
}

export const PageVectorBase = ({
    queryAsyncAction = ReadStructureAsyncAction,
    PageNavbar = ({ children }) => (<>{children}</>),
    // ItemLayout=({children}) => (<>{children}</>),
    ItemLayout = BaseVectorPageLayout,
    defaultParams = {},
    ...props
}) => {
    const {id} = useParams()
    const { 
        data,
        loading,
        error,
        reRead,
        params
    } = useAsync(queryAsyncAction, defaultParams)
    const items = extractArrayFromThunkResult(data)
    return (<>
        {id && PageNavbar && <PageNavbar item={{id}} />}
        <AsyncStateIndicator error={error} loading={loading} text="Nahrávám"/>
        <ItemLayout items={items} {...props} />
    </>)
}

