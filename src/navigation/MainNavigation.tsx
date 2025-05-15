import HomeScreen from '@/screens/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';


const Stack = createNativeStackNavigator<any>();

export default function MainNavigation() {
  return (
    <Stack.Navigator initialRouteName='bottomTabs'  >
      <Stack.Screen 
        name='bottomTabs' 
        component={BottomTabNavigator} 
        options={{ headerShown: false }}
      />
      
    </Stack.Navigator>
  );
}