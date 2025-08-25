import toast from 'react-hot-toast'
import Dashboard from '../component/Dashboard.jsx'
import { useUser } from '../hook/useUser.jsx'
import { axiosConfig } from '../util/axiosConfig.js'
import { API_ENDPOINTS } from '../util/apiEndpoints.js'
import React, { useEffect } from 'react'
import FinanceOverview from '../component/FinanceOverview.jsx'
import AddFinanceForm from '../component/AddFinanceForm.jsx'
import FinanceList from '../component/FinanceList.jsx'
import Modal from '../component/Modal.jsx'
import DeleteAlert from '../component/DeleteAlert.jsx'

const Expense = () => {
  useUser()

  const [expenseData, setExpenseData] = React.useState([])
  const [categories, setCategories] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  const [openAddExpenseModal, setOpenAddExpenseModal] = React.useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = React.useState({
    show: false,
    data: null,
  })

  const fetchExpenseDetails = async () => {
    if (loading) return
    setLoading(true)

    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_EXPENSES)
      if (response.status === 200) {
        // console.log('Expense details fetched successfully:', response.data)
        setExpenseData(response.data)
        setLoading(false)
      }
    } catch (error) {
      console.error('Error fetching expense details:', error)
      setLoading(false)
      toast.error('Failed to fetch expense details. Please try again later.')
    }
  }

  //Fetch Categories for Expense
  const fetchExpenseCategories = async () => {
    try {
      const response = await axiosConfig.get(
        API_ENDPOINTS.CATEGORY_BY_TYPE('expense')
      )
      if (response.status === 200) {
        setCategories(response.data)
      }
    } catch (error) {
      console.error('Error fetching expense categories:', error)
      toast.error('Failed to fetch expense categories. Please try again later.')
    }
  }

  const handleAddExpense = async (expense) => {
    const { name, amount, date, categoryId, icon } = expense
    if (!name.trim()) {
      toast.error('Expense source is required.')
      return
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error('Amount must be a valid number greater than 0.')
      return
    }
    if (!date) {
      toast.error('Date is required.')
      return
    }

    const todayDate = new Date().toISOString().split('T')[0]
    if (date > todayDate) {
      toast.error('Date cannot be in the future.')
      return
    }

    if (!categoryId) {
      toast.error('Category is required.')
      return
    }

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_EXPENSE, {
        name,
        amount: Number(amount),
        date,
        categoryId,
        icon,
      })

      if (response.status === 201) {
        toast.success('Expense added successfully.')
        setOpenAddExpenseModal(false)
        fetchExpenseDetails()
        fetchExpenseCategories()
      }
    } catch (error) {
      console.error('Error in adding expense:', error)
      toast.error('Failed to add expense. Please try again later.')
    }
  }

  //delete income details
  const deleteExpense = async (expenseId) => {
    if (!expenseId) {
      toast.error('Invalid Expense ID.')
      return
    }
    try {
      await axiosConfig.delete(API_ENDPOINTS.DELETE_EXPENSE(expenseId))
      setOpenDeleteAlert({ show: false, data: null })
      toast.success('Expense deleted successfully.')
      fetchExpenseDetails()
    } catch (error) {
      console.error('Error deleting expense:', error)
      toast.error('Failed to delete expense. Please try again later.')
    }
  }

  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosConfig.get(
        API_ENDPOINTS.EXPENSE_EXCEL_DOWNLOAD,
        { responseType: 'blob' }
      ) // responseType: 'blob' => tells Axios to treat the response as binary data, not JSON — crucial for file downloads.
      const date = new Date()
      const month = date.toLocaleString('default', { month: 'long' })
      const filename = `expense_${month}_${date.getFullYear()}.xlsx`
      const url = window.URL.createObjectURL(new Blob([response.data])) //Wraps the binary data (response.data) in a Blob, which represents a file-like object.
      //createObjectURL creates a temporary URL pointing to that blob — like a virtual file.
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', filename) //Sets its href to the blob URL and adds a download attribute so the browser knows to download it instead of navigating to it.
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
      window.URL.revokeObjectURL(url) //Frees up memory by revoking the temporary blob URL.
      toast.success('Downloaded expense details successfully')
    } catch (error) {
      console.error('Error downloading expense details:', error)
      toast.error(
        error?.response?.data?.message ||
          'Failed to download expense details. Please try again later.'
      )
    }
  }

  const handleEmailExpenseDetails = async () => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.EMAIL_EXPENSE_EXCEL)
      if (response.status === 200) {
        toast.success('Expense details emailed successfully.')
      }
    } catch (error) {
      console.error('Error emailing expense details:', error)
      toast.error(
        error?.response?.data?.message ||
          'Failed to email expense details. Please try again later.'
      )
    }
  }

  useEffect(() => {
    fetchExpenseDetails()
    fetchExpenseCategories()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Dashboard activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div>
            {/* overview for expense with line char */}
            <FinanceOverview
              financeType="Expense"
              transactions={expenseData}
              onAddFinance={() => setOpenAddExpenseModal(true)}
            />
          </div>
          <FinanceList
            financeType="Expense"
            transactions={expenseData}
            onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
            onDownload={handleDownloadExpenseDetails}
            onEmail={handleEmailExpenseDetails}
          />

          {/* Add Expense Modal */}
          <Modal
            isOpen={openAddExpenseModal}
            onClose={() => setOpenAddExpenseModal(false)}
            title="Add Expense"
          >
            <AddFinanceForm
              onAddFinance={handleAddExpense}
              categories={categories}
              financeType="Expense"
            />
          </Modal>

          {/* Delete Expense Modal */}
          <Modal
            isOpen={openDeleteAlert.show}
            onClose={() => setOpenDeleteAlert({ show: false, data: null })}
            title="Delete Expense"
          >
            <DeleteAlert
              content="Are you sure want to delete this expense details?"
              onDelete={() => deleteExpense(openDeleteAlert.data)}
            />
          </Modal>
        </div>
      </div>
    </Dashboard>
  )
}

export default Expense
