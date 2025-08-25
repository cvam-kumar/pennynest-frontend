import { Layers2, Pencil } from 'lucide-react'

const CategoryList = ({ categories, onEditCategory }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold">Category Sources</h4>
      </div>

      {categories && categories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group relative flex items-center gap-4 p-3"
            >
              <div className="w-12 h-12 flex items-center gap-4 justify-center text-xl text-gray-800">
                {category.icon ? (
                  <span className="text-2xl">
                    <img
                      src={category.icon}
                      alt={category.name}
                      className="h-5 w-5"
                    />
                  </span>
                ) : (
                  <Layers2 className="text-2xl" size={24} />
                )}
              </div>
              {/* category details  */}
              <div className="flex-1 flex items-center justify-between">
                {/* Category Name and type */}
                <div>
                  <p className="text-sm text-gray-700 font-medium">
                    {category.name}
                  </p>
                  <p className="text-xs text-gray-500">{category.type}</p>
                </div>
                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <button
                  onClick={() => onEditCategory(category)} 
                  className='text-gray-400 hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer'>
                    <Pencil size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No categories available.</p>
      )}
    </div>
  )
}
export default CategoryList
