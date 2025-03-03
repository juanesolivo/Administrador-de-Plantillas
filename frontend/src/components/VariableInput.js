"use client"

import { useState, useEffect } from "react"

export default function VariableInput({ variable, value, onChange }) {
  const [inputValue, setInputValue] = useState(value)

  useEffect(() => {
    setInputValue(value)
  }, [value])

  const handleChange = (e) => {
    setInputValue(e.target.value)
    onChange(e.target.value)
  }

  return (
    <div className="form-group">
      <label>{variable}</label>
      <input
        type="text"
        className="form-control"
        value={inputValue}
        onChange={handleChange}
        placeholder={`Valor para ${variable}`}
        required
      />
    </div>
  )
}

