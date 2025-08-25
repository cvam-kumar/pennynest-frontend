import { useEffect, useState } from 'react'
import Dashboard from '../component/Dashboard.jsx'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../hook/useUser.jsx'
import InfoCard from '../component/InfoCard.jsx'
import { Coins, Wallet, WalletCards } from 'lucide-react'
import { addThousandsSeparator } from '../util/addThousandsSeparator.js'
import { axiosConfig } from '../util/axiosConfig.js'
import { API_ENDPOINTS } from '../util/apiEndpoints.js'
import toast from 'react-hot-toast'
import FinancialPieView from '../component/FinancialPieView.jsx'
import Transactions from '../component/Transactions.jsx'

const Home = () => {
  const navigate = useNavigate()
  const [dashboardData, setDashboardData] = useState(null)

  const fetchDashBoardData = async () => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.DASHBOARD_DATA)
      setDashboardData(response.data)
    } catch (error) {
      console.log('There is something wrong in fetching data for dashboard')
      toast.error(
        error?.response?.data?.message || 'Data Fetching Failed in Dashboard'
      )
    }
  }

  useEffect(() => {
    fetchDashBoardData()
    return () => {}
  }, [])

  useUser()
  return (
    <div>
      <Dashboard activeMenu="Dashboard">
        <div className="my-5 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* display the cards */}
            <InfoCard
              icon={<WalletCards />}
              label="Total Balance"
              value={addThousandsSeparator(dashboardData?.totalBalance)}
              color="bg-purple-800"
            />
            <InfoCard
              icon={<Wallet />}
              label="Total Income"
              value={addThousandsSeparator(dashboardData?.totalIncome)}
              color="bg-green-800"
            />
            <InfoCard
              icon={<Coins />}
              label="Total Expense"
              value={addThousandsSeparator(dashboardData?.totalExpense)}
              color="bg-red-800"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Recent Transactions */}
            <Transactions
              transactions={dashboardData?.recentTransactions}
              title="Recent Transactions"
              onMore={() => navigate('/expense')}
            />

            {/* finance overview chart  */}
            <FinancialPieView
              totalBalance={dashboardData?.totalBalance || 0}
              totalExpense={dashboardData?.totalExpense || 0}
              totalIncome={dashboardData?.totalIncome || 0}
            />

            {/* Expense Transactions  */}
            <Transactions
              transactions={dashboardData?.recent5Expenses || []}
              title="Recent Expenses"
              onMore={() => navigate('/expense')}
              type="expense"
            />

            {/* Income Transactions  */}
            <Transactions
              transactions={dashboardData?.recent5Incomes || []}
              title="Recent Incomes"
              onMore={() => navigate('/income')}
              type="income"
            />
          </div>
        </div>
      </Dashboard>
    </div>
  )
}

export default Home
