import { ChangeEvent } from "react";

interface ptextfieldprops {
  placeholder?: string;
  value: string;
  valueSetter: React.Dispatch<React.SetStateAction<string>>;
}

export default function PTextfield({ placeholder = 'Input here...', value = '', valueSetter }: ptextfieldprops) {
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    valueSetter(e.target.value)
  }

  return (
    <input onChange={handleOnChange} value={value} type="text" placeholder={placeholder} className="w-full h-12 rounded-lg pl-3 pr-1 poppins text-sm focus-within:outline-none" />
  )
}