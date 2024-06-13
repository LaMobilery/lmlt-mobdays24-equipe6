import { Box, Text } from '@gluestack-ui/themed'
import { StyleSheet } from 'react-native'

export type TableHeader<T> = { label: string; key: keyof T }[]

export type TableProps<T> = {
  rows: T[]
  header: { label: string; key: keyof T }[]
}

export function Table<T extends Record<string, any>>({
  header,
  rows,
}: TableProps<T>) {
  return (
    <Box style={styles.root}>
      <Box style={styles.head}>
        {header.map((item, index) => {
          const hasBorderRight = index < header.length - 1
          return (
            <Box
              key={typeof item.key === 'string' ? item.key : index}
              style={[
                styles.cell,
                styles.borderBottomStrong,
                hasBorderRight && styles.borderRight,
              ]}
            >
              <Text style={styles.text}>{item.label}</Text>
            </Box>
          )
        })}
      </Box>

      {rows.map((row, rowIndex) => {
        const hasBorderBottom = rowIndex < rows.length - 1
        return (
          <Box key={rowIndex} style={styles.row}>
            {header.map((item, cellIndex) => {
              const hasBorderRight = cellIndex < header.length - 1
              return (
                <Box
                  key={typeof item.key === 'string' ? item.key : cellIndex}
                  style={[
                    styles.cell,
                    hasBorderBottom && styles.borderBottom,
                    hasBorderRight && styles.borderRight,
                  ]}
                >
                  <Text style={styles.text}>{row[item.key]}</Text>
                </Box>
              )
            })}
          </Box>
        )
      })}
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingVertical: 12,
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
