import HomeScreen from '@/screens/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import ProductDetail from '@/screens/ProductDetail';
import { Product } from '@/types/product';

export type RootStackParamList = {
  Home: undefined;
  Cart: undefined;
  Wishlist: undefined;
  ProductDetail: { product: Product }; 
};

const Stack = createNativeStackNavigator<any>();

export default function MainNavigation() {
  return (
    <Stack.Navigator initialRouteName='bottomTabs'  >
      <Stack.Screen 
        name='bottomTabs' 
        component={BottomTabNavigator} 
        options={{ headerShown: false }}
      />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      
    </Stack.Navigator>
  );
}