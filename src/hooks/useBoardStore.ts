import { useDispatch, useSelector } from 'react-redux'
import { StoreRootState } from '../store/store'
import { IBoard, ICard } from '../interfaces'
import { addCard, addboard, cardMove, removeBoard, removeCard, setBoards, updateCard } from '../store/workspace/boardSlice'
// import { doc, updateDoc } from 'firebase/firestore/lite'
// import { FirebaseDB } from '../firebase/config'
// import { IWorkspace } from '../interfaces/IWorkspace'

export const useBoardStore = () => {

  const dispatch = useDispatch()
  const { boards } = useSelector((state: StoreRootState) => state.board)
  // const { currentWorkspace } = useSelector((state: StoreRootState) => state.workspace)
  // const { user } = useSelector((state: StoreRootState) => state.auth)

  //  * Methods of Board

  const onSetBoards = (boards: IBoard[]) => {
    dispatch(setBoards(boards))
  }

  const onAddBoard = (title: string) => {
    const board: IBoard = {
      id: Date.now() + Math.random() * 2,
      title,
      cards: []
    }

    dispatch(addboard(board))
  }

  const onRemoveBoard = (boardId: number) => {
    dispatch(removeBoard(boardId))
  }


  //  * Methods of Card
  const onAddCard = (boardId: number, title: string) => {
    const card = {} as ICard
    card.id = Date.now() + Math.random() * 2
    card.title = title

    dispatch(addCard({ boardId, card }))
  }

  const onRemoveCard = (boardId: number, cardId: number) => {
    dispatch(removeCard({ boardId, cardId }))
  }

  const onUpdateCard = async (boardId: number, cardId: number, card: ICard) => {
    dispatch(updateCard({ boardId, cardId, card }))

    // try {

    //   const { uid } = user
    //   if (!currentWorkspace) throw new Error('No current workspace')
    //   if (!uid) throw new Error('User not logged in')

    //   const docRef = doc(FirebaseDB, `${uid}/app/workspaces/${currentWorkspace.workspaceId}`)
    //   const obj: IWorkspace = { ...currentWorkspace, boards: boards }

    //   await updateDoc(docRef, { ...obj })
    // } catch (error) {
    //   console.log(error)

    // }
  }

  const onCardMove = (sourceBoardId: number, sourceCardId: number, targetBoardId: number, targetCardId: number) => {
    // * Board que quiero mover
    const sourceBoardIndex = boards.findIndex((item: IBoard) => item.id === sourceBoardId)
    if (sourceBoardIndex < 0) return

    const sourceCardIndex = boards[sourceBoardIndex].cards.findIndex((item: ICard) => item.id === sourceCardId)
    if (sourceCardIndex < 0) return

    // * Board destino
    const targetBoardIndex = boards.findIndex((item: IBoard) => item.id === targetBoardId)
    if (targetBoardIndex < 0) return

    let targetCardIndex = 0
    if (targetCardId !== -1) { // ! si es -1 es porque no hay card destino
      targetCardIndex = boards[targetBoardIndex].cards.findIndex((item: ICard) => item.id === targetCardId)
    }
    if (targetCardIndex < 0) return

    dispatch(cardMove({ sourceBoardIndex, sourceCardIndex, targetBoardIndex, targetCardIndex }))
  }


  return {
    boards,

    // Methods of Board
    onSetBoards,
    onAddBoard,
    onRemoveBoard,

    // Methods of Card
    onAddCard,
    onRemoveCard,
    onUpdateCard,

    onCardMove
  }
}