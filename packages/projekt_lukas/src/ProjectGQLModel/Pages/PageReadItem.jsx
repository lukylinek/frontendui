import { PageItemBase } from "./PageBase"
import { ProjectReadContent } from "./ProjectReadContent"

export const PageReadItem = ({ 
    SubPage = ProjectReadContent,
    ...props
}) => {
    return (
        <PageItemBase SubPage={SubPage} {...props} />
    )
}