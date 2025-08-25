import { ArrowRight } from 'lucide-react'
import TransactionInfoCard from './TransactionInfoCard'
import moment from 'moment'

const RecentTransactions = ({ transactions, onMore }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-semibold">Recent Transactions</h5>
        <button className="card-btn font-medium hover:bg-blue-400 hover:text-white" onClick={onMore}>
          More <ArrowRight className="text-blue-500" />
        </button>
      </div>
      <div className="mt-6">
        {transactions?.slice(0, 5)?.map((item) => (
          <TransactionInfoCard
            key={item.id}
            icon={item.icon}
            title={item.name}
            date={moment(item.date).format("Do MMM YYYY")}
            amount={item.amount}
            type={item.type}
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  )
}
export default RecentTransactions
