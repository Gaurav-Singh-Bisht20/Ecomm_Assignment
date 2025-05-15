import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from '@/store/slices/cartSlice';
import { Product } from '@/types/product';
import { useNavigation } from '@react-navigation/native';

interface Props {
  product: Product;
  quantity: number;
}

export default function CartItemCard({ product, quantity }: Props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const increaseQty = () =>
    dispatch(updateQuantity({ id: product.id, quantity: quantity + 1 }));

  const decreaseQty = () => {
    if (quantity === 1) {
      dispatch(removeFromCart(product.id));
    } else {
      dispatch(updateQuantity({ id: product.id, quantity: quantity - 1 }));
    }
  };

  const removeItem = () => dispatch(removeFromCart(product.id));

  return (
    <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { product })} className="flex-row bg-white p-3 m-2 rounded-xl shadow-md items-center"  >
      <Image
        source={{ uri: product.image }}
        className="w-24 h-24 rounded-md"
        resizeMode="contain"
      />

      <View className="flex-1 ml-4">
        <Text className="font-semibold text-base" numberOfLines={1}>{product.title}</Text>
        <Text className="text-gray-500 text-sm">{product.category}</Text>
        <Text className="font-bold text-black text-base mt-1">$ {product.price}</Text>
        <Text className="text-sm mt-0.5">⭐ {product.rating.rate}</Text>

        <View className="flex-row items-center mt-2 ">
          <TouchableOpacity onPress={decreaseQty} className="p-1">
            <Feather name="minus-circle" size={22} color="black" />
          </TouchableOpacity>
          <Text className="text-base font-medium mx-2">{quantity}</Text>
          <TouchableOpacity onPress={increaseQty} className="p-1">
            <Feather name="plus-circle" size={22} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity onPress={removeItem} className="ml-2">
        <AntDesign name="delete" size={24} color="red" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
