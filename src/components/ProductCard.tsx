// components/ProductCard.tsx
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Product } from '@/store/slices/productSlice';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../store/slices/wishlistSlice'
import { addToCart, updateQuantity } from '@/store/slices/cartSlice';
import { RootState } from '@/store/store';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const dispatch = useDispatch();
  const wishlist = useSelector((state: RootState) => state.wishlist.items);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const quantity = cartItems[product.id]?.quantity || 0;
  const isWishlisted = wishlist.some(item => item.id === product.id);

  const toggleWishlist = () => {
    if (isWishlisted) dispatch(removeFromWishlist(product.id));
    else dispatch(addToWishlist(product));
  };

  const increaseQty = () => dispatch(updateQuantity({ id: product.id, quantity: quantity + 1 }));
  const decreaseQty = () => {
    if (quantity === 1) dispatch(updateQuantity({ id: product.id, quantity: 0 }));
    else dispatch(updateQuantity({ id: product.id, quantity: quantity - 1 }));
  };

  return (
    <View className="flex-1 m-2 bg-white rounded-2xl p-3 shadow-md relative">
      <View className="relative items-center">
        <Image source={{ uri: product.image }} className="w-full h-32 mb-2" resizeMode="contain" />
        <TouchableOpacity className="absolute top-1 right-0 p-1" onPress={toggleWishlist}>
          <AntDesign name={isWishlisted ? 'heart' : 'hearto'} size={24} color="red" />
        </TouchableOpacity>
      </View>

      <Text className="text-sm font-semibold" numberOfLines={1}>{product.title}</Text>
      <View className='flex-row justify-between items-center'>
        <Text className="text-xs text-gray-500">{product.category}</Text>
        <Text className="text-xs font-semibold">⭐ {product.rating.rate}</Text>
      </View>
      <Text className="mt-1 font-bold text-base text-black">$ {product.price}</Text>

      <View className="mt-2">
        {quantity === 0 ? (
          <TouchableOpacity className="bg-black rounded-full py-2" onPress={() => dispatch(addToCart(product))}>
            <Text className="text-white text-center font-medium">Add to Cart</Text>
          </TouchableOpacity>
        ) : (
          <View className="flex-row items-center justify-between bg-gray-100 rounded-full px-3 py-2">
            <TouchableOpacity onPress={decreaseQty}>
              <Text className="text-2xl font-bold text-black">-</Text>
            </TouchableOpacity>
            <Text className="text-base font-semibold">{quantity}</Text>
            <TouchableOpacity onPress={increaseQty}>
              <Text className="text-2xl font-bold text-black">+</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}
