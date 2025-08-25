import FinancialPieChart from './FinancialPieChart'

const FinancialPieView = ({ totalBalance, totalExpense, totalIncome }) => {
  const data = [
    { name: 'Total Balance', amount: totalBalance },
    { name: 'Total Expense', amount: totalExpense },
    { name: 'Total Income', amount: totalIncome },
  ]

  const colors = ['#6e11b0', '#9f0712', '#016630'] // Plasma-inspired palette
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-semibold">Financial PieView</h5>
      </div>
      <div className='grid'>
        <FinancialPieChart data={data} colors={colors} className="mt-5" />
        </div>
    </div>
  )
}
export default FinancialPieView
