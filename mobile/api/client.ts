import axios from 'axios'

import { config } from '@/config'

/**
 * OPEN AI
 */
const openAiHeaders = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${config.openAiApiKey}`,
}

const openAiHost = 'https://api.openai.com'
const openAiBaseUrl = `${openAiHost}/v1`

export const openAiClient = axios.create({
  headers: openAiHeaders,
  baseURL: openAiBaseUrl,
})

/**
 * BACKEND
 */
const backendHost = 'http://rnexb-91-212-236-226.a.free.pinggy.link'
export const backendBaseUrl = `${backendHost}/v1`

const backendHeaders = {
  'Content-Type': 'application/json',
}

export const backendClient = axios.create({
  headers: backendHeaders,
  baseURL: backendBaseUrl,
})
