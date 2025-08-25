import React, { useState, useEffect } from 'react'
import EmojiPickerPopup from './EmojiPickerPopup'
import Input from './Input'
import { Loader } from 'lucide-react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { offset } from '@floating-ui/dom'

const AddFinanceForm = ({ onAddFinance, categories, financeType }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [finance, setFinance] = useState({
    name: '',
    amount: '',
    date: '',
    categoryId: '',
    icon: '',
  })

  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }))

  const handleChange = (key, value) => {
    setFinance({ ...finance, [key]: value })
  }

  const handleAddFinance = async () => {
    setIsLoading(true)
    try {
      await onAddFinance(finance)
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (categories.length > 0 && !finance.categoryId) {
      setFinance((prev) => ({ ...prev, categoryId: categories[0].id }))
    }
  }, [categories, finance.categoryId])

  return (
    <div>
      <EmojiPickerPopup
        icon={finance.icon}
        onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
      />
      <Input
        value={finance.name}
        onChange={({ target }) => handleChange('name', target.value)}
        label={`${financeType} Source`}
        placeholder="Add finance like Salary, Freelance, Expense"
        type="text"
      />
      <Input
        value={finance.categoryId}
        onChange={({ target }) => handleChange('categoryId', target.value)}
        label="Category"
        isSelect={true}
        options={categoryOptions}
      />

      <Input
        value={finance.amount}
        onChange={({ target }) => handleChange('amount', target.value)}
        label="Amount"
        placeholder="e.g., 500.00"
        type="number"
      />

      <Input
        value={finance.date}
        onChange={({ target }) => handleChange('date', target.value)}
        label="Date"
        placeholder=""
        customInput={
          <DatePicker
            selected={finance.date}
            onChange={(date) => handleChange('date', date)}
            placeholderText="Select a date"
            popperPlacement="top-start"
            popperModifiers={[
              offset({ mainAxis: 8 }), // ✅ valid middleware
            ]}
            customInput={
              <input className="w-full bg-transparent outline-none border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:border-blue-500" />
            }
          />
        }
      />

      <div className="flex justify-end mt-4">
        <button
          className="submit-btn"
          onClick={handleAddFinance}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader className="animate-spin" size={16} /> Adding...
            </>
          ) : (
            `Add ${financeType}`
          )}
        </button>
      </div>
    </div>
  )
}
export default AddFinanceForm
