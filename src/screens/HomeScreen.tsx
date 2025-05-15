import React, { useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { get } from '@/utils/api.utils';
import {  setProducts } from '@/store/slices/productSlice';
import { RootState } from '@/store/store';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types/product';

export default function HomeScreen() {
  const productsList = useSelector((state: RootState) => state.products.productsList);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProductList = async () => {
      const response = await get<Product[]>("/products");
      console.log("response of products api",response);
      dispatch(setProducts(response));
    };
    fetchProductList();
  }, []);

  return (
    <View className="flex-1 bg-gray-100 px-2 pt-2">
      <FlatList
        data={productsList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductCard product={item} />}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
