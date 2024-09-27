import type { ReactNode } from 'react'

export type CreateGoalFields = {
  title: string
  desiredWeeklyFrequency: number
}

export interface IGoalFrequency {
  frequency: string
  emoji: ReactNode
}
