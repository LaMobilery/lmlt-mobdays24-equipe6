import { Box, Text } from '@gluestack-ui/themed'
import { StatusBar } from 'expo-status-bar'
import { Platform, StyleSheet } from 'react-native'

export default function InfoScreen() {
  return (
    <Box style={styles.container}>
      <Text style={styles.title}>Info</Text>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </Box>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})
