import { Attribute, Col, Link, Row } from "../../../../_template/src/Base"
import { MediumCard as SubjectMediumCard } from "../../SubjectGQLModel/Components/MediumCard"
import { LargeCard as SubjectLargeCard } from "../../SubjectGQLModel/Components/LargeCard"

export const Subjects = ({ item }) => {
    const { subjects=[] } = item || {}
    return (<Row>
        {subjects.map((subject, index) => {
            return (
                <Col xs={12} xl={4} key={subject?.id || index}>
                    <SubjectMediumCard key={subject?.id || index} item={subject}>
                        <hr/>
                        {subject?.semesters?.map((semester, index) => {
                            return (
                                <Attribute key={semester?.id || index} item={semester} label="semestr" attribute_name="semester">
                                    <Link item={semester}>{semester?.order}</Link>
                                </Attribute>
                            )
                        })
                        }
                    </SubjectMediumCard>
                </Col>
            )
        })}
    </Row>)
}