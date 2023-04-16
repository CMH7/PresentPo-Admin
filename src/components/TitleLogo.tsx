import logo from '../assets/PresentPo Logo.png'

export default function TitleLogo() {
  return (
    <div className="flex items-center gap-x-3 lg:gap-x-8">
      {/* logo */}
      <div className="w-24 rounded-full border-2 border-white overflow-hidden select-none">
        <img src={logo} alt="PresentPo Logo" />
      </div>

      {/* title */}
      <div className="poppins text-4xl lg:text-5xl text-white font-semibold select-none">
        PresentPo
      </div>
    </div>
  )
}