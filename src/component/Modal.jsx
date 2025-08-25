import { X } from 'lucide-react'

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full overflow-hidden bg-black/40 backdrop-blur-sm">
      <div className="relative p-4 w-full max-w-2xl max-h-[90vh]">
        {/* Modal Header  */}
        <div className="relative bg-white rounded-xl shadow-2xl border border-gray-100">
          <div className="flex items-center justify-between p-5 md:p-6 border-b border-gray-100 rounded-t-xl">
            <h3 className="font-semibold text-xl text-gray-800">{title}</h3>
            <button
              type="button"
              className="text-gray-500 bg-gray-50 hover:text-red-700 rounded-lg text-sm w-9 h-9 flex items-center justify-center transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              <X className="w-4 h-4" onClick={onClose} />
            </button>
          </div>
          {/* Modal Body  */}
          <div className="p-5 md:p-6 text-gray-700">{children}</div>
        </div>
      </div>
    </div>
  )
}
export default Modal
