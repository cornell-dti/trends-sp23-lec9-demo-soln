import { Spinner } from "@chakra-ui/react"
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { Task, TaskWithId } from "../../types"
import { db } from "../../util/firebase"
import { useAuth } from "../auth/AuthUserProvider"
import TaskAddControl from "./TaskAddControl"
import TaskList from "./TaskList"

const Frodo = () => {
  const [tasks, setTasks] = useState<TaskWithId[] | null>(null)

  const { user } = useAuth()

  const taskQuery = query(
    collection(db, "tasks"),
    where("owner", "==", user!.email!)
  )

  useEffect(() => {
    const unsubscribe = onSnapshot(taskQuery, (querySnapshot) => {
      const snapshotTasks: TaskWithId[] = querySnapshot.docs.map((doc) => {
        const data = doc.data() as Task
        return { ...data, id: doc.id }
      })
      setTasks(snapshotTasks)
    })
    return unsubscribe
  }, [])

  return (
    <>
      {tasks ? (
        <>
          <TaskAddControl />
          <TaskList tasks={tasks} />
        </>
      ) : (
        <Spinner />
      )}
    </>
  )
}

export default Frodo
