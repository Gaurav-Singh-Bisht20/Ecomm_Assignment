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
  },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
