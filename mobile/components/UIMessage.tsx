import { Box, Text } from '@gluestack-ui/themed'
import { StyleSheet } from 'react-native'

import { Message } from '@/stores/messages.store'

export type UIMessageProps = {
  message: Message
}

export const UIMessage = ({
  message: { text, date, from },
}: UIMessageProps) => {
  const styles = getStyles({ from })
  return (
    <Box style={styles.root}>
      <Text style={styles.date}>
        {new Date(date).toLocaleTimeString('fr-FR', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })}
      </Text>

      <Box style={styles.textContainer}>
        <Text style={styles.text}>{text}</Text>
      </Box>
    </Box>
  )
}

const getStyles = ({ from }: { from: Message['from'] }) => {
  const isUser = from === 'user'

  return StyleSheet.create({
    root: {
      gap: 4,
      maxWidth: '80%',
    },
    textContainer: {
      backgroundColor: isUser ? '#E2E7E9' : '#4CA7CF',
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 16,
    },
    text: {
      color: isUser ? '#000000' : '#FEFEFE',
    },
    date: {
      color: '#3C3C4399',
      textAlign: isUser ? 'left' : 'right',
      paddingLeft: isUser ? 8 : 0,
      paddingRight: isUser ? 0 : 8,
    },
  })
}
