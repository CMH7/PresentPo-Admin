import { ChangeEvent } from 'react'

interface ppassfieldprops {
  placeholder?: string
  disabled: boolean
  value?: string
  valueSetter: React.Dispatch<React.SetStateAction<string>>
}

export default function PPassfield({ placeholder = 'Password', valueSetter, value = '', disabled = false }: ppassfieldprops) {
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    valueSetter(e.target.value)
  }
  
  return (
    <input onChange={handleOnChange} disabled={disabled} type="password" placeholder={placeholder} className="w-full h-12 rounded-lg pl-3 pr-1 poppins text-sm focus-within:outline-none" />
  )
}