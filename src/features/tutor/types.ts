export type TutorMessage = {
  role: 'user' | 'assistant'
  content: string
}

export type TutorResponse = {
  message: string
  model: string
  remainingRequests: number
}
