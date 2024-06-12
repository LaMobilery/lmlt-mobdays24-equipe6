import { Box } from '@gluestack-ui/themed'
import { StyleSheet } from 'react-native'

import { Table, TableHeader } from '@/components/Table'

type Person = {
  name: string
  age: number
}

const header: TableHeader<Person> = [
  { label: 'Name', key: 'name' },
  { label: 'Age', key: 'age' },
]

const rows: Person[] = [
  {
    name: 'John Doe',
    age: 30,
  },
  {
    name: 'Jane Doe',
    age: 23,
  },
  {
    name: 'John Smith',
    age: 40,
  },
]

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
    padding: 24,
  },
})
