// slices/productSlice.ts
import { Product } from '@/types/product';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';



const initialState ={
 productsList: [] as Product[],
}

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
       state.productsList = action.payload;
        },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.productsList.push(action.payload);
    },
  },
});

export const { setProducts, addProduct } = productSlice.actions;
export default productSlice.reducer;
