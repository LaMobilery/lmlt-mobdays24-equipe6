import FontAwesome from "@expo/vector-icons/FontAwesome"
import { Link, Tabs } from "expo-router"
import React from "react"
import { Image, ImageSourcePropType, Pressable } from "react-native"

import { useClientOnlyValue } from "@/components/useClientOnlyValue"
import { useColorScheme } from "@/components/useColorScheme"
import Colors from "@/constants/Colors"

const TabBarIcon = ({
  source,
  color,
}: {
  source: ImageSourcePropType
  color?: string
}) => {
  return <Image source={source} style={{ tintColor: color }} />
}

export default function TabLayout() {
  const colorScheme = useColorScheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Discussion",
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              source={require("@/assets/logos/icon-discussion.png")}
              color={color}
            />
          ),
          headerRight: () => (
            <Link href="/info" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="planning"
        options={{
          title: "Planning",
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              source={require("@/assets/logos/icon-planning.png")}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="actions"
        options={{
          title: "Actions",
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              source={require("@/assets/logos/icon-actions.png")}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="setup"
        options={{
          title: "Setup",
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              source={require("@/assets/logos/icon-setup.png")}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  )
}
