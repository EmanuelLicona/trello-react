import { useEffect, useRef, useState } from 'react'

import './Dropdown.css'

export const Dropdown = (props: any) => {
  const dropdownRef: any = useRef()
  const [count, setCount] = useState(0)

  const handleClick = (event: any) => {
    const { target } = event
    const tagName = target.nodeName.toLowerCase()
    
    if (tagName === "svg" && count == 0) {
      setCount(1)
      return
    }

    if (
      dropdownRef &&
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
