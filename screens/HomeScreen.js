import { View, Text, SafeAreaView, Image, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { 
  ChevronDownIcon,
  UserIcon,
  MagnifyingGlassIcon,
  AdjustmentsVerticalIcon,
} from 'react-native-heroicons/outline'
import Categories from '../components/Categories'
import FeaturedRow from '../components/FeaturedRow'

const HomeScreen = () => {
  const navigation = useNavigation()
  const [featuredCategories, setFeaturedCategories] = useState([])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [])

  useEffect(() => {
    fetch('https://jer47mrm.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type%20%3D%3D%20%22featured%22%5D%7B%0A%20%20%20%20%20%20...%2C%0A%20%20%20%20%20%20restaurants%5B%5D-%3E%7B%0A%20%20%20%20%20%20%20%20...%2C%0A%20%20%20%20%20%20%20%20dishes%5B%5D-%3E%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A')
      .then(res => res.json())
      .then(data => {
        setFeaturedCategories(data.result)
      });
    
  }, [])

  return (
    <SafeAreaView className="bg-white pt-5 flex-col">
  
      {/* Header */}
      <View className="flex-row mx-4 pb-3 items-center space-x-2">
        <Image
          source={{uri: "https://links.papareact.com/wru"}}
          className="w-7 h-7 rounded-full bg-gray-300 p-4"
        />

        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Delivery Now!</Text>
          <Text className="font-bold text-xl">Current Location
            <ChevronDownIcon size={20} color="#00CCBB" />
          </Text>
        </View>

        <UserIcon size={35} color="#00CCBB" />
      </View>

      {/* Search */}
      <View className="flex-row items-center space-x-2 pb-2 mx-4">
        <View className="flex-row space-x-2 flex-1 bg-gray-200 p-3 rounded-full">
          <MagnifyingGlassIcon color="grey" size={20}/>
          <TextInput className="w-full"
            placeholder="Search for food or restaurants"
            keyboardType="default"
          />
        </View>

        <AdjustmentsVerticalIcon color="#00CCBB" />
      </View>

      {/* Body */}
      <ScrollView className="bg-gray-100 flex-1 px-4"
      contentContainerStyle={{
        paddingBottom: 100,
      }}>
        {/* Categories */}
        <Categories />

        {/* Feature Rows */}
        {featuredCategories.map((category) => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen