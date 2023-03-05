import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import RestaurantCard from './RestaurantCard'

const FeaturedRow = ({ id, title, description}) => {
  const [restaurants, setRestaurants] = useState([])
  useEffect(() => {
    fetch('https://jer47mrm.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type%20%3D%3D%20%22featured%22%20%26%26%20_id%3D%3D%22' + id +'%22%5D%7B%0A%20%20%20%20%20%20...%2C%0A%20%20%20%20%20%20restaurant%5B%5D-%3E%7B%0A%20%20%20%20%20%20%20%20...%2C%0A%20%20%20%20%20%20%20%20dishes%5B%5D-%3E%2C%0A%20%20%20%20%20%20%20%20type-%3E%20%7B%0A%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%7D%5B0%5D%0A')
      .then(res => res.json())
      .then(data => {
        setRestaurants(data?.result?.restaurant);
      });
      
  
  }, [id])

  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon size={20} color="#00CCBB" />
      </View>

      <Text className="text-gray-400 text-sm">{description}</Text>

      <ScrollView
        horizontal
        contentContainerStyle={{
            paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        {restaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant._id}
            id={restaurant._id}
            title={restaurant.name}
            imgUrl={restaurant.image.asset._ref}
            rating={restaurant.rating}
            genres={restaurant.type?.name}
            address={restaurant.address}
            short_description={restaurant.short_description}
            dishes={restaurant.dishes}
            long={restaurant.long}
            lat={restaurant.lat}
          />
        ))}

      </ScrollView>
    </View>
  )
}

export default FeaturedRow