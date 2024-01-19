import { useState } from 'react'
import { MoreHorizontal } from "react-feather"

import { BoardProps } from '../../types'

import { CustomInput } from '../CustomInput/CustomInput'
import { Dropdown } from '../Dropdown/Dropdown'
import { Card } from '../Card/Card'

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
    <div className="board">
      <div className="board-inner" key={board?.id}>
        <div className="board-header">
          <p className="board-header-title">
            {board?.title}
            <span>{board?.cards?.length || 0}</span>
          </p>
          <div
            className="board-header-title-more"
            onClick={() => setShowDropdown(true)}
          >
            <MoreHorizontal />
            {showDropdown && (
              <Dropdown
                class="board-dropdown"
                onClose={() => setShowDropdown(false)}
              >
                <p onClick={() => removeBoard(board?.id)}>Delete Board</p>
              </Dropdown>
            )}
          </div>
        </div>
        <div className="board-cards custom-scroll">
          {board?.cards?.map((item) => (
            <Card
              key={item.id}
              card={item}
              boardId={board.id}
              removeCard={removeCard}
              onDragEnter={onDragEnter}
              onDragEnd={onDragEnd}
              updateCard={updateCard}
            />
          ))}
          <CustomInput
            text="+ Add Card"
            placeholder="Enter Card Title"
            displayClass="board-add-card"
            editClass="board-add-card-edit"
            onSubmit={(value: string) => addCard(board?.id, value)}
          />
        </div>
      </div>
    </div>
  )
}
