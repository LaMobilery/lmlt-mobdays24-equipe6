import { Box } from '@gluestack-ui/themed'
import { useState } from 'react'
import { StyleSheet } from 'react-native'

import { Vegetable } from '@/api/types'

import { Table, TableHeader } from './Table'
import { VegetableModal } from './VegetableModal'

const header: TableHeader<Vegetable> = [
  { label: 'Légume', key: 'name' },
  { label: 'Maturité (jours)', key: 'maturity' },
]

interface SetupTableProps {
  array: Vegetable[]
}

export const SetupTable = ({ array }: SetupTableProps) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const [selectedVegetable, setSelectedVegetable] = useState<Vegetable>()

  return (
    <Box style={styles.container}>
      <Table
        header={header}
        rows={array}
        onClick={(value) => {
          setModalIsOpen(true)
          setSelectedVegetable(array[value])
        }}
      />
      {selectedVegetable && (
        <VegetableModal
          key={selectedVegetable._id}
          isOpen={modalIsOpen}
          vegetable={selectedVegetable}
          onClose={() => setModalIsOpen(false)}
        />
      )}
    </Box>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flex: 1,
    padding: 24,
  },
})
