import { ChangeEvent } from 'react'

interface ppassfieldprops {
  placeholder?: string;
  value?: string;
  valueSetter: React.Dispatch<React.SetStateAction<string>>;
}

export default function PPassfield({ placeholder = 'Password', valueSetter, value = '' }: ppassfieldprops) {
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    valueSetter(e.target.value)
  }
  
  return (
    <input onChange={handleOnChange} type="password" placeholder={placeholder} className="w-full h-12 rounded-lg pl-3 pr-1 poppins text-sm focus-within:outline-none" />
  )
}