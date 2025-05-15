import { AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "@/screens/HomeScreen";
import WishList from "@/screens/WishList";
import Cart from "@/screens/Cart";
import Categories from "@/screens/Categories";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
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

          return <AntDesign name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#ff4d4f',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name='Home' component={HomeScreen} />
      <Tab.Screen name="WishList" component={WishList} />
      {/* <Tab.Screen name="Categories" component={Categories} /> */}
       <Tab.Screen name="Cart" component={Cart} />
    </Tab.Navigator>
  );
}
