import {
  Box,
  Button,
  ButtonText,
  Input,
  InputField,
} from '@gluestack-ui/themed'
import { SpeechResultsEvent } from '@react-native-voice/voice'
import { useCallback, useState } from 'react'
import { StyleSheet } from 'react-native'

import { MessagesList } from '@/components/MessagesList'
import { VoiceButton } from '@/components/VoiceButton'
import {
  useAddMessage,
  useMessages,
  useResetMessages,
} from '@/stores/messages.store'

export default function DiscussionScreen() {
  const messages = useMessages()
  const addMessage = useAddMessage()
  const resetMessages = useResetMessages()

  const [isRecording, setIsRecording] = useState(false)
  console.log('isRecording', isRecording) // DEBUG

  const [voiceMessage, setVoiceMessage] = useState('')
  const [textMessage, setTextMessage] = useState('')

  const onStopRecognizing = useCallback(() => {
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
  }, [voiceMessage, addMessage, resetMessages])

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
})
