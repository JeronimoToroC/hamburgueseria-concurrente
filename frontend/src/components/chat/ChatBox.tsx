import React, { useState } from 'react'
import MessageBubble from './MessageBubble'
import OrderForm from './OrderForm'
import api from '@/utils/api'

interface Message {
  id: string
  sender: 'employee' | 'client'
  type?: 'text' | 'form'
  text?: string
}

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'client',
      type: 'text',
      text: 'Hola, me gustaría ordenar.',
    },
    {
      id: '2',
      sender: 'employee',
      type: 'text',
      text: 'Bienvenido a hamburguesas FastAPI, ¿qué va a ordenar?',
    },
    { id: '3', sender: 'employee', type: 'form' },
  ])

  const handleOrder = async (hamburgers: number, drinks: number) => {
    const clientMessageId = (messages.length + 1).toString()
    const preparingMessageId = (messages.length + 2).toString()

    // Mensaje del cliente con su pedido
    const clientMessage: Message = {
      id: clientMessageId,
      sender: 'client',
      type: 'text',
      text: `Quiero ordenar ${hamburgers} hamburguesa(s) y ${drinks} bebida(s).`,
    }

    // Mensaje del empleado indicando que el pedido se está preparando
    const preparingMessage: Message = {
      id: preparingMessageId,
      sender: 'employee',
      type: 'text',
      text: 'El pedido se está preparando...',
    }

    setMessages((prev) => [...prev, clientMessage])

    try {
      // Enviar pedido al backend
      const orders = [
        ...Array(hamburgers)
          .fill(null)
          .map((_, index) => ({ id: index + 1, type: 'hamburguesa' })),
        ...Array(drinks)
          .fill(null)
          .map((_, index) => ({ id: hamburgers + index + 1, type: 'bebida' })),
      ]

      const response = await api.post('/pedidos/', orders)

      if (response.status === 200) {
        const pedidoId = response.data.id
        setMessages((prev) => [...prev, preparingMessage])

        // Polling para verificar el estado del pedido
        const interval = setInterval(async () => {
          const statusResponse = await api.get(`/pedidos/${pedidoId}/estado/`)
          if (statusResponse.data.status === 'listo') {
            const completedMessageId = (
              parseInt(preparingMessageId) + 1
            ).toString()
            const completedMessage: Message = {
              id: completedMessageId,
              sender: 'employee',
              type: 'text',
              text: 'Su orden está lista, ¡que disfrute su comida!',
            }
            setMessages((prev) => [...prev, completedMessage])
            clearInterval(interval) // Detener el polling
          }
        }, 3000) // Consultar cada 3 segundos
      } else {
        const errorMessageId = (messages.length + 3).toString()
        const errorMessage: Message = {
          id: errorMessageId,
          sender: 'employee',
          type: 'text',
          text: 'Hubo un problema al procesar su pedido. Por favor, intente nuevamente.',
        }
        setMessages((prev) => [...prev, errorMessage])
      }
    } catch (error) {
      console.error('Error al conectar con el servidor:', error)
      const errorMessageId = (messages.length + 3).toString()
      const errorMessage: Message = {
        id: errorMessageId,
        sender: 'employee',
        type: 'text',
        text: 'Error al conectar con el servidor. Intente más tarde.',
      }
      setMessages((prev) => [...prev, errorMessage])
    }
  }

  const handleInvalidOrder = () => {
    const invalidMessageId = (messages.length + 1).toString()
    const formMessageId = (messages.length + 2).toString()

    const employeeMessage: Message = {
      id: invalidMessageId,
      sender: 'employee',
      type: 'text',
      text: 'Por favor, agrega al menos un producto para continuar.',
    }

    const formMessage: Message = {
      id: formMessageId,
      sender: 'employee',
      type: 'form',
    }

    setMessages((prev) => [...prev, employeeMessage, formMessage])
  }

  return (
    <div className="flex flex-col w-[750px] mx-auto h-[600px] bg-zinc-700 text-white rounded-lg shadow-lg overflow-hidden">
      <div className="flex-1 p-6 overflow-y-auto space-y-4">
        {messages.map((message) => {
          if (message.type === 'text') {
            return (
              <MessageBubble
                key={message.id}
                sender={message.sender}
                text={message.text ?? ''}
              />
            )
          }
          if (message.type === 'form') {
            return (
              <div key={message.id} className="flex items-start">
                <div className="ml-[60px]">
                  <OrderForm
                    onSubmit={handleOrder}
                    onInvalidOrder={handleInvalidOrder}
                  />
                </div>
              </div>
            )
          }
          return null
        })}
      </div>
    </div>
  )
}

export default ChatBox
