import { Trash2, TrendingDown, TrendingUp, UtensilsCrossed } from 'lucide-react'
import { addThousandsSeparator } from '../util/addThousandsSeparator'

const TransactionInfoCard = ({
  icon,
  title,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete,
}) => {
  const getAmountStyles = () =>
    type === 'income' ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500'
  return (
    <div className="group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/60">
      <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full">
        {icon ? (
          <img src={icon} alt={title} className="w-5 h-5" />
        ) : (
          <UtensilsCrossed className="text-purple-800" />
        )}
      </div>

      <div className="flex-1">
        <h5 className="text-sm text-gray-700 font-medium">{title}</h5>
        <p className="text-xs text-gray-500 mt-0.5">{date}</p>
      </div>

        <div className="flex items-center gap-2">
            {!hideDeleteBtn && (
            <button
              onClick={onDelete}
              className="text-gray-500 hover:text-red-800 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <Trash2 size={18} />
              </button>
            )}
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()}`} >
                <h6 className="text-xs font-medium">
                    {type === 'income' ? '+' : '-'}{addThousandsSeparator(amount)}
                </h6>

                {type === 'income' ? (
                    <TrendingUp size={15} />
                ): (
                    <TrendingDown size={15} />
                )}
            </div>
        </div>

    </div>
  )
}
export default TransactionInfoCard
