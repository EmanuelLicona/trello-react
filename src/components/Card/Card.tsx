import { useState } from 'react'
import { CardProps } from '../../types'
import { CardInfo } from '../CardInfo/CardInfo'
import { AlignLeft, CheckSquare } from 'react-feather'
import { formatDate } from '../../helpers/Utils'

export const Card = (props: CardProps) => {

  const { card, boardId, removeCard, onDragEnd, onDragEnter, updateCard } = props
  const { id, title, desc, date, tasks, labels } = card

  const [showDropdown, setShowDropdown] = useState(false)
  const [showModal, setShowModal] = useState(false)


  return (
    <>
      {
        showModal && (
          <CardInfo
            card={card}
            boardId={boardId}
            onClose={() => setShowModal(false)}
            updateCard={updateCard}
          />
        )
      }

      <div className='card' key={id}
        onDragEnd={() => onDragEnd(boardId, id)}
        onDragEnter={() => onDragEnter(boardId, id)}
        onClick={() => setShowModal(true)}
        draggable
      >
        <div className='card-top'>


          <div className='card-top-labels'>
            {
              labels?.map((label, index) => (
                // TODO label chip
                <div key={index}>{JSON.stringify(label)}</div>
              ))
            }
          </div>

          <div className='card-top-more'
            onClick={(e) => {
              e.stopPropagation()
              setShowDropdown(true)
            }}
          >
            {/* TODO dropdown */}
          </div>

        </div>


        <div className='card-title'>{title}</div>

        <div className='card-description'>
          <p title={desc}><AlignLeft /></p>
        </div>

        <div className='card-footer'>
          {date && (
            <p className="card-footer-item">
              {/* TODO date component */}
              {formatDate(date)}
            </p>
          )}
          {tasks && tasks?.length > 0 && (
            <p className="card-footer-item">
              <CheckSquare className="card-footer-icon" />
              {tasks?.filter((item) => item.completed)?.length}/{tasks?.length}
            </p>
          )}
        </div>


      </div>
    </>
  )
}
