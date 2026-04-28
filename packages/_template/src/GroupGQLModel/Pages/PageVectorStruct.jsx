
import { ReadPageAsyncAction } from "../Queries"
import { useInfiniteScroll } from "../../../../dynamic/src/Hooks/useInfiniteScroll"
import { PageBase } from "./PageBase"
import { Table } from "../Components/Table"
import { Filter } from "../Components/Filter"
import { FilterButton, ResetFilterButton } from "../../Base/FormControls/Filter"
import { useSearchParams } from "react-router"
import { useEffect } from "react"
import { useMemo } from "react"
import { AsyncStateIndicator } from "../../Base/Helpers/AsyncStateIndicator"
import { Collapsible } from "../../Base/FormControls/Collapsible"
import { ReadStructureAsyncAction } from "../Queries/ReadStructureAsynAction"
import { useAsync } from "../../../../dynamic/src/Hooks"
import { Link } from "../Components"




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

const SelfLink = (props) => <Link {...props} action={"university"} />
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

    return <ul>{roots.map(renderNode)}</ul>;
}

export const PageVectorStruct = ({ 
    children, 
    queryAsyncAction = ReadStructureAsyncAction,
    ItemsComponent = GroupTreeByParent
 }) => {
    
    const { data, error, loading } = useAsync(queryAsyncAction)
    const items = extractArrayFromThunkResult(data || {values: []})
    return (
        <PageBase>
            <ItemsComponent items={items} />
            <AsyncStateIndicator error={error}  loading={loading} text="Nahrávám další..." />
        </PageBase>
    )
}

