import { PageItemBase } from "./PageBase"
import { GeneratedContentBase } from "../../../../_template/src/Base/Pages/Page"
import { LargeCard } from "../Components"

const ReadContent = (props) => {
    return (
        <LargeCard item={props.item}>
            <GeneratedContentBase {...props} />
        </LargeCard>
    )
}

export const PageReadItem = ({
    SubPage = ReadContent,
    ...props
}) => {
    return (
        <PageItemBase SubPage={SubPage} {...props} />
    )
}