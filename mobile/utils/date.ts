import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

export const getCurrentDate = () => {
  return format(new Date(), 'EEEE dd MMMM', { locale: fr })
}

export const getDate = (date: string) => {
  return format(new Date(date), 'EEEE dd MMMM', { locale: fr })
}
