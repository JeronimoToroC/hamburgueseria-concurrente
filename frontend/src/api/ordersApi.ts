import api from './axiosConfig'

export interface Order {
  id: number
  type: string
}

export const createOrder = async (order: Order): Promise<Order> => {
  try {
    const response = await api.post<Order>('/pedidos/', order)
    return response.data
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error al crear el pedido:', error.message)
      throw new Error(
        'No se pudo crear el pedido. Por favor, inténtalo de nuevo.'
      )
    }
    throw new Error('Ocurrió un error desconocido al crear el pedido.')
  }
}
