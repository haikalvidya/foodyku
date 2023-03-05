import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Animatable from 'react-native-animatable';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';

const PreparingOrderScreen = () => {
  const navigation = useNavigation();

	useEffect(() => {
		setTimeout(() => {
			navigation.navigate("Delivery")
		}, 4000);
	}, [])
	
  return (
    <SafeAreaView className="bg-[#00ccbb] flex-1 justify-center items-center">
      <Animatable.Image
        source={require('../assets/preparing-order.gif')}
        animation="slideInUp"
        iterationCount={1}
        className="w-96 h-96"
      />

      <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        className="text-lg font-bold text-white my-10 text-center"
        >
            Waiting for the order to be prepared
        </Animatable.Text>

        <Progress.Circle size={60} indeterminate={true} color="#fff" />
    </SafeAreaView>
  )
}

export default PreparingOrderScreen