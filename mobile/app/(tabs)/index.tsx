import {
  Box,
  Button,
  ButtonText,
  Input,
  InputField,
  Text,
} from '@gluestack-ui/themed'
import Voice, { SpeechResultsEvent } from '@react-native-voice/voice'
import { useCallback, useEffect, useState } from 'react'
import { FlatList, Image, StyleSheet } from 'react-native'

import { UIMessage } from '@/components/UIMessage'
import {
  useAddMessage,
  useMessages,
  useResetMessages,
} from '@/stores/messages.store'
import { throttle } from '@/utils/throttle'

const VOICE_THROTTLE_MS = 1000

export default function DiscussionScreen() {
  const messages = useMessages()
  const addMessage = useAddMessage()
  const resetMessages = useResetMessages()

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
      setVoiceMessage('')
    } catch (e) {
      console.error(e)
    }
  }, [setVoiceMessage])

  const stopRecognizing = useCallback(async () => {
    try {
      await Voice.stop()
      addMessage({
        text: voiceMessage,
        date: new Date().toISOString(),
        from: 'user',
      })
      setVoiceMessage('')
    } catch (e) {
      console.error(e)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addMessage, setVoiceMessage])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateRecognizing = useCallback(
    throttle(async (isRecognizing: boolean) => {
      if (isRecognizing) {
        startRecognizing()
      } else {
        stopRecognizing()
      }
    }, VOICE_THROTTLE_MS),
    [startRecognizing, stopRecognizing],
  )

  return (
    <Box style={styles.container}>
      <FlatList
        style={{ alignSelf: 'stretch' }}
        contentContainerStyle={{ flexGrow: 1, gap: 8 }}
        data={messages}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => {
          return (
            <Box
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent:
                  item.from === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              <UIMessage message={item} />
            </Box>
          )
        }}
      />

      <Box style={styles.chatContainer}>
        <Text>{voiceMessage}</Text>
      </Box>
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
            placeholder="Enter Text here"
            value={textMessage}
            onChangeText={(text) => setTextMessage(text)}
          />
        </Input>

        {textMessage.length > 0 ? (
          <Button
            onPress={() => {
              if (textMessage === 'DEBUG_RESET_STORE') {
                resetMessages()
              } else {
                addMessage({
                  text: textMessage,
                  date: new Date().toISOString(),
                  from: 'user',
                })
              }

              setTextMessage('')
            }}
          >
            <ButtonText>Envoyer</ButtonText>
          </Button>
        ) : (
          <Button
            onPressIn={() => updateRecognizing(true)}
            onPressOut={() => updateRecognizing(false)}
            style={styles.speechBtn}
          >
            <Image source={require('@/assets/logos/speech.png')} />
            <ButtonText>Parler</ButtonText>
          </Button>
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
  chatContainer: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    borderWidth: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputContainer: {
    // borderWidth: 1,
    flexDirection: 'row',
    gap: 10,
  },
  speechBtn: {
    gap: 10,
  },
  input: {
    flex: 1,
  },
})
