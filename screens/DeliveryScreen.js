import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { selectedRestaurantItems } from '../features/restaurantSlice';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { XMarkIcon } from 'react-native-heroicons/solid';
import * as Progress from 'react-native-progress';
import MapView, { Marker } from 'react-native-maps';

const DeliveryScreen = () => {
	const navigate = useNavigation();
	const restaurant = useSelector(selectedRestaurantItems);

  return (
    <View className="bg-[#00ccbb] flex-1">
      <SafeAreaView>
				<View className="flex-row justify-between items-center p-5">
					<TouchableOpacity onPress={() => navigate.navigate("Home")} className="flex-row items-center">
						<XMarkIcon color="white" size={30} /> 
					</TouchableOpacity>
					<Text className="font-light text-white text-lg">Order help</Text>
				</View>

				<View  className="bg-white  mx-5 my-2 rounded-lg p-6 z-50 shadow-md">
					<View className="flex-row justify-between">
						<View>
							<Text className="text-lg text-gray-400">Estimated Arrival</Text>
							<Text className="text-4xl font-bold">20-30 Minutes</Text>
						</View>
						<Image 
							source={{ uri: "https://links.papareact.com/fls" }}
							className="w-20 h-20"
						/>
					</View>

					<Progress.Bar size={30} color="#00ccbb" indeterminate={true} />

					<Text className="mt-3  text-gray-500">
						Your order at {restaurant.title} is being prepared.
					</Text>
				</View>
			</SafeAreaView>

			<MapView
				initialRegion={{
					latitude: restaurant.lat,
					longitude: restaurant.long,
					latitudeDelta: 0.005,
					longitudeDelta: 0.005,
				}}
				className="flex-1 mt-[-40px] z-10"
				mapType='mutedStandard'
			>
				<Marker
					coordinate={{
						latitude: restaurant.lat,
						longitude: restaurant.long,
					}}
					title={restaurant.title}
					description={restaurant.short_description}
					identifier="restaurant"
					pinColor='#00ccbb'
				/>
			</MapView>
    </View>
  )
}

export default DeliveryScreen