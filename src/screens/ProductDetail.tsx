import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/MainNavigation';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, updateQuantity } from '@/store/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '@/store/slices/wishlistSlice';
import { AntDesign } from '@expo/vector-icons';
import { RootState } from '@/store/store';

type ProductDetailRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;

export default function ProductDetail() {
  const { params: { product } } = useRoute<ProductDetailRouteProp>();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const wishlist = useSelector((state: RootState) => state.wishlist.items);
  const cart = useSelector((state: RootState) => state.cart.items);
  const cartItem = cart.find(item => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;
  const isWishlisted = wishlist.some(item => item.id === product.id);

  const toggleWishlist = () => {
    isWishlisted
      ? dispatch(removeFromWishlist(product.id))
      : dispatch(addToWishlist(product));
  };

  const increaseQty = () => dispatch(updateQuantity({ id: product.id, quantity: quantity + 1 }));
  const decreaseQty = () => {
    if (quantity === 1) dispatch(updateQuantity({ id: product.id, quantity: 0 }));
    else dispatch(updateQuantity({ id: product.id, quantity: quantity - 1 }));
  };

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Image
        source={{ uri: product.image }}
        className="w-full h-80 mb-4"
        resizeMode="contain"
      />

      <TouchableOpacity className="absolute top-6 right-4" onPress={toggleWishlist}>
        <AntDesign name={isWishlisted ? 'heart' : 'hearto'} size={28} color="red" />
      </TouchableOpacity>

      <Text className="text-xl font-bold mb-1">{product.title}</Text>
      <Text className="text-lg text-black font-semibold mb-1">${product.price}</Text>
      <Text className="text-sm mb-4 text-gray-700">⭐ {product.rating.rate} | {product.category}</Text>

      {quantity === 0 ? (
        <TouchableOpacity
          className="bg-black rounded-full py-3 mb-4"
          onPress={() => dispatch(addToCart(product))}
        >
          <Text className="text-white text-center font-medium">Add to Cart</Text>
        </TouchableOpacity>
      ) : (
        <View className="flex-row items-center justify-between bg-gray-100 rounded-full px-4 py-2 mb-4">
          <TouchableOpacity onPress={decreaseQty}>
            <Text className="text-2xl font-bold text-black">-</Text>
          </TouchableOpacity>
          <Text className="text-base font-semibold">{quantity}</Text>
          <TouchableOpacity onPress={increaseQty}>
            <Text className="text-2xl font-bold text-black">+</Text>
          </TouchableOpacity>
        </View>
      )}
      {quantity > 0 && (
        <TouchableOpacity
          className="bg-black rounded-full py-3 mb-4"
          onPress={() => navigation.navigate('bottomTabs', { screen: 'Cart' })}
        >
          <Text className="text-white text-center font-medium">Go to Cart</Text>
        </TouchableOpacity>
      )}
      <Text className="text-base text-gray-800">{product.description}</Text>
    </ScrollView>
  );
}
