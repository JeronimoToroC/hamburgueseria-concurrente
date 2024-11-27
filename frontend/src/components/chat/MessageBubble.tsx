import React from 'react'

interface MessageBubbleProps {
  sender: 'client' | 'employee'
  text: string
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ sender, text }) => {
  const isClient = sender === 'client'

  return (
    <div className={`flex ${isClient ? 'justify-end' : 'justify-start'}`}>
      <div className="flex items-center space-x-3">
        {!isClient && (
          <img
            src="/Empleado.png"
            alt="Empleado"
            className="w-12 h-12 rounded-full"
          />
        )}
        <div
          className={`max-w-xs px-4 py-2 rounded-lg ${
            isClient ? 'bg-green-500 text-white' : 'bg-yellow-700 text-white'
          }`}
        >
          {text}
        </div>
        {isClient && (
          <img
            src="/Cliente.png"
            alt="Cliente"
            className="w-12 h-12 rounded-full"
          />
        )}
      </div>
    </div>
  )
}

export default MessageBubble
