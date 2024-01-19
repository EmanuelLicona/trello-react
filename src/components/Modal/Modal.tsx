
import './Modal.css'

// { children, onClose }: { children: ReactNode, onClose?: () => void }


export const Modal = (props: any) => {

  const { children, onClose } = props

  return (
    <div className='modal'
      onClick={() => onClose && onClose()}
    >

      <div className='modal-content custom-scroll'
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>


    </div>
  )
}
