import { useCallback } from "react"
import { GeneratedContentBase } from "../../../../_template/src/Base/Pages/Page"
import { ListURI, ReadItemURI } from "../Components"
import { InsertAsyncAction as ProgramInsertAsyncAction, ReadAsyncAction, ReadPageAsyncAction } from "../Queries"
import { PageItemBase } from "./PageBase"
import { PageReadItem } from "./PageReadItem"
import { useState } from "react"

import { createItem as createProgram } from "../Queries/InsertAsyncAction"
import { createItem as createSubject } from "../../SubjectGQLModel/Queries/InsertAsyncAction"
import { createItem as createSemester } from "../../SemesterGQLModel/Queries/InsertAsyncAction"

export const RandomURI = ReadItemURI.replace("view", "random")

async function randomSubject(program_id, name, i, onMessage) {
    const subject_id = crypto.randomUUID()
    const subject = await createSubject({
        id: subject_id,
        programId: program_id,
        name: `${name} - S${i + 1}`
    })
    onMessage(`Vytvořen předmět ${subject_id}`)
    for (let j = 0; j < 5; j++) {
        const semester_id = crypto.randomUUID()
        const semester = await createSemester({
            id: semester_id,
            subjectId: subject_id,
            order: j + 1
        })
        onMessage(`Vytvořen semestr předmětu ${semester_id}`)
    }
    return subject
}

const randomProgram = async ({name="Studijní program ", onMessage =(msg)=>null}) => {
    const program_id = crypto.randomUUID()
    const program = await createProgram({id: program_id, name: "Studijní program"})
    onMessage(`Vytvořen program ${program_id}`)
    for(let i=0; i<10; i++) {
        await randomSubject(program_id, name, i, onMessage)
    }
    return program
}

const RandomGenerator = ({ item }) => {
    const [lines, setLines] = useState([])
    const onClick = async () => {
        const addLine = (line) => setLines(prev => [...prev, line])
        await randomProgram({onMessage: addLine})
    }    
    return (<>
        RandomGenerator
        <hr/>
        <button className="btn btn-sm btn-outline-success" onClick={onClick}>Click me</button>
        <hr/>
    </>)
}


/**
 * Základní obálka pro „read“ stránku entity podle `:id` z routy.
 *
 * Využívá `PageItemBase`, který zajistí:
 * - získání `id` z URL (`useParams`)
 * - načtení entity přes `AsyncActionProvider` pomocí `queryAsyncAction`
 * - vložení navigace (`PageNavbar`)
 *
 * Uvnitř provideru vykreslí `ReadWithComponent`, který si vezme načtený `item`
 * z `useGQLEntityContext()` a zobrazí ho v zadané komponentě (defaultně `LargeCard`).
 *
 * @component
 * @param {object} props
 * @param {Function} [props.queryAsyncAction=ReadAsyncAction]
 *   Async action (např. thunk) pro načtení entity z backendu/GraphQL dle `id`.
 * @param {Object<string, any>} [props]
 *   Další props předané do `ReadWithComponent` (např. `Component`, layout props).
 *
 * @returns {import("react").JSX.Element}
 */
export const PageRandom = ({ 
    queryAsyncAction=ReadAsyncAction, 
    children,
    ItemLayout=({children}) => (<>{children}</>), 
    SubPage=RandomGenerator, 
    ...props 
}) => {
    return (
        <PageItemBase 
            queryAsyncAction={queryAsyncAction}
            ItemLayout={ItemLayout}
            SubPage={SubPage} 
            {...props}
        />
    )
}


