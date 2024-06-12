import {
  Box,
  Button,
  ButtonText,
  Input,
  InputField,
  InputSlot,
  Text,
} from '@gluestack-ui/themed'
import Voice, { SpeechResultsEvent } from '@react-native-voice/voice'
import { useEffect, useState } from 'react'
import { FlatList, Image, StyleSheet } from 'react-native'

import { UIMessage } from '@/components/UIMessage'
import {
  useAddMessage,
  useMessages,
  useResetMessages,
} from '@/stores/messages.store'

export default function DiscussionScreen() {
  const [started, setStarted] = useState(false)
  const [result, setResult] = useState('')

  const [message, setMessage] = useState('')

  const messages = useMessages()
  const addMessage = useAddMessage()
  const resetMessages = useResetMessages()

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart
    Voice.onSpeechEnd = onSpeechEnd
    Voice.onSpeechResults = onSpeechResults

    return () => {
      Voice.destroy().then(Voice.removeAllListeners)
    }
  }, [])

  useEffect(() => {
    console.log({ result })
    console.log(started)
  }, [result, started])

  const onSpeechStart = () => {
    setStarted(true)
  }

  const onSpeechEnd = () => {
    setStarted(false)
  }

  const onSpeechResults = (e: SpeechResultsEvent) => {
    if (!e.value?.[0]) return

    setResult(e.value[0])
  }

  const startRecognizing = async () => {
    try {
      await Voice.start('fr-FR')
      setResult('')
    } catch (e) {
      console.error(e)
    }
  }

  const stopRecognizing = async () => {
    try {
      await Voice.stop()
    } catch (e) {
      console.error(e)
    }
  }

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
        <Text>{result}</Text>
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
            value={message}
            onChangeText={(text) => setMessage(text)}
          />

          <InputSlot>
            <Button
              onPress={() => {
                if (message === 'DEBUG_RESET_STORE') {
                  resetMessages()
                } else {
                  addMessage({
                    text: message,
                    date: new Date().toISOString(),
                    from: 'user',
                  })
                }

                setMessage('')
              }}
            >
              <ButtonText>Envoyer</ButtonText>
            </Button>
          </InputSlot>
        </Input>

        <Button
          onLongPress={startRecognizing}
          onPressOut={stopRecognizing}
          style={styles.speechBtn}
        >
          <Image source={require('@/assets/logos/speech.png')} />
          <ButtonText>Parler</ButtonText>
        </Button>
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
