import {
  Box,
  Button,
  ButtonText,
  Input,
  InputField,
} from '@gluestack-ui/themed'
import Voice, { SpeechResultsEvent } from '@react-native-voice/voice'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Animated, Image, StyleSheet } from 'react-native'

import { MessagesList } from '@/components/MessagesList'
import {
  useAddMessage,
  useMessages,
  useResetMessages,
} from '@/stores/messages.store'

export default function DiscussionScreen() {
  const messages = useMessages()
  const addMessage = useAddMessage()
  const resetMessages = useResetMessages()

  const animatedValue = useRef(new Animated.Value(1)).current

  const [isRecording, setIsRecording] = useState(false)
  if (0) {
    console.log('isRecording', isRecording) // DEBUG
  }
  const [voiceMessage, setVoiceMessage] = useState('')
  const [textMessage, setTextMessage] = useState('')

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

  const startRecognizing = useCallback(async () => {
    try {
      await Voice.start('fr-FR')
      Animated.spring(animatedValue, {
        toValue: 1.2,
        useNativeDriver: true,
      }).start()
    } catch (e) {
      console.error(e)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const stopRecognizing = useCallback(async () => {
    try {
      await Voice.stop()
      Animated.spring(animatedValue, {
        toValue: 1,
        useNativeDriver: true,
      }).start()

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
    } catch (e) {
      console.error(e)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addMessage, voiceMessage])

  const sendTextMessage = useCallback(() => {
    if (textMessage === 'Reset') {
      resetMessages()
    } else {
      addMessage({
        text: textMessage,
        date: new Date().toISOString(),
        from: 'user',
      })
    }

    setTextMessage('')
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
          <Animated.View style={{ transform: [{ scale: animatedValue }] }}>
            <Button
              onPressIn={startRecognizing}
              onPressOut={stopRecognizing}
              style={styles.speechBtn}
            >
              <Image source={require('@/assets/logos/speech.png')} />
              <ButtonText>Parler</ButtonText>
            </Button>
          </Animated.View>
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
  speechBtn: {
    gap: 10,
    backgroundColor: '#FF8B33',
    borderRadius: 50,
  },
  input: {
    flex: 1,
  },
})
