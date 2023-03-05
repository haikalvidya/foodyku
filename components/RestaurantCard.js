import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { StarIcon } from 'react-native-heroicons/solid'
import { MapPinIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'

const RestaurantCard = ({
  id,
  title,
  imgUrl,
  rating,
  genres,
  address,
  short_description,
  dishes,
  long,
  lat,
}) => {
  imgUrl = imgUrl.replace("image-", "")
  imgUrl = imgUrl.replace("-png", ".png")
  imgUrl = imgUrl.replace("-jpg", ".jpg")

  const navigation = useNavigation()

  return (
    <TouchableOpacity className="bg-white rounded-lg shadow-md w-64 mr-5 mb-4"
    onPress={() => {
      navigation.navigate("Restaurant", {
        id,
        title,
        imgUrl,
        rating,
        genres,
        address,
        short_description,
        dishes,
        long,
        lat,
      })
    }}
    >
      <Image 
        source={{uri: "https://cdn.sanity.io/images/jer47mrm/production/" + imgUrl}}
        className="w-64 h-36 rounded-lg"
      />
      <View className="px-3 pb-4">
        <Text className="font-bold text-lg pt-2">{title}</Text>
        <View className="flex-row items-center space-x-1">
          <StarIcon color="green" opacity={0.5} size={22}/>
          <Text className="text-gray-400 text-xs">
            <Text className="font-bold">{rating}</Text> ∙ {genres}
          </Text>
        </View>

        <View className="flex-row items-center space-x-1">
          <MapPinIcon color="gray" opacity={0.4} size={22} />
          <Text className="text-xs text-gray-500">Nearby ∙ {address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default RestaurantCard