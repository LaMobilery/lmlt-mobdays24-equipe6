import { Button, ButtonText } from '@gluestack-ui/themed'
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'
import { Alert, Image, StyleSheet, Text, View } from 'react-native'

import { axiosInstance } from '@/api/client'

const prompt =
  "Quel est ce légume ? Peux tu me donner cette information dans un json formaté comme suis. { name: valeur, maturity: valeur} La réponse ne doit être que le json, rien d'autre."

const sendImageToAI = async (base64: string) => {
  const payload = {
    model: 'gpt-4o',
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: prompt,
          },
          {
            type: 'image_url',
            image_url: {
              // url: `data:image/jpeg;base64,${base64}`,
              url: base64,
            },
          },
        ],
      },
    ],
    max_tokens: 300,
  }
  const res = await axiosInstance.post(
    'https://api.openai.com/v1/chat/completions',
    payload,
  )
  return res.data.choices[0].message.content
}

export default function SetupScreen() {
  const [, setImage] = useState<string>('')
  const [list, setList] = useState<{ name: string; maturity: string }[]>([])

  const pickImageCameraRoll = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
    })
    if (!result.canceled) {
      setImage(result.assets[0].uri)
      const base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`
      try {
        const res = await sendImageToAI(base64Image)
        const jsonObject = JSON.parse(res)
        setList([
          ...list,
          { name: jsonObject['name'], maturity: jsonObject['maturity'] },
        ])
      } catch (e) {
        console.log(e)
      }
    }
  }
  const pickImageCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync()
    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!")
      return
    }
    const result = await ImagePicker.launchCameraAsync()
    if (!result.canceled) {
      setImage(result.assets[0].uri)
      const base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`
      try {
        await sendImageToAI(base64Image)
      } catch (e) {
        console.log(e)
      }
    }
  }

  const showAlert = () => {
    Alert.alert(
      'Choisis une option',
      'Séléctionne la source de ta photo',
      [
        {
          text: 'Annuler',
          onPress: () => console.log('Bouton Annuler pressé'),
          style: 'cancel',
        },
        {
          text: 'Galerie',
          onPress: () => pickImageCameraRoll(),
        },
        {
          text: 'Appareil Photo',
          onPress: () => pickImageCamera(),
        },
      ],
      { cancelable: false },
    )
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View>
        {list.length > 0 &&
          list.map((item) => <Text key={item.name}>{item.name}</Text>)}
      </View>
      <View style={styles.footer}>
        <Button style={styles.btn} onPress={() => console.log('vocal')}>
          <Image source={require('@/assets/logos/speech.png')} />
          <ButtonText>Ajouter un légume</ButtonText>
        </Button>
        <Button style={styles.btn} onPress={showAlert}>
          <Image
            style={{ width: 25, height: 25 }}
            resizeMode="contain"
            source={require('@/assets/logos/camera.png')}
          />
          <ButtonText>Ajouter un légume</ButtonText>
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 10,
    gap: 10,
  },
  btn: {
    gap: 10,
  },
})
