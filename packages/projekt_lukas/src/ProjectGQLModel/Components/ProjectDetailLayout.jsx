import { Row } from "../../../../_template/src/Base/Components/Row"
import { LeftColumn, MiddleColumn } from "../../../../_template/src/Base/Components/Col"
import { SimpleCardCapsule } from "../../../../_template/src/Base/Components/CardCapsule"
import { ProjectDetail } from "./ProjectDetail"
import { FinanceSummary } from "./ProjectRead/FinanceSummary"
import { InteractiveMutations } from "../Mutations/InteractiveMutations"
import { MainPanel } from "./ProjectRead/MainPanel"

export const ProjectDetailLayout = ({ item }) => {
    if (!item) return null

    return (
        <SimpleCardCapsule title={item.name}>
            <Row>
                <LeftColumn>
                    <ProjectDetail item={item} />
                    <FinanceSummary finance={item.finance} />
                    <InteractiveMutations item={item} />
                </LeftColumn>
                <MiddleColumn>
                    <MainPanel item={item} />
                </MiddleColumn>
            </Row>
        </SimpleCardCapsule>
    )
}
