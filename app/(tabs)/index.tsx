import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabOneScreen() {
  return (
    <View  className=' flex-1 content-center items-center text-black'>
      <SafeAreaView>
        <Text>Index screen</Text>
      </SafeAreaView>
      
    </View>
  );
}

