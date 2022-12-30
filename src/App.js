import { DragDropContext } from "react-beautiful-dnd"
import {
    Flex,
    Heading,
    Text,
    extendTheme,
    ChakraProvider,
} from "@chakra-ui/react"
import dynamic from "next/dynamic"
import { useContext } from "react"
import TodoContext from "./todoContext"

import { useState } from "react"

const Column = dynamic(() => import("./column"), { ssr: false })

const reorderColumnList = (sourceCol, startIndex, endIndex) => {
    const newTaskIds = Array.from(sourceCol.taskIds)
    const [removed] = newTaskIds.splice(startIndex, 1)
    newTaskIds.splice(endIndex, 0, removed)

    const newColumn = {
        ...sourceCol,
        taskIds: newTaskIds,
    }

    return newColumn
}

const colors = {
    "main-bg": "#0E1012",

    "white-text": "#E8E8EA",
    "subtle-text": "#9B9B9B",

    "column-bg": "#16181D",
    "column-header-bg": "#1A1D23",

    "card-bg": "#242731",
    "card-border": "#2D313E",
}
const theme = extendTheme({ colors })

function App() {
    const { initialData, tasks, updateDocHandler } = useContext(TodoContext)

    const [state, setState] = useState(initialData)
    const tasksState = tasks.map((e) => e.data())

    const onDragEnd = (result) => {
        const { destination, source } = result

        // If user tries to drop in an unknown destination
        if (!destination) return

        // if the user drags and drops back in the same position
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return
        }

        // If the user drops within the same column but in a different positoin
        const sourceCol = state.columns[source.droppableId]
        const destinationCol = state.columns[destination.droppableId]

        if (sourceCol.id === destinationCol.id) {
            const newColumn = reorderColumnList(
                sourceCol,
                source.index,
                destination.index
            )

            const newState = {
                ...state,
                columns: {
                    ...state.columns,
                    [newColumn.id]: newColumn,
                },
            }
            setState(newState)
            return
        }

        // If the user moves from one column to another
        const startTaskIds = Array.from(sourceCol.taskIds)
        const [removed] = startTaskIds.splice(source.index, 1)
        const newStartCol = {
            ...sourceCol,
            taskIds: startTaskIds,
        }

        const endTaskIds = Array.from(destinationCol.taskIds)
        endTaskIds.splice(destination.index, 0, removed)
        const newEndCol = {
            ...destinationCol,
            taskIds: endTaskIds,
        }

        const newState = {
            ...state,
            columns: {
                ...state.columns,
                [newStartCol.id]: newStartCol,
                [newEndCol.id]: newEndCol,
            },
        }

        updateDocHandler(removed, destinationCol.title)
        setState(newState)
    }

    return (
        <ChakraProvider theme={theme}>
            <DragDropContext onDragEnd={onDragEnd}>
                <Flex
                    flexDir='column'
                    bg='main-bg'
                    minH='100vh'
                    w='full'
                    color='white-text'
                    pb='2rem'
                >
                    <Flex py='4rem' flexDir='column' align='center'>
                        <Heading fontSize='3xl' fontWeight={600}>
                            React Beautiful Drag and Drop
                        </Heading>
                        <Text
                            fontSize='20px'
                            fontWeight={600}
                            color='subtle-text'
                        >
                            react-beautiful-dnd
                        </Text>
                    </Flex>

                    <Flex justify='space-between' px='4rem'>
                        {state.columnOrder.map((columnId) => {
                            const column = state.columns[columnId]
                            const tasks = column.taskIds.map(
                                (taskId) => tasksState[taskId]
                            )

                            return (
                                <Column
                                    key={column.id}
                                    column={column}
                                    tasks={tasks}
                                />
                            )
                        })}
                    </Flex>
                </Flex>
            </DragDropContext>
        </ChakraProvider>
    )
}

export default App
