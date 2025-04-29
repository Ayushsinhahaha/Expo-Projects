import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import WebScreen from './components/WebScreen'; // new file you'll create
import WebScreen from './src/screens/WebScreen'
import HomeScreen from './src/screens/HomeScreen'

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Web" component={WebScreen} />
        </Stack.Navigator>
    )
}