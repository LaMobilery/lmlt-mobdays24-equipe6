import { Box } from '@gluestack-ui/themed'
import { StyleSheet } from 'react-native'
import { FlatList } from 'react-native'

import { Action, ActionItem } from '@/components/ActionItem'

const DATA: Action[] = [
  {
    id: '1',
    action: 'Arrosage par Claire',
    date: '07/06/2024',
  },
  {
    id: '2',
    action: 'Ajout Tomates par Nicolas',
    date: '07/06/2024',
  },
  {
    id: '3',
    action: 'Récolte Tomates par Claire',
    date: '10/06/2024',
  },
  {
    id: '4',
    action: 'Oubli Arrosage',
    date: '12/06/2024',
  },
  {
    id: '5',
    action: 'Couverture Framboise par Nicolas',
    date: '13/06/2024',
  },
  {
    id: '6',
    action: 'Arrosage par Seb',
    date: '14/06/2024',
  },
  {
    id: '7',
    action: 'Ajout Carottes par Claire',
    date: '15/06/2024',
  },
]

export default function ActionsScreen() {
  return (
    <Box style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={DATA}
        renderItem={({ item, index }) => {
          return (
            <ActionItem action={item} isTheLast={index === DATA.length - 1} />
          )
        }}
        keyExtractor={(item) => item.id}
      />
    </Box>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
