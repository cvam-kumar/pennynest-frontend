import { Loader } from 'lucide-react'
import React from 'react'

const DeleteAlert = ({ content, onDelete }) => {
  const [loading, setLoading] = React.useState(false)

  const handleDelete = async () => {
    setLoading(true)
    try {
      await onDelete()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <p className="text-sm">{content}</p>
      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="delete-btn"
          onClick={handleDelete}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader className="animate-spin" />
              Deleting...
            </>
          ) : (
            'Delete'
          )}
        </button>
      </div>
    </div>
  )
}
export default DeleteAlert
