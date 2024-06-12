import {
  Box,
  Button,
  ButtonText,
  Input,
  InputField,
  Text,
} from '@gluestack-ui/themed'
import Voice, { SpeechResultsEvent } from '@react-native-voice/voice'
import { useEffect, useState } from 'react'
import { Image, StyleSheet } from 'react-native'

export default function DiscussionScreen() {
  const [started, setStarted] = useState(false)
  const [result, setResult] = useState('')

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
          <InputField placeholder="Enter Text here" />
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
