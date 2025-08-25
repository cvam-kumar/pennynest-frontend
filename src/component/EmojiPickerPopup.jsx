import EmojiPicker from 'emoji-picker-react'
import { Image, X } from 'lucide-react'
import React, { useState } from 'react'

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleEmojiClick = (emoji) => {
    onSelect(emoji?.imageUrl || "");
    setIsOpen(false)
  }

  return (
    <div className="flex flex-col md:flex-row items-start gap-5 mb-6">
      <div
        className="flex items-center gap-4 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div className="w-12 h-12 flex items-center justify-center bg-purple-50 text-purple-500 rounded-lg">
          {icon ? (
            <img src={icon} alt="Category Icon" className="h-12 w-12" />
          ) : (
            <Image />
          )}
        </div>
        <p>{icon ? 'Change Icon' : 'Pick Icon'}</p>
      </div>

      {isOpen && (
        <div className="relative">
          <button
            onClick={() => setIsOpen(false)}
            className="w-7 h-7 flex item-center justify-center bg-white border border-gray-200 rounded-full absolute -top-2 -right-2 z-10 cursor-pointer"
          >
            <X />
          </button>
          <EmojiPicker
            open={isOpen}
            onEmojiClick={(emoji) => handleEmojiClick(emoji)}
          />
        </div>
      )}
    </div>
  )
}
export default EmojiPickerPopup
