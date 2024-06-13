const config = {
  openAiApiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
  backendHost: process.env.EXPO_PUBLIC_BACKEND_HOST,
}

if (!config.openAiApiKey) {
  throw new Error('environment variable EXPO_PUBLIC_OPENAI_API_KEY is required')
}
if (!config.backendHost) {
  throw new Error('environment variable EXPO_PUBLIC_BACKEND_HOST is required')
}

export { config }
