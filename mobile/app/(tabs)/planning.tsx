import { Box, Text } from '@gluestack-ui/themed'
import { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'

import { axiosInstance, backendBaseUrl } from '@/api/client'
import { Table, TableHeader } from '@/components/Table'

type ApiAction = {
  _id: string
  date: string
  dateLabel: string
  isWatering: boolean
  isCovering: boolean
  alert: boolean
  collaborator: string | null
}

type PlanningItem = {
  date: string
  actions: string
  koala: string
}

const fromApiActionToPlanningItem = (apiAction: ApiAction): PlanningItem => {
  const actions: string[] = []
  if (apiAction.isWatering) {
    actions.push('💧')
  }
  if (apiAction.isCovering) {
    actions.push('⛺')
  }

  return {
    date: apiAction.dateLabel,
    actions: actions.join(' '),
    koala: apiAction.collaborator || (apiAction.alert ? '🚨' : ''),
  }
}

const header: TableHeader<PlanningItem> = [
  { label: 'Jour', key: 'date' },
  { label: 'Actions', key: 'actions' },
  { label: 'Koala', key: 'koala' },
]

export default function PlanningScreen() {
  const [planning, setPlanning] = useState<PlanningItem[]>([])

  useEffect(() => {
    const fetchActions = async () => {
      try {
        const response = await axiosInstance.get(`${backendBaseUrl}/planning`)
        setPlanning(response.data.map(fromApiActionToPlanningItem))
        console.log(JSON.stringify(response.data, null, 2))
      } catch {}
    }

    const interval = setInterval(fetchActions, 1000 * 10)

    return () => clearInterval(interval)
  }, [])

  const currentDateLabel = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  const currentDateLabelCapitalized =
    currentDateLabel.charAt(0).toUpperCase() + currentDateLabel.slice(1)

  return (
    <Box style={styles.container}>
      <Text style={styles.date}>{currentDateLabelCapitalized}</Text>
      <Table header={header} rows={planning} />
    </Box>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
  },
})
