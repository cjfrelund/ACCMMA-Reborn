import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { AuthProvider } from "./providers/AuthProvider";
import { RecordsProvider } from "./providers/RecordsProvider";

import { WelcomeView } from "./views/WelcomeView";
import { OrganizationsView } from "./views/OrganizationsView";
import { RecordsView } from "./views/RecordsView";

import { Logout } from "./components/Logout";

const Stack = createStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Welcome View"
            component={WelcomeView}
            options={{ title: "ACCMMA", headerShown: false }}

          />
          <Stack.Screen
            name="Organizations"
            component={OrganizationsView}
            title="Organization"
            headerBackTitle="log out"
            options={{
              headerLeft: null,
            }}
          />
          <Stack.Screen name="Record List">
            {(props) => {
              const { navigation, route } = props;
              const { user, organizationPartition } = route.params;
              return (
                <RecordsProvider user={user} organizationPartition={organizationPartition}>
                  <RecordsView navigation={navigation} route={route} />
                </RecordsProvider>
              );
            }}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
