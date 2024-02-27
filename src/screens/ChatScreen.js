import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "react-native-paper";

export default function ChatScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <View style={{ flex: 1, marginTop: 10, marginHorizontal: 10 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 10,
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-back" size={30} color="#000" />
          </TouchableOpacity>
          <Text style={{ fontSize: 18, marginLeft: 10 }}>Inbox</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ padding: 10, marginTop: 20 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderRadius: 10,
                padding: 10,
              }}
            >
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center" }}
                onPress={() => navigation.navigate("Message")}
              >
                <Avatar.Image
                  source={require("../../assets/images/users/32.jpeg")}
                  size={60}
                />
                <View style={{ marginLeft: 10, flex: 1 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ fontSize: 14, flex: 1 }}>
                      Ambarish Sharma
                    </Text>
                    <Text style={{ fontSize: 14 }}>10-02-2020</Text>
                  </View>
                  <Text style={{ fontSize: 12 }}>
                    Aicic kya mast app hai bhai...
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ padding: 10, marginBottom: 20 }}>
            <View
              style={{
                borderRadius: 10,
                padding: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center" }}
                onPress={() => navigation.navigate("Message")}
              >
                <Avatar.Image
                  source={require("../../assets/images/users/35.jpeg")}
                  size={60}
                />
                <View style={{ marginLeft: 10, flex: 1 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ fontSize: 14, flex: 1 }}>
                      Md Monis
                    </Text>
                    <Text style={{ fontSize: 14 }}>16-02-2020</Text>
                  </View>
                  <Text style={{ fontSize: 12 }}>
                    Sir mera 2000 payment jaldi bhej do...
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
