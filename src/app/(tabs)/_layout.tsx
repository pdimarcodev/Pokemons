import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { useColorScheme } from "@/components/useColorScheme.web";
import Colors from "@/constants/Colors";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { Image } from "react-native";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      initialRouteName="(pokemons)"
      sceneContainerStyle={{ backgroundColor: "#111111" }}
      screenOptions={{
        tabBarActiveTintColor: "#ee1515",
        headerShown: useClientOnlyValue(false, true),
        headerStyle: {
          backgroundColor: "#111111",
          borderBottomWidth: 0,
          shadowOpacity: 0.75,
          shadowRadius: 5,
          shadowColor: "grey",
          shadowOffset: { height: 3, width: 0 },
          elevation: 5,
        },
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 20,
          color: "white",
        },
        tabBarStyle: {
          backgroundColor: "#111111",
          borderTopWidth: 0,
          shadowOpacity: 0.75,
          shadowRadius: 5,
          shadowColor: "grey",
          shadowOffset: { height: -3, width: 0 },
          elevation: 5,
        },
      }}
    >
      <Tabs.Screen
        name="(pokemons)"
        options={{
          title: "Pokemons",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="circle-o-notch" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(favorites)"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="heart-o" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
