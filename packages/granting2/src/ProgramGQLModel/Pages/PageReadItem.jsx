import { GeneratedContentBase } from "../../../../_template/src/Base/Pages/Page"
import { Subjects } from "../Vectors/Subjects"
import { PageItemBase } from "./PageBase"

export const PageReadItem = ({ 
    // SubPage=GeneratedContentBase,
    SubPage=Subjects,
    ...props
}) => {
    return (
        <PageItemBase SubPage={SubPage} {...props}/>
    )
}