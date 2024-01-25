import { useEffect, useState } from 'react'
import { ICard, ILabel, ITask } from '../interfaces'
import { useBoardStore } from './useBoardStore'
import { CardInfoProps } from '../types'

export const useCardInfo = (props: CardInfoProps) => {
  const { card, boardId } = props

  const { onUpdateCard } = useBoardStore()


  const [isFirstRender, setIsFirstRender] = useState(true)

  const [selectedColor, setSelectedColor] = useState("")

  const [cardValues, setCardValues] = useState<ICard>({
    ...card,
  })

  const updateTitle = (value: string) => {
    setCardValues({ ...cardValues, title: value })
  }

  const updateDesc = (value: string) => {
    setCardValues({ ...cardValues, desc: value })
  }

  const addLabel = (label: ILabel) => {

    if (cardValues.labels) {
      const index = cardValues.labels.findIndex(
        (item) => item.text === label.text,
      )
      if (index > -1) return //if label text already exist then return

    }

    setCardValues({
      ...cardValues,
      labels: [...cardValues.labels ? cardValues.labels : [], label],
    })
    setSelectedColor("")
  }

  const removeLabel = (label: ILabel) => {
    const tempLabels = cardValues.labels.filter(
      (item) => item.text !== label.text,
    )

    setCardValues({
      ...cardValues,
      labels: tempLabels,
    })
  }

  const addTask = (value: string) => {
    const task: ITask = {
      id: Date.now() + Math.random() * 2,
      completed: false,
      text: value,
    }
    setCardValues({
      ...cardValues,
      tasks: [...cardValues.tasks ? cardValues.tasks : [], task],
    })
  }

  const removeTask = (id: number) => {
    const tasks = [...cardValues.tasks]

    const tempTasks = tasks.filter((item) => item.id !== id)
    setCardValues({
      ...cardValues,
      tasks: tempTasks,
    })
  }

  const updateTask = (id: number, value: boolean) => {
    const tasks = [...cardValues.tasks]

    const index = tasks.findIndex((item) => item.id === id)
    if (index < 0) return

    const updatedTasks = [...tasks]  // Crear una copia profunda del array de tareas
    updatedTasks[index] = { ...updatedTasks[index], completed: Boolean(value) }  // Modificar la tarea específica
  
    setCardValues({
      ...cardValues,
      tasks: updatedTasks,
    })
  }

  const calculatePercent = () => {
    if (!cardValues.tasks?.length) return 0
    const completed = cardValues.tasks?.filter(
      (item) => item.completed,
    )?.length
    return (completed / cardValues.tasks?.length) * 100
  }

  const updateDate = (date: string) => {
    if (!date) return

    setCardValues({
      ...cardValues,
      date,
    })
  }

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false)
      return
    }
    onUpdateCard(boardId, cardValues.id, cardValues)
  }, [cardValues])

  const calculatedPercent = calculatePercent()

  return {
    cardValues,
    selectedColor,
    setSelectedColor,
    updateTitle,
    updateDesc,
    addLabel,
    removeLabel,
    addTask,
    removeTask,
    updateTask,
    updateDate,
    calculatedPercent,
  }
}