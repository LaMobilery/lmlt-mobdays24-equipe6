import {
  CloseIcon,
  Heading,
  Icon,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Text,
  View,
} from '@gluestack-ui/themed'
import { StyleSheet } from 'react-native'

import { Vegetable } from '@/api/types'
import { getDate } from '@/utils/date'

interface VegetableModalProps {
  isOpen: boolean
  vegetable: Vegetable
  onClose: () => void
}

export const VegetableModal = ({
  isOpen,
  vegetable,
  onClose,
}: VegetableModalProps) => {
  return (
    <Modal
      style={{ paddingTop: 100, paddingBottom: 100 }}
      isOpen={isOpen}
      onClose={() => onClose()}
    >
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="lg">{vegetable.name}</Heading>
          <ModalCloseButton>
            <Icon as={CloseIcon} />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <View style={styles.container}>
            <Text style={styles.title}>Plantation :</Text>
            <Text>{getDate(vegetable.plantationDate)}</Text>
          </View>
          {vegetable.harvestDate && (
            <View style={styles.container}>
              <Text style={styles.title}>Récolte prévu le :</Text>
              <Text>{getDate(vegetable.harvestDate)}</Text>
            </View>
          )}
          <View style={styles.container}>
            <Text>{vegetable.description}</Text>
          </View>
          {vegetable.recipe && (
            <View style={[styles.container, styles.recipe]}>
              <Text style={styles.title}>Recette :</Text>
              <Text>{vegetable.recipe}</Text>
            </View>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
  },
  title: {
    fontWeight: '600',
  },
  recipe: {
    backgroundColor: 'pink',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
})
