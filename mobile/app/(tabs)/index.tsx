import {
  Box,
  Button,
  ButtonText,
  Input,
  InputField,
  Spinner,
} from '@gluestack-ui/themed'
import Voice, { SpeechResultsEvent } from '@react-native-voice/voice'
import * as Speech from 'expo-speech'
import { useCallback, useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'

import { axiosInstance, backendBaseUrl } from '@/api/client'
import { MessagesList } from '@/components/MessagesList'
import { VoiceButton } from '@/components/VoiceButton'
import {
  useAddMessage,
  useMessages,
  useResetMessages,
} from '@/stores/messages.store'

const speak = async (message: string) => {
  const voices = await Speech.getAvailableVoicesAsync()
  const frVoices = voices.filter((voice) => voice.language === 'fr-FR')
  frVoices.forEach((voice, index) => {
    console.log(index, voice)
  })
  const voice = frVoices.find((voice) => voice.name === 'Grandma')
  Speech.speak(message, {
    voice: voice?.identifier,
    pitch: 3,
    rate: 0.8,
  })
}

export default function DiscussionScreen() {
  const messages = useMessages()
  const addMessage = useAddMessage()
  const resetMessages = useResetMessages()

  // 192.168.2.136 ip address

  const potagerIdRef = 'Mon jardin a pour identifiant 6669b5d92a7b8a4b1ecbab8a'

  const sendMessageToAPI = useCallback(
    async (message: string) => {
      setIsLoadingAi(true)

      try {
        const response = await axiosInstance.post<{ msg: string }>(
          `${backendBaseUrl}/ai/`,
          {
            msg: `${potagerIdRef} ${message}`,
          },
        )

        const responseMessage = response.data.msg

        if (responseMessage) {
          addMessage({
            text: responseMessage,
            date: new Date().toISOString(),
            from: 'server',
          })
          speak(responseMessage)
        }

        console.log('Success:', response)
      } catch (error) {
        console.error('Error:', error)
      }

      setIsLoadingAi(false)
    },
    [addMessage],
  )

  const [isRecording, setIsRecording] = useState(false)
  if (0) {
    console.log('isRecording', isRecording) // DEBUG
  }
  const [isLoadingAi, setIsLoadingAi] = useState(false)
  const [voiceMessage, setVoiceMessage] = useState('')
  const [textMessage, setTextMessage] = useState('')

  const onStopRecognizing = useCallback(async () => {
    if (voiceMessage === 'Réinitialiser') {
      resetMessages()
      return
    }

    if (!voiceMessage.length) {
      return
    }

    addMessage({
      text: voiceMessage,
      date: new Date().toISOString(),
      from: 'user',
    })

    await sendMessageToAPI(voiceMessage)
  }, [voiceMessage, addMessage, resetMessages, sendMessageToAPI])

  const onSpeechStart = useCallback(() => {
    setIsRecording(true)
  }, [setIsRecording])

  const onSpeechEnd = useCallback(() => {
    setIsRecording(false)
    setVoiceMessage('')
  }, [setIsRecording])

  const onSpeechResults = useCallback(
    (e: SpeechResultsEvent) => {
      if (!e.value?.[0]) return

      setVoiceMessage(e.value[0])
    },
    [setVoiceMessage],
  )

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart
    Voice.onSpeechEnd = onSpeechEnd
    Voice.onSpeechResults = onSpeechResults

    return () => {
      Voice.destroy().then(Voice.removeAllListeners)
    }
  }, [onSpeechEnd, onSpeechResults, onSpeechStart])

  const sendTextMessage = useCallback(async () => {
    if (textMessage === 'Reset') {
      resetMessages()
      setTextMessage('')
      return
    }

    const text = textMessage
    setTextMessage('')

    addMessage({
      text,
      date: new Date().toISOString(),
      from: 'user',
    })

    try {
      await sendMessageToAPI(text)
    } catch (e) {
      console.log('error sendMessageToAPI', e)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setTextMessage, resetMessages, addMessage, textMessage])

  const isOnStore = messages[messages.length - 1]?.text === voiceMessage

  return (
    <Box style={styles.container}>
      <MessagesList
        messages={
          voiceMessage && !isOnStore
            ? [
                ...messages,
                {
                  text: voiceMessage,
                  date: new Date().toISOString(),
                  from: 'user',
                },
              ]
            : messages
        }
        footer={
          isLoadingAi ? (
            <Box style={styles.spinnerContainer}>
              <Spinner size="large" />
            </Box>
          ) : undefined
        }
      />

      <Box style={styles.inputContainer}>
        <Input
          style={styles.input}
          variant="outline"
          size="md"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
        >
          <InputField
            placeholder="Qu'avez-vous arrosé ?"
            value={textMessage}
            onChangeText={(text) => setTextMessage(text)}
          />
        </Input>

        {textMessage.length > 0 ? (
          <Button onPress={sendTextMessage}>
            <ButtonText>Envoyer</ButtonText>
          </Button>
        ) : (
          <VoiceButton
            onStopRecognizing={onStopRecognizing}
            onSpeechStart={onSpeechStart}
            onSpeechEnd={onSpeechEnd}
            onSpeechResults={onSpeechResults}
          />
        )}
      </Box>
    </Box>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  input: {
    flex: 1,
  },
  spinnerContainer: {
    padding: 12,
  },
})
