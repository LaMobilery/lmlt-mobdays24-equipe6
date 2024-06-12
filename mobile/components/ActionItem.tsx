import { Box, Text } from '@gluestack-ui/themed'
import { StyleSheet } from 'react-native'

export type Action = {
  id: string
  action: string
  date: string
}

type ActionItemProps = {
  action: Action
  isTheLast: boolean
}

export const ActionItem: React.FC<ActionItemProps> = ({
  action,
  isTheLast,
}) => (
  <Box style={styles.item}>
    <Box>
      <Box style={styles.circle} />
      {!isTheLast ? <Box style={styles.vertical} /> : null}
    </Box>
    <Box>
      <Text
        style={[
          action.action.includes('Oubli') ? styles.missed : styles.done,
          styles.action,
        ]}
      >
        {action.action}
      </Text>
      <Text style={styles.date}>
        {action.action.includes('Oubli') ? '---' : `le ${action.date}`}
      </Text>
    </Box>
  </Box>
)

const styles = StyleSheet.create({
  item: {
    padding: 20,
    marginHorizontal: 16,
    flexDirection: 'row',
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    marginRight: 20,
  },
  vertical: {
    width: 2,
    height: 58,
    backgroundColor: 'white',
    position: 'absolute',
    top: 20,
    left: 9.5,
  },
  action: {
    fontSize: 16,
    fontWeight: 600,
  },
  missed: {
    color: '#C32B2B',
  },
  done: {
    color: 'black',
  },
  date: {
    color: '#415058',
    fontSize: 12,
  },
})