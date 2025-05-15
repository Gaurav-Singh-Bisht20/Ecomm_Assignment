import { AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "@/screens/HomeScreen";
import WishList from "@/screens/WishList";
import Cart from "@/screens/Cart";
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Text, View } from 'react-native';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const totalCartQuantity = useSelector((state: RootState) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'WishList') {
            iconName = 'hearto';
          } else if (route.name === 'Cart') {
            iconName = 'shoppingcart';
          } 

          if (route.name === 'Cart') {
            return (
              <View style={{ width: 24, height: 24, margin: 5 }}>
                <AntDesign name={iconName} size={size} color={color} />
                {totalCartQuantity > 0 && (
                  <View
                    style={{
                      position: 'absolute',
                      right: -6,
                      top: -3,
                      backgroundColor: 'red',
                      borderRadius: 8,
                      width: 16,
                      height: 16,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
                      {totalCartQuantity}
                    </Text>
                  </View>
                )}
              </View>
            );
          }

          return <AntDesign name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#ff4d4f',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name='Home' component={HomeScreen} />
      <Tab.Screen name="WishList" component={WishList} />
       <Tab.Screen name="Cart" component={Cart} />
    </Tab.Navigator>
  );
}
