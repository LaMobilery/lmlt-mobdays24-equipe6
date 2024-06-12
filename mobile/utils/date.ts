import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

export const getCurrentDate = () => {
  return format(new Date(), 'EEEE dd MMMM', { locale: fr })
}
