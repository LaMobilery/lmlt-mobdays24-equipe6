const config = {
  openAiApiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
}

if (!config.openAiApiKey) {
  throw new Error('environment variable EXPO_PUBLIC_OPENAI_API_KEY is required')
}

export { config }
