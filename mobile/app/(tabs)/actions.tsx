import { Box } from '@gluestack-ui/themed'
import { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { FlatList } from 'react-native'

import { backendClient } from '@/api/client'
import { Action, ActionItem } from '@/components/ActionItem'

type ApiAction = {
  _id: string
  type: string
  actionDate: string
  user: null
}

const fromApiActionToActionItem = (apiAction: ApiAction): Action => {
  return {
    id: apiAction._id,
    action: apiAction.type,
    date: apiAction.actionDate,
  }
}

export default function ActionsScreen() {
  const [actions, setActions] = useState<Action[]>([])

  useEffect(() => {
    const fetchActions = async () => {
      try {
        const response = await backendClient.get<ApiAction[]>('/action')
        setActions(response.data.map(fromApiActionToActionItem))
      } catch (e) {
        console.log('error fetch actions', e)
      }
    }

    fetchActions()
    const interval = setInterval(fetchActions, 1000 * 10)

    return () => clearInterval(interval)
  }, [])

  return (
    <Box style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={[...actions].sort((a, b) => a.date.localeCompare(b.date) * -1)}
        renderItem={({ item, index }) => {
          return <ActionItem action={item} isTheLast={index === 0} />
        }}
        keyExtractor={(item) => item.id}
        inverted
      />
    </Box>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
