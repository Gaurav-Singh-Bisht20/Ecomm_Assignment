// screens/WishList.tsx
import { FlatList, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import ProductCard from '@/components/ProductCard';

export default function WishList() {
  const wishlist = useSelector((state: RootState) => state.wishlist.items)

  return (
    <View className="bg-gray-100">
    <FlatList
      data={wishlist}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      contentContainerStyle={{ padding: 10 }}
      renderItem={({ item }) => <ProductCard product={item} />}
    />
    </View>
  );
}
