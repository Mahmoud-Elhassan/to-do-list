import { createContext, useEffect, useState } from "react"
import { initializeApp } from "firebase/app"
import {
    getFirestore,
    collection,
    getDocs,
    doc,
    updateDoc,
} from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDr-3fxmvyuJj-eIBcy5RKU55YewANmkFA",
    authDomain: "todo-32ef7.firebaseapp.com",
    projectId: "todo-32ef7",
    storageBucket: "todo-32ef7.appspot.com",
    messagingSenderId: "553817194425",
    appId: "1:553817194425:web:24313852f3deaec1464068",
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const TodoContext = createContext()

export const TodoProvider = ({ children }) => {
    const [tasks, setTasks] = useState()

    useEffect(() => {
        const getDocsHandler = async () => {
            const res = await getDocs(collection(db, "todos"))
            setTasks(res.docs)
        }

        getDocsHandler()
    }, [])

    const updateDocHandler = (e, s) => {
        let docRef
        let data

        switch (e) {
            case 0:
                docRef = doc(db, "todos", "LExYo4OEBqHcsu7sO9K0")
                switch (s) {
                    case "TO-DO":
                        data = {
                            status: "TO-DO",
                        }
                        break
                    case "IN-PROGRESS":
                        data = {
                            status: "IN-PROGRESS",
                        }
                        break
                    default:
                        data = {
                            status: "DONE",
                        }
                }
                break
            case 1:
                docRef = doc(db, "todos", "aH520cKEYDIh1D2IMnA7")
                switch (s) {
                    case "TO-DO":
                        data = {
                            status: "TO-DO",
                        }
                        break
                    case "IN-PROGRESS":
                        data = {
                            status: "IN-PROGRESS",
                        }
                        break
                    default:
                        data = {
                            status: "DONE",
                        }
                }
                break
            case 2:
                docRef = doc(db, "todos", "oCzEf37XhJTVvgLiWOPa")
                switch (s) {
                    case "TO-DO":
                        data = {
                            status: "TO-DO",
                        }
                        break
                    case "IN-PROGRESS":
                        data = {
                            status: "IN-PROGRESS",
                        }
                        break
                    default:
                        data = {
                            status: "DONE",
                        }
                }
                break
            case 3:
                docRef = doc(db, "todos", "jkWAdgluxMHWW2nC0daE")
                switch (s) {
                    case "TO-DO":
                        data = {
                            status: "TO-DO",
                        }
                        break
                    case "IN-PROGRESS":
                        data = {
                            status: "IN-PROGRESS",
                        }
                        break
                    default:
                        data = {
                            status: "DONE",
                        }
                }
                break
            default:
                docRef = doc(db, "todos", "Mv3R06v2tNDNMSxNI7C1")
                switch (s) {
                    case "TO-DO":
                        data = {
                            status: "TO-DO",
                        }
                        break
                    case "IN-PROGRESS":
                        data = {
                            status: "IN-PROGRESS",
                        }
                        break
                    default:
                        data = {
                            status: "DONE",
                        }
                }
        }

        updateDoc(docRef, data)
    }

    const initialData = {
        columns: {
            "column-1": {
                id: "column-1",
                title: "TO-DO",
                taskIds: tasks && tasks.map((e) => e.data().id),
            },
            "column-2": {
                id: "column-2",
                title: "IN-PROGRESS",
                taskIds: [],
            },
            "column-3": {
                id: "column-3",
                title: "DONE",
                taskIds: [],
            },
        },
        columnOrder: ["column-1", "column-2", "column-3"],
    }

    return (
        <TodoContext.Provider value={{ initialData, tasks, updateDocHandler }}>
            {tasks && children}
        </TodoContext.Provider>
    )
}

export default TodoContext
