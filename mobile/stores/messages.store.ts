import AsyncStorage from "@react-native-async-storage/async-storage"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

export type Message = {
  text: string
  date: string
  from: "user" | "server"
}

export type MessagesStore = {
  messages: Message[]
  // eslint-disable-next-line autofix/no-unused-vars
  addMessage: (message: Message) => void
  // eslint-disable-next-line autofix/no-unused-vars
  resetMessages: () => void
}

export const useMessagesStore = create<MessagesStore>()(
  persist(
    (set) => ({
      messages: [],
      addMessage: (message) =>
        set((state) => ({ messages: [...state.messages, message] })),
      resetMessages: () => set({ messages: [] }),
    }),
    {
      name: "messages-store",
      storage: createJSONStorage(() => AsyncStorage),
      version: 1,
      migrate: (state) => {
        return state
      },
    },
  ),
)

export const useMessages = () => useMessagesStore((state) => state.messages)
export const useAddMessage = () => useMessagesStore((state) => state.addMessage)
export const useResetMessages = () =>
  useMessagesStore((state) => state.resetMessages)
