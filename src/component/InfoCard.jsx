const InfoCard = ({icon, label, value , color}) => {
  return (
    <div className="flex gap-6 bg-amber-50/10 rounded-2xl border p-6 shadow-sm shadow-gray-100 border-gray-200">
        <div className={`flex w-14 h-14 items-center rounded-full justify-center text-[26px] text-white ${color} rounded drop-shadow-xl`}>{icon}</div>
        <div className="">
            <h6 className="text-sm text-gray-500 mb-1">{label}</h6>
            <span className="text-[22px]">{value}</span>
        </div>
    </div>
  )
}
export default InfoCard