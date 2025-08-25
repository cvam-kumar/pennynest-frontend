import React, { useEffect } from 'react'
import Dashboard from '../component/Dashboard.jsx'
import { useUser } from '../hook/useUser.jsx'
import { axiosConfig } from '../util/axiosConfig.js'
import { API_ENDPOINTS } from '../util/apiEndpoints.js'
import toast from 'react-hot-toast'
import Modal from '../component/Modal.jsx'
import DeleteAlert from '../component/DeleteAlert.jsx'
import FinanceOverview from '../component/FinanceOverview.jsx'
import FinanceList from '../component/FinanceList.jsx'
import AddFinanceForm from '../component/AddFinanceForm.jsx'

const Income = () => {
  useUser()

  const [incomeData, setIncomeData] = React.useState([])
  const [categories, setCategories] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  const [openAddIncomeModal, setOpenAddIncomeModal] = React.useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = React.useState({
    show: false,
    data: null,
  })

  const fetchIncomeDetails = async () => {
    if (loading) return
    setLoading(true)

    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_INCOMES)
      if (response.status === 200) {
        // console.log('Income details fetched successfully:', response.data)
        setIncomeData(response.data)
        setLoading(false)
      }
    } catch (error) {
      console.error('Error fetching income details:', error)
      setLoading(false)
      toast.error('Failed to fetch income details. Please try again later.')
    }
  }

  //Fetch Categories for Income
  const fetchIncomeCategories = async () => {
    try {
      const response = await axiosConfig.get(
        API_ENDPOINTS.CATEGORY_BY_TYPE('income')
      )
      if (response.status === 200) {
        setCategories(response.data)
      }
    } catch (error) {
      console.error('Error fetching income categories:', error)
      toast.error('Failed to fetch income categories. Please try again later.')
    }
  }

  const handleAddIncome = async (income) => {
    const { name, amount, date, categoryId, icon } = income
    if (!name.trim()) {
      toast.error('Income source is required.')
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
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_INCOME, {
        name,
        amount: Number(amount),
        date,
        categoryId,
        icon,
      })

      if (response.status === 201) {
        toast.success('Income added successfully.')
        setOpenAddIncomeModal(false)
        fetchIncomeDetails()
        fetchIncomeCategories()
      }
    } catch (error) {
      console.error('Error in adding income:', error)
      toast.error('Failed to add income. Please try again later.')
    }
  }

  //delete income details
  const deleteIncome = async (incomeId) => {
    if (!incomeId) {
      toast.error('Invalid income ID.')
      return
    }
    try {
      await axiosConfig.delete(API_ENDPOINTS.DELETE_INCOME(incomeId))
      setOpenDeleteAlert({ show: false, data: null })
      toast.success('Income deleted successfully.')
      fetchIncomeDetails()
    } catch (error) {
      console.error('Error deleting income:', error)
      toast.error('Failed to delete income. Please try again later.')
    }
  }

  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await axiosConfig.get(
        API_ENDPOINTS.INCOME_EXCEL_DOWNLOAD,
        { responseType: 'blob' }
      ) // responseType: 'blob' => tells Axios to treat the response as binary data, not JSON — crucial for file downloads.
      const date = new Date()
      const month = date.toLocaleString('default', { month: 'long' })
      const filename = `income_${month}_${date.getFullYear()}.xlsx`
      const url = window.URL.createObjectURL(new Blob([response.data])) //Wraps the binary data (response.data) in a Blob, which represents a file-like object.
      //createObjectURL creates a temporary URL pointing to that blob — like a virtual file.
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', filename) //Sets its href to the blob URL and adds a download attribute so the browser knows to download it instead of navigating to it.
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
      window.URL.revokeObjectURL(url) //Frees up memory by revoking the temporary blob URL.
      toast.success('Downloaded income details successfully')
    } catch (error) {
      console.error('Error downloading income details:', error)
      toast.error(
        error?.response?.data?.message ||
          'Failed to download income details. Please try again later.'
      )
    }
  }

  const handleEmailIncomeDetails = async () => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.EMAIL_INCOME_EXCEL)
      if (response.status === 200) {
        toast.success('Income details emailed successfully.')
      }
    } catch (error) {
      console.error('Error emailing income details:', error)
      toast.error(
        error?.response?.data?.message ||
          'Failed to email income details. Please try again later.'
      )
    }
  }

  useEffect(() => {
    fetchIncomeDetails()
    fetchIncomeCategories()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Dashboard activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div>
            {/* overview for income with line char */}
            <FinanceOverview
              financeType="Income"
              transactions={incomeData}
              onAddFinance={() => setOpenAddIncomeModal(true)}
            />
          </div>
          <FinanceList
          financeType="Income"
            transactions={incomeData}
            onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
            onDownload={handleDownloadIncomeDetails}
            onEmail={handleEmailIncomeDetails}
          />

          {/* Add Income Modal */}
          <Modal
            isOpen={openAddIncomeModal}
            onClose={() => setOpenAddIncomeModal(false)}
            title="Add Income"
          >
            <AddFinanceForm
              onAddFinance={handleAddIncome}
              categories={categories}
              financeType="Income"
            />
          </Modal>

          {/* Delete Income Modal */}
          <Modal
            isOpen={openDeleteAlert.show}
            onClose={() => setOpenDeleteAlert({ show: false, data: null })}
            title="Delete Income"
          >
            <DeleteAlert
              content="Are you sure want to delete this income details?"
              onDelete={() => deleteIncome(openDeleteAlert.data)}
            />
          </Modal>
        </div>
      </div>
    </Dashboard>
  )
}

export default Income
