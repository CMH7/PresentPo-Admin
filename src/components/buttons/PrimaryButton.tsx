interface prmbtnprops {
  name?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function PrimaryButton({ name = 'Primary button', onClick = () => { } }: prmbtnprops) {

  return (
    <button onClick={onClick} className='w-full h-[55px] rounded-full bg-primary-1 hover:bg-white hover:shadow-lg hover:shadow-slate-500/50 group transition-all ease-in-out'>
      <div className="text-white group-hover:text-primary-2 font-bold poppins text-xl select-none">
        {name}
      </div>
    </button>
  )
}