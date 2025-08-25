import { Loader, Search } from 'lucide-react'
import Dashboard from '../component/Dashboard.jsx'
import { useUser } from '../hook/useUser.jsx'
import { useState } from 'react'
import { axiosConfig } from '../util/axiosConfig.js'
import { API_ENDPOINTS } from '../util/apiEndpoints.js'
import TransactionInfoCard from '../component/TransactionInfoCard.jsx'
import moment from 'moment'
import toast from 'react-hot-toast'

const Filter = () => {
  const [type, setType] = useState('income')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [keyword, setKeyword] = useState('')
  const [sortField, setSortField] = useState('date')
  const [sortOrder, setSortOrder] = useState('asc')
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await axiosConfig.post(API_ENDPOINTS.APPLY_FILTER, {
        type,
        startDate,
        endDate,
        keyword,
        sortField,
        sortOrder,
      })
      setTransactions(response.data)
    } catch (error) {
      console.log('Failed to fetch transactions: ', error)
      toast.error(
        error.message || 'Failed to fetch transactions. Please Try Again.'
      )
    } finally {
      setLoading(false)
    }
  }

  useUser()
  return (
    <Dashboard activeMenu="Filters">
      <div className="my-5 mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Filter Transactions</h2>
        </div>
        <div className="card p-4 mb-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Select the filters</h2>
          </div>
          <form className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="type">
                Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                id="type"
                className="select w-full max-w-xs select-bordered focus:outline-none focus:border-2 focus:border-blue-500"
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
            <div className="w-full max-w-xs">
              <label htmlFor="startDate" className="text-sm font-medium mb-1">
                Start Date
              </label>
              <input
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                id="startDate"
                type="date"
                className="input input-bordered focus:outline-none focus:border-2 focus:border-blue-500"
              />
            </div>

            <div className="w-full max-w-xs">
              <label htmlFor="endDate" className="text-sm font-medium mb-1">
                End Date
              </label>
              <input
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                id="endDate"
                type="date"
                className="input input-bordered focus:outline-none focus:border-2 focus:border-blue-500 focus:shadow-none"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="sortField"
              >
                Sort Field
              </label>
              <select
                value={sortField}
                onChange={(e) => setSortField(e.target.value)}
                id="sortField"
                className="select w-full max-w-xs select-bordered focus:outline-none focus:ring-0 focus:border-2 focus:border-blue-500"
              >
                <option value="date">Date</option>
                <option value="amount">Amount</option>
                <option value="category">Category</option>
              </select>
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="sortOrder"
              >
                Sort Order
              </label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                id="sortOrder"
                className="select w-full max-w-xs select-bordered focus:outline-none focus:ring-0 focus:border-2 focus:border-blue-500"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
            <div className="sm:col-span-1 md:col-span-1 flex items-end">
              <div className="w-full">
                <label
                  htmlFor="keyword"
                  className="block text-sm font-medium mb-1"
                >
                  Search
                </label>
                <input
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  id="endDate"
                  type="text"
                  className="input input-bordered focus:outline-none focus:border-2 focus:border-blue-500 focus:shadow-none"
                />
              </div>
              <button
                onClick={(e) => handleSearch(e)}
                className="ml-2 p-2.5 bg-blue-500 hover:bg-blue-800 text-white rounded flex items-center justify-center cursor-pointer"
              >
                <Search size={20} />
              </button>
            </div>
          </form>
        </div>
        <div className="card p-4 mb-4">
          <h5 className="text-lg font-semibold">Transactions</h5>
          {transactions.length === 0 && !loading ? (
            <p className="text-gray-500">
              Select the filters and click apply to filter the transactions
            </p>
          ) : (
            ''
          )}

          {loading ? (
            <div className="my-10 flex justify-center items-center">
              <Loader size={40} className="animation-spin " />
            </div>
          ) : (
            ''
          )}
          <div>
            {transactions.map((transaction) => {
              return <TransactionInfoCard
                key={transaction.id}
                title={transaction.name}
                icon={transaction.icon}
                date={moment(transaction.date).format('Do MMM YYYY')}
                amount={transaction.amount}
                type={type}
                hideDeleteBtn
              />
            })}
          </div>
        </div>
      </div>
    </Dashboard>
  )
}

export default Filter
