import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { createOrder as createOrderApi, Order } from '@/api/ordersApi'

interface OrdersState {
  orders: Order[]
  loading: boolean
  error: string | null
}

const initialState: OrdersState = {
  orders: [],
  loading: false,
  error: null,
}

// Acción asíncrona para crear un pedido
export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (order: Order, { rejectWithValue }) => {
    try {
      const response = await createOrderApi(order)
      return response
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      }
      return rejectWithValue('Error desconocido al crear el pedido')
    }
  }
)

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrders: (state) => {
      state.orders = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createOrder.fulfilled, (state, action: PayloadAction<Order>) => {
        state.loading = false
        state.orders.push(action.payload)
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false
        state.error = (action.payload as string) || 'Error desconocido'
      })
  },
})

export const { clearOrders } = ordersSlice.actions
export default ordersSlice.reducer
