import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface ProductBubbleProps {
  avatar: string // Ruta al avatar del producto
  label: string // Nombre del producto (ej. "Hamburguesas" o "Bebidas")
  value: number // Cantidad seleccionada
  onIncrement: () => void // Función para incrementar la cantidad
  onDecrement: () => void // Función para decrementar la cantidad
}

const ProductBubble: React.FC<ProductBubbleProps> = ({
  avatar,
  label,
  value,
  onIncrement,
  onDecrement,
}) => {
  return (
    <div className="flex items-center justify-between p-3  text-white rounded-lg border-b-2 border-yellow-800  mt-2">
      {/* Avatar y nombre del producto */}
      <div className="flex items-center gap-2 mr-2">
        <img src={avatar} alt={label} className="w-10 h-10 rounded-full" />
        <p className="text-sm font-bold">{label}</p>
      </div>

      {/* Controles del contador */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          className="w-8 h-8 bg-gray-700 text-white border-gray-500 hover:bg-gray-600"
          onClick={onDecrement}
        >
          -
        </Button>
        <Input
          type="number"
          value={value}
          readOnly
          className="w-12 text-center text-black bg-gray-100"
        />
        <Button
          variant="outline"
          className="w-8 h-8 bg-gray-700 text-white border-gray-500 hover:bg-gray-600"
          onClick={onIncrement}
        >
          +
        </Button>
      </div>
    </div>
  )
}

export default ProductBubble
