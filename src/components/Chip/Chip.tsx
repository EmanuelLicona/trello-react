import { X } from 'react-feather'
import { ChipProps } from '../../types'

export const Chip = (props: ChipProps) => {
   const { item, removeLabel } = props

  return (
    <label 
      style={{
        backgroundColor: item.color,
        color: '#fff'
      }}
    > 

      {item.text}

      {removeLabel && <X onClick={() => removeLabel(item)}/>}

    </label>
  )
}
