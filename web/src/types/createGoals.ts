import type { ReactNode } from 'react'

export type CreateGoalFields = {
  title: string
  desiredWeeklyFrequency: number
}

export interface IGoalFrequency {
  value: string
  emoji: ReactNode
}
