import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const cars = [
    {
      id: 1,
      title: "BMW M3 Competition",
      subtitle: "Pure driving perfection",
      image:
        "https://images.unsplash.com/photo-1616455263449-0bd3aac04029?q=80&w=687&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Audi RS7",
      subtitle: "Luxury meets performance",
      image:
        "https://images.unsplash.com/photo-1540066019607-e5f69323a8dc?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      title: "Mercedes-AMG GT",
      subtitle: "Engineering excellence",
      image:
        "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 4,
      title: "Volkswagen Golf R",
      subtitle: "The ultimate hot hatch",
      image:
        "https://images.unsplash.com/photo-1718629879998-ee8cfc09df39?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="px-6 py-4 bg-white border-b border-gray-200">
        <Text className="text-2xl font-semibold text-gray-900">Autohub</Text>
        <Text className="text-sm text-gray-500 mt-1">
          Discover amazing cars
        </Text>
      </View>

      {/* Scrollable content */}
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {cars.map((car) => (
          <View
            key={car.id}
            className="bg-white rounded-2xl overflow-hidden shadow-sm mb-5"
          >
            <Image
              source={{ uri: car.image }}
              className="w-full h-56"
              resizeMode="cover"
            />
            <View className="p-4">
              <Text className="text-xl font-bold text-gray-900">
                {car.title}
              </Text>
              <Text className="text-sm text-gray-600 mt-1">{car.subtitle}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
