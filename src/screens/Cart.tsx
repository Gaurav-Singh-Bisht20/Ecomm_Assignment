import { FlatList, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import ProductCard from '@/components/ProductCard';

export default function Cart() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <View className="flex-1 p-4 bg-gray-100">
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard product={item}  />
        )}
         contentContainerStyle={{ padding: 0 }}
        numColumns={2}
      />
      <Text className="text-xl font-bold text-right mt-4">Grand Total: ${total.toFixed(2)}</Text>
    </View>
  );
}
