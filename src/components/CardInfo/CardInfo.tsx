import { Modal } from '../Modal/Modal'

import { CardInfoProps } from '../../types'

import './CardInfo.css'

export const CardInfo = (props: CardInfoProps) => {

  const { onClose, card, boardId, updateCard } = props

  return (
    <Modal onClose={onClose}>

    </Modal>
  )
}
