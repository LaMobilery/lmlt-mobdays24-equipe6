import { AddIcon, Button, ButtonIcon, ButtonText } from "@gluestack-ui/themed";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { axiosInstance } from "@/api/client";

const prompt =
  "Quel est ce légume ? Peux tu me donner cette information dans un json formaté comme suis. { nom: valeur, maturité: valeur} La réponse ne doit être que le json, rien d'autre.";

const sendImageToAI = async (base64: string) => {
  const payload = {
    model: "gpt-4o",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: prompt,
          },
          {
            type: "image_url",
            image_url: {
              // url: `data:image/jpeg;base64,${base64}`,
              url: base64,
            },
          },
        ],
      },
    ],
    max_tokens: 300,
  };
  const res = await axiosInstance.post(
    "https://api.openai.com/v1/chat/completions",
    payload,
  );
  console.log(res.data.choices[0]);
};

export default function SetupScreen() {
  const [, setImage] = useState<string>("");
  const [,] = useState([]);

  const pickImageCameraRoll = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      const base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`;
      try {
        await sendImageToAI(base64Image);
      } catch (e) {
        console.log(e);
      }
    }
  };
  const pickImageCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }
    const result = await ImagePicker.launchCameraAsync();
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      const base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`;
      try {
        await sendImageToAI(base64Image);
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {/*<Button
        title="Pick an image from camera roll"
        onPress={pickImageCameraRoll}
      />
      <Button title="Pick an image from camera" onPress={pickImageCamera} />
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}*/}
      <Button
        size="md"
        variant="solid"
        action="primary"
        isDisabled={false}
        isFocusVisible={false}>
        <ButtonText>Ajouter un légume </ButtonText>
        <ButtonIcon as={AddIcon} />
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({});
