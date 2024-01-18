import { useState } from 'react'
import { MoreHorizontal } from "react-feather";

import { BoardProps } from '../../types'

import { CustomInput } from '../CustomInput/CustomInput'

import './Board.css'

export const Board = (props: BoardProps) => {

  const {
    board,
    addCard,
    removeBoard,
    removeCard,
    onDragEnd,
    onDragEnter,
    updateCard
  } = props

  const [showDropdown, setShowDropdown] = useState(false)


  return (
    <div className='board'>

      <div className='board-inner' key={board.id}>

        <div className='board-header'>
          <p className='board-header-title'>
            {board.title} <span>{board.cards.length || 0}</span>
          </p>

          <div className='board-header-title-more' onClick={() => setShowDropdown(true)}>
            <MoreHorizontal />

            {/* TODO: Dropdown start */}
            <p onClick={() => removeBoard(board.id)}>
              Delete Board
            </p>
            {/* TODO: Dropdown end */}

          </div>
        </div>

        <div className='board-cards custom-scroll'>
          {/* TODO: Board Cards */}

          <CustomInput
            text='add card'
            displayClass="board-add-card"
            onSubmit={(title) => addCard(board.id, title)}
            buttonText="Add another card"
          />
        </div>

      </div>

    </div>
  )
}
