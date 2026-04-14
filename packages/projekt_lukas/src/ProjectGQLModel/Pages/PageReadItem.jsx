import { PageItemBase } from "./PageBase"
import { GeneratedContentBase } from "../../../../_template/src/Base/Pages/Page"

export const PageReadItem = ({
    SubPage = GeneratedContentBase,
    ...props
}) => {
    return (
        <PageItemBase SubPage={SubPage} {...props} />
    )
}