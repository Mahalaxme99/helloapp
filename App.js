import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserList from './src/UserList';
import LoginScreen from './src/Login';
import UserDetails from './src/UserDetails';
import Chatbot from './src/Chatbot';
import QA from './src/QA';

const Stack = createNativeStackNavigator();

function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="UserList"
        component={UserList}
        options={{
          headerShown: false,
        }}
      />
        <Stack.Screen
        name="UserDetails"
        component={UserDetails}
        options={{
          headerShown: false,
        }}
      />
       <Stack.Screen 
       name="Chatbot" 
       component={Chatbot} 
       options={{
        headerShown: false,
      }}/>
       <Stack.Screen 
       name="QA" 
       component={QA} 
       options={{
        headerShown: false,
      }}/>
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
}