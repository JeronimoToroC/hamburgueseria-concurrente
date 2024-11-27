import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import ProductBubble from './ProductBubble'
import api from '@/utils/api'

interface OrderFormProps {
  onSubmit: (hamburgers: number, drinks: number) => void
  onInvalidOrder: () => void
}

const OrderForm: React.FC<OrderFormProps> = ({ onSubmit, onInvalidOrder }) => {
  const [hamburgers, setHamburgers] = useState<number>(0)
  const [drinks, setDrinks] = useState<number>(0)

  const incrementHamburgers = () => setHamburgers((prev) => prev + 1)
  const decrementHamburgers = () =>
    setHamburgers((prev) => (prev > 0 ? prev - 1 : 0))

  const incrementDrinks = () => setDrinks((prev) => prev + 1)
  const decrementDrinks = () => setDrinks((prev) => (prev > 0 ? prev - 1 : 0))

  const handleSubmit = async () => {
    if (hamburgers === 0 && drinks === 0) {
      onInvalidOrder()
      return
    }

    const orders = [
      ...Array(hamburgers)
        .fill(null)
        .map((_, index) => ({
          id: index + 1,
          type: 'hamburguesa',
        })),
      ...Array(drinks)
        .fill(null)
        .map((_, index) => ({
          id: hamburgers + index + 1,
          type: 'bebida',
        })),
    ]

    try {
      const response = await api.post('/pedidos/', orders)

      if (response.status === 200) {
        onSubmit(hamburgers, drinks)
      } else {
        console.error('Hubo un problema al enviar el pedido')
      }
    } catch (error) {
      console.error('Error al conectar con el servidor:', error) // Mostrar detalles del error
    }
  }

  return (
    <Card className="bg-yellow-700 text-white border-yellow-700 shadow-lg w-full">
      <CardContent className="space-y-4">
        <ProductBubble
          avatar="/hamburguesa.png"
          label="Hamburguesas"
          value={hamburgers}
          onIncrement={incrementHamburgers}
          onDecrement={decrementHamburgers}
        />
        <ProductBubble
          avatar="/Bebidas.png"
          label="Bebidas"
          value={drinks}
          onIncrement={incrementDrinks}
          onDecrement={decrementDrinks}
        />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          className="bg-red-200 text-red-700 border-2 border-red-700 rounded-lg hover:bg-red-300"
          onClick={onInvalidOrder}
        >
          Cancelar
        </Button>
        <Button
          className="bg-green-200 text-green-700 border-2 border-green-700 rounded-lg hover:bg-green-300"
          onClick={handleSubmit}
        >
          Ordenar
        </Button>
      </CardFooter>
    </Card>
  )
}

export default OrderForm
