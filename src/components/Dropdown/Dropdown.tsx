import { useEffect, useRef } from 'react'

import './Dropdown.css'

export const Dropdown = (props: any) => {
  const dropdownRef: any = useRef()

  const handleClick = (event: any) => {
    if (
      dropdownRef &&
      dropdownRef.current &&
      !dropdownRef.current?.contains(event.target) &&
      props.onClose
    )
      props.onClose()
  }

  useEffect(() => {
    document.addEventListener("click", handleClick)

    return () => {
      document.removeEventListener("click", handleClick)
    }
  })

  return (
    <div
      ref={dropdownRef}
      className={`dropdown custom-scroll ${props.class ? props.class : ""}`}
    >
      {props.children}
    </div>
  )
}
