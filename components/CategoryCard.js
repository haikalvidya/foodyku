import { Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const CategoryCard = ({imgUrl, title}) => {
  imgUrl = imgUrl.replace("image-", "")
  imgUrl = imgUrl.replace("-png", ".png")
  imgUrl = imgUrl.replace("-jpg", ".jpg")
  return (
    <TouchableOpacity className="relative mr-2">
      <Image 
        source={{uri: "https://cdn.sanity.io/images/jer47mrm/production/" + imgUrl + "?w=200&h=200&fit=crop"}}
        className="w-20 h-20 rounded"
      />
      <Text className="absolute bottom-1 left-1 text-white font-bold">{title}</Text>
    </TouchableOpacity>
  )
}

export default CategoryCard