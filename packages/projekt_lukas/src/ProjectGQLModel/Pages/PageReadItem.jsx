import { PageItemBase } from "./PageBase"
import { ProjectDetailLayout } from "../Components/ProjectDetailLayout"

export const PageReadItem = ({
    ItemLayout = ProjectDetailLayout,
    ...props
}) => {
    return (
        <PageItemBase ItemLayout={ItemLayout} {...props} />
    )
}
