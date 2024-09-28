import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Kiểu dữ liệu sản phẩm trong giỏ hàng
interface CartItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

// Tạo cart slice với các action
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += 1; // Nếu sản phẩm đã có trong giỏ, tăng số lượng
      } else {
        state.items.push({ ...action.payload, quantity: 1 }); // Nếu sản phẩm chưa có, thêm sản phẩm mới
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload); // Xóa sản phẩm khỏi giỏ hàng
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1; // Giảm số lượng nếu lớn hơn 1
      } else {
        state.items = state.items.filter((item) => item.id !== action.payload); // Xóa sản phẩm nếu số lượng bằng 1
      }
    },
    clearCart: (state) => {
      state.items = []; // Xóa toàn bộ giỏ hàng
    },
  },
});

export const { addToCart, removeFromCart, decreaseQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;