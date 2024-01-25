import { createSlice } from '@reduxjs/toolkit'
import { IBoard } from '../../interfaces/IBoard'
import { ICard } from '../../interfaces'


export const boardSlice = createSlice({
  name: "workspace",
  initialState: {
    boards: [] as IBoard[],
  },
  reducers: {
    setBoards: (state, action) => {
      state.boards = action.payload
    },
    //  Boards Actions
    addboard: (state, { payload }: { payload: IBoard }) => {
      state.boards.push(payload)
    },

    removeBoard: (state, { payload }: { payload: number }) => {
      const boardIndex = state.boards.findIndex((item: IBoard) => item.id === payload)
      if (boardIndex < 0) return
      state.boards.splice(boardIndex, 1)
    },

    //  Cards Actions
    addCard: (state, { payload } : { payload: { boardId: number, card: ICard } }) => {
      const { boardId, card } = payload

      const boardIndex = state.boards.findIndex((item: IBoard) => item.id === boardId)
      if (boardIndex < 0) return
      
      state.boards[boardIndex].cards.push(card)

    },

    removeCard: (state, { payload }: { payload: { boardId: number, cardId: number } }) => {
      const { boardId, cardId } = payload
      
      const board = state.boards.find((item: IBoard) => item.id === boardId)
      if (!board) return
     
      const cards = board.cards
      const cardIndex = cards.findIndex((item: ICard) => item.id === cardId)
      if (cardIndex < 0) return
     
      cards.splice(cardIndex, 1)
    },

    updateCard: (state, { payload }: { payload: { boardId: number, cardId: number, card: ICard } }) => {
      const { boardId, cardId, card } = payload
      const board = state.boards.find((item: IBoard) => item.id === boardId)
      if (!board) return

      const cards = board.cards
      const cardIndex = cards.findIndex((item: ICard) => item.id === cardId)
      if (cardIndex < 0) return

      cards[cardIndex] = card
    },

  },
})

export const {
  setBoards,
  addboard,
  removeBoard,
  addCard,
  removeCard,
  updateCard
} = boardSlice.actions