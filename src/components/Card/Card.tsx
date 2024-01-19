import { useState } from 'react'
import { CardProps } from '../../types'
import { CardInfo } from '../CardInfo/CardInfo'

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

      <div className='card'>
        <div className='card-top'>


          <div className='card-top-labels'>

          </div>

          <div className='card-top-more'>
            {/* TODO dropdown */}
          </div>

        </div>


        <div className='card-title'>
        </div>

        <div className='card-description'>

        </div>

        <div className='card-footer'>
        </div>


      </div>
    </>
  )
}
