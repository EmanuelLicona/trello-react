import { FormEvent, useState } from 'react'
import { X } from 'react-feather'

import { CustomInputProps } from '../../types'

import './CustomInput.css'

export const CustomInput = (props: CustomInputProps) => {
  const {
    text,
    displayClass,
    onSubmit,
    editClass,
    placeholder,
    defaultValue,
    buttonText,
  } = props

  const [isCustomInput, setIsCustomInput] = useState(false)
  const [inputText, setInputText] = useState(defaultValue || "")

  const submission = (e: FormEvent) => {
    e.preventDefault()
    if (inputText && onSubmit) {
      setInputText("")
      onSubmit(inputText)
    }
    setIsCustomInput(false)
  }

  return (
    <div className="custom-input">
      {isCustomInput ? (
        <form
          className={`custom-input-edit ${editClass ? editClass : ""}`}
          onSubmit={submission}
        >
          <input
            type="text"
            value={inputText}
            placeholder={placeholder || text}
            onChange={(event) => setInputText(event.target.value)}
            autoFocus
          />
          <div className="custom-input-edit-footer">
            <button type="submit">{buttonText || "Add"}</button>
            <X onClick={() => setIsCustomInput(false)} className="closeIcon" />
          </div>
        </form>
      ) : (
        <p
          className={`custom-input-display ${displayClass ? displayClass : ""}`}
          onClick={() => setIsCustomInput(true)}>
          {text}
        </p>
      )}
    </div>
  )
}
