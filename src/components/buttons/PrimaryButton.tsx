interface prmbtnprops {
  name?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function PrimaryButton({ name = 'Primary button', onClick = () => { } }: prmbtnprops) {

  return (
    <button onClick={onClick} className='w-full h-[55px] rounded-full bg-primary-2 hover:bg-prm-btn-hover transition-all ease-in-out duration-700'>
      <div className="text-white font-bold poppins text-xl select-none">
        {name}
      </div>
    </button>
  )
}