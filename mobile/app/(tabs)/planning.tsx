import { Box } from '@gluestack-ui/themed'
import { StyleSheet } from 'react-native'

import { Table, TableHeader } from '@/components/Table'

type Action = 'water' | 'cover'

const actionEmojis: Record<Action, string> = {
  water: '💧',
  cover: '🌿',
}

type PlanningItem = {
  date: string
  actions: Action[]
  koala: string | null
}

const header: TableHeader<PlanningItem> = [
  { label: 'Jour', key: 'date' },
  { label: 'Actions', key: 'actions' },
  { label: 'Koala', key: 'koala' },
]

const items: PlanningItem[] = [
  {
    date: '2024-06-13T08:23:25.606Z',
    actions: [],
    koala: null,
  },
  {
    date: '2024-06-14T08:23:25.606Z',
    actions: ['water'],
    koala: 'Jane Birkin',
  },
  {
    date: '2024-06-15T08:23:25.606Z',
    actions: ['cover'],
    koala: 'Cécile Duplessis',
  },
  {
    date: '2024-06-16T08:23:25.606Z',
    actions: ['water', 'cover'],
    koala: 'Zoé Lefevre',
  },
]

const rows = items.map((item) => ({
  date: new Date(item.date)
    .toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
    })
    .toUpperCase(),
  actions: item.actions.map((action) => actionEmojis[action]).join(', '),
  koala: item.koala,
}))

export default function PlanningScreen() {
  return (
    <Box style={styles.container}>
      <Table header={header} rows={rows} />
    </Box>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
})
