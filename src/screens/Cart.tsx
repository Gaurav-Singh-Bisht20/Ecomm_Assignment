import { FlatList, Text, View, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import CartItemCard from '@/components/CartItemCard';
import { useNavigation } from '@react-navigation/native';

export default function Cart() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const navigation = useNavigation();
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-lg font-semibold mb-4">Your cart is empty!</Text>
        <TouchableOpacity
          className="bg-black px-5 py-3 rounded-full"
          onPress={() => navigation.navigate('Home')}
        >
          <Text className="text-white font-medium">Go to Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100 p-3">
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CartItemCard product={item} quantity={item.quantity} />
        )}
        ListFooterComponent={
          <View className="mt-4 p-4 bg-white rounded-lg shadow-sm flex-row justify-between items-center">
            <Text className="text-lg font-semibold">Grand Total:</Text>
            <Text className="text-xl font-bold text-black">${total.toFixed(2)}</Text>
          </View>
        }
      />
    </View>
  );
}
