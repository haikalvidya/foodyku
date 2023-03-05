import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { selectedRestaurantItems } from '../features/restaurantSlice';
import { removeFromBasket, selectedBasketItems, selectedBasketTotal } from '../features/basketSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import { XCircleIcon } from 'react-native-heroicons/solid';
import Currency from 'react-currency-formatter';


const BasketScreen = () => {
	const navigation = useNavigation();
	const restaurant = useSelector(selectedRestaurantItems);
	const items = useSelector(selectedBasketItems);
	const basketTotal = useSelector(selectedBasketTotal);
	const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
	const dispatch = useDispatch();

	useEffect(() => {
		const groupedItems = items.reduce((results, item) => {
			(results[item.id] = results[item.id] || []).push(item);
			return results;
		}, {});

		setGroupedItemsInBasket(groupedItems);
	}, [items]);

  return (
    <SafeAreaView className="pt-[-50px] flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
				<View className="p-5 border-b border-[$00CCBB] bg-white shadow-xl">
					<View>
						<Text className="text-lg font-bold text-center">Basket</Text>
						<Text className="text-center text-gray-400">{restaurant.title}</Text>
					</View>

					<TouchableOpacity
						onPress={navigation.goBack}
						className="bg-gray-100 rounded-full absolute right-5 top-3"
					>
						<XCircleIcon color="#00CCBB" height={50} width={50} />
					</TouchableOpacity>
				</View>

				<View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
					<Image source={{ uri: "https://links.papareact.com/wru" }} className="w-7 h-7 bg-gray-300 rounded-full" />
					<Text className="flex-1">Deliver in 30-40 min</Text>
					<TouchableOpacity>
						<Text className="text-[$00CCBB] font-thin">Change</Text>
					</TouchableOpacity>
				</View>

				<ScrollView className="divide-y divide-gray-200">
					{Object.entries(groupedItemsInBasket).map(([key, items]) => {
						let imgUrl = items[0]?.image.replace("image-", "")
						imgUrl = imgUrl.replace("-png", ".png")
						imgUrl = imgUrl.replace("-jpg", ".jpg")
					return (
						<View className="flex-row  items-center space-x-3 px-5 py-2 bg-white" key={key}>
							<Text className="text-[#00CCBB]">{items.length} x</Text>
							<Image 
								source={{ uri: "https://cdn.sanity.io/images/jer47mrm/production/" + imgUrl }}
								className="w-12 h-12 rounded-full"
							/>
							<Text className="flex-1">{items[0]?.name}</Text>

							<Text className="text-gray-600">
								<Currency quantity={items[0]?.price} currency="IDR" />
							</Text>

							<TouchableOpacity>
								<Text className="text-[$00CCBB] text-xs"
								onPress={() => dispatch(removeFromBasket({id: key}))}
								>Remove</Text>
							</TouchableOpacity>
						</View>
					)})}
				</ScrollView>

				<View className="p-5 bg-white mt-5 space-y-4">
					<View className="flex-row justify-between">
						<Text className="text-gray-400">Subtotal</Text>
						<Text className="text-gray-400">
							<Currency quantity={basketTotal} currency="IDR" />
						</Text>
					</View>

					<View className="flex-row justify-between">
						<Text className="text-gray-400">Delivery Fee</Text>
						<Text className="text-gray-400">
							<Currency quantity={10000} currency="IDR" />
						</Text>
					</View>

					<View className="flex-row justify-between">
						<Text>Order Total</Text>
						<Text className="font-extrabold">
							<Currency quantity={basketTotal + 10000} currency="IDR" />
						</Text>
					</View>

					<TouchableOpacity onPress={() => navigation.navigate("PreparingOrderScreen")} className="rounded-lg bg-[#00CCBB] p-4">
						<Text className="text-center text-white text-lg font-bold">Place Order</Text>
					</TouchableOpacity>
				</View>
			</View>
    </SafeAreaView>
  )
}

export default BasketScreen