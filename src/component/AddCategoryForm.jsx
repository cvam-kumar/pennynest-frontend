import { Loader } from 'lucide-react'
import EmojiPickerPopup from './EmojiPickerPopup'
import Input from './Input'
import { useEffect, useState } from 'react'

const AddCategoryForm = ({ onAddCategory, initialCategoryData, isEditing }) => {
  const [category, setCategory] = useState({
    name: '',
    type: 'income',
    icon: '',
  })

  const [isLoading, setIsLoading] = useState(false)

  const categoryTypeOptions = [
    { value: 'income', label: 'Income' },
    { value: 'expense', label: 'Expense' },
  ]

  const handleChange = (key, value) => {
    setCategory({ ...category, [key]: value })
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      await onAddCategory(category)
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }
  

  useEffect(() => {
    if (isEditing && initialCategoryData) {
      setCategory(initialCategoryData)
    } else {
      setCategory({
        name: '',
        type: 'income',
        icon: '',
      })
    }
  }, [isEditing, initialCategoryData])

  return (
    <div className="p-4">
      <EmojiPickerPopup
        icon={category.icon}
        onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
      />

      <Input
        value={category.name}
        onChange={({ target }) => handleChange('name', target.value)}
        label="Category Name"
        placeholder="e.g., Freelance, Salary, Groceries"
        type="text"
      />
      <Input
        value={category.type}
        onChange={({ target }) => handleChange('type', target.value)}
        label="Category Type"
        isSelect={true}
        options={categoryTypeOptions}
      />

      <div className="flex justify-end mt-6">
        <button
        className='submit-btn'
           type="button"
          disabled={isLoading}
          onClick={handleSubmit}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              {' '}
              <Loader className="animate-spin mr-2 w-4 h-4" />
              {isEditing ? 'Updating...' : 'Adding...'}
            </span>
          ) : (
            <>{isEditing ? 'Update Category' : 'Add Category'}</>
          )}
        </button>
      </div>
    </div>
  )
}
export default AddCategoryForm
