import { Box } from '@gluestack-ui/themed'
import { FlatList, StyleSheet } from 'react-native'

import { Message } from '@/stores/messages.store'

import { UIMessage } from './UIMessage'

export type MessagesListProps = {
  messages: Message[]
}

export const MessagesList = ({ messages }: MessagesListProps) => {
  const reversedMessages = [...messages].reverse()

  return (
    <FlatList
      style={{ alignSelf: 'stretch' }}
      contentContainerStyle={styles.contentContainer}
      data={reversedMessages}
      inverted
      keyExtractor={(item) => item.date}
      renderItem={({ item }) => {
        return (
          <Box
            style={[
              styles.messageContainer,
              item.from === 'user'
                ? styles.userMessageContainer
                : styles.serverMessageContainer,
            ]}
          >
            <UIMessage message={item} />
          </Box>
        )
      }}
    />
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    gap: 8,
    paddingVertical: 16,
  },
  messageContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  userMessageContainer: {
    justifyContent: 'flex-end',
  },
  serverMessageContainer: {
    justifyContent: 'flex-start',
  },
})
