import { Download, Mail } from 'lucide-react'
import TransactionInfoCard from './TransactionInfoCard'
import moment from 'moment'

const FinanceList = ({ transactions, onDelete, onEmail, onDownload, financeType }) => {
  return (
    <div className="card">
      <div className="flex justify-between items-center">
        <h5 className="text-lg font-semibold">{financeType} Sources</h5>
        <div className="flex items-center justify-end gap-3">
          <button className="card-btn" onClick={onEmail}>
            <Mail size={15} className="text-base" />
            Email
          </button>
          <button className="card-btn" onClick={onDownload}>
            <Download size={15} className="text-base" />
            Download
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* display the  finance*/}
        {transactions?.map((finance) => (
          <TransactionInfoCard
            key={finance.id}
            title={finance.name}
            icon={finance.icon}
            date={moment(finance.date).format('Do MMM YYYY')}
            amount={finance.amount}
            type={financeType.toLowerCase()}
            onDelete={() => onDelete(finance.id)}
          />
        ))}
      </div>
    </div>
  )
}
export default FinanceList
