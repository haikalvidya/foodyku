import { Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import CategoryCard from './CategoryCard'

const Categories = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetch("https://jer47mrm.api.sanity.io/v2021-10-21/data/query/production?query=%2F%2F%20*%5B_type%20%3D%3D%20%22featured%22%20%26%26%20_id%3D%3D%22481f201d-1433-4d86-b1b8-06c34aebe080%22%5D%7B%0A%2F%2F%20%20%20%20%20%20%20...%2C%0A%2F%2F%20%20%20%20%20%20%20restaurant%5B%5D-%3E%7B%0A%2F%2F%20%20%20%20%20%20%20%20%20...%2C%0A%2F%2F%20%20%20%20%20%20%20%20%20dishes%5B%5D-%3E%2C%0A%2F%2F%20%20%20%20%20%20%20%20%20type-%3E%20%7B%0A%2F%2F%20%20%20%20%20%20%20%20%20%20%20name%0A%2F%2F%20%20%20%20%20%20%20%20%20%7D%0A%2F%2F%20%20%20%20%20%20%20%7D%2C%0A%2F%2F%20%20%20%20%20%7D%5B0%5D%0A%0A*%5B_type%20%3D%3D%20%22category%22%5D%0A")
      .then(res => res.json())
      .then(data => {
        setCategories(data?.result);
      }
    );
  }, [])

  return (
    <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
            paddingTop: 10,
        }}
    >
      {categories.map((category) => (
        <CategoryCard
          key={category._id}
          imgUrl={category.image.asset._ref}
          title={category.name}
        />
      ))}
    </ScrollView>
  )
}

export default Categories