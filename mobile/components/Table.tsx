import { Box, Pressable, ScrollView, Text } from '@gluestack-ui/themed'
import { StyleSheet } from 'react-native'

export type TableHeader<T> = { label: string; key: keyof T }[]

export type TableProps<T> = {
  rows: T[]
  header: { label: string; key: keyof T }[]
  // eslint-disable-next-line autofix/no-unused-vars
  onClick?: (index: number) => void
}

export function Table<T extends Record<string, any>>({
  header,
  rows,
  onClick,
}: TableProps<T>) {
  return (
    <Box style={styles.root}>
      <Box style={styles.head}>
        {header.map((item, index) => {
          const hasBorderRight = index < header.length - 1
          return (
            <Box
              style={[
                styles.cell,
                styles.borderBottomStrong,
                hasBorderRight && styles.borderRight,
              ]}
              key={index}
            >
              <Text
                key={typeof item.key === 'string' ? item.key : index}
                style={styles.text}
              >
                {item.label}
              </Text>
            </Box>
          )
        })}
      </Box>

      <ScrollView showsVerticalScrollIndicator={false}>
        {rows.map((row, rowIndex) => {
          const hasBorderBottom = rowIndex < rows.length - 1
          return (
            <Pressable
              key={rowIndex}
              style={styles.row}
              onPress={
                onClick ? () => onClick(rowIndex) : () => console.log('press')
              }
            >
              {header.map((item, cellIndex) => {
                const hasBorderRight = cellIndex < header.length - 1
                return (
                  <Box
                    style={[
                      styles.cell,
                      hasBorderBottom && styles.borderBottom,
                      hasBorderRight && styles.borderRight,
                    ]}
                    key={cellIndex}
                  >
                    <Text
                      key={typeof item.key === 'string' ? item.key : cellIndex}
                      style={styles.text}
                    >
                      {row[item.key]}
                    </Text>
                  </Box>
                )
              })}
            </Pressable>
          )
        })}
      </ScrollView>
    </Box>
  )
}

const styles = StyleSheet.create({
  root: {},
  head: {
    flexDirection: 'row',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    padding: 12,
    borderColor: '#3C3C4399',
  },
  borderBottom: {
    borderBottomWidth: 1,
  },
  borderBottomStrong: {
    borderBottomWidth: 2,
  },
  borderRight: {
    borderRightWidth: 1,
  },
  text: {
    textAlign: 'center',
  },
})
