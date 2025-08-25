import React, { useEffect, useState } from 'react'
import CustomLineChart from './CustomLineChart.jsx'
import { MinusIcon, PlusIcon } from 'lucide-react'
import { prepareFinanceLineChart } from '../util/prepareFinanceLineChart.js'

const FinanceOverview = ({ transactions, onAddFinance, financeType }) => {
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    const result = prepareFinanceLineChart(transactions)
    setChartData(result)

    return () => {}
  }, [transactions])


  return (
    <div className="card mt-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h5 className="text-lg font-semibold">{financeType} Overview</h5>
          <p className="text-xs text-gray-400 mt-0.5">
            Track your {financeType.toLowerCase()} over time and analyze your {financeType} trends.
          </p>
        </div>
        <button className="add-btn" onClick={onAddFinance}>
         <PlusIcon size={20} />Add {financeType}
        </button>
      </div>

      <CustomLineChart data={chartData} />
    </div>
  )
}
export default FinanceOverview
