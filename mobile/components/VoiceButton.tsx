import { Button, ButtonText } from '@gluestack-ui/themed'
import Voice, { SpeechResultsEvent } from '@react-native-voice/voice'
import { useCallback, useEffect } from 'react'
import { Image, StyleSheet } from 'react-native'
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated'

export type VoiceInputProps = {
  onStopRecognizing?: () => void
  onSpeechStart?: () => void
  onSpeechEnd?: () => void
  // eslint-disable-next-line autofix/no-unused-vars
  onSpeechResults?: (event: SpeechResultsEvent) => void
}

export const VoiceButton = ({
  onSpeechStart,
  onSpeechEnd,
  onSpeechResults,
  onStopRecognizing,
}: VoiceInputProps) => {
  const scale = useSharedValue(1)

  const startRecognizing = useCallback(async () => {
    try {
      await Voice.start('fr-FR')
      scale.value = withSpring(1.2)
    } catch (e) {
      console.error(e)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const stopRecognizing = useCallback(async () => {
    try {
      await Voice.stop()
      scale.value = withSpring(1)

      onStopRecognizing?.()
    } catch (e) {
      console.error(e)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onStopRecognizing])

  useEffect(() => {
    if (onSpeechStart) {
      Voice.onSpeechStart = onSpeechStart
    }
    if (onSpeechEnd) {
      Voice.onSpeechEnd = onSpeechEnd
    }
    if (onSpeechResults) {
      Voice.onSpeechResults = onSpeechResults
    }

    return () => {
      Voice.destroy().then(Voice.removeAllListeners)
    }
  }, [onSpeechEnd, onSpeechResults, onSpeechStart])

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Button
        onPressIn={startRecognizing}
        onPressOut={stopRecognizing}
        style={styles.button}
      >
        <Image source={require('@/assets/logos/speech.png')} />
        <ButtonText>Parler</ButtonText>
      </Button>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  button: {
    gap: 10,
    backgroundColor: '#FF8B33',
    borderRadius: 50,
  },
})
