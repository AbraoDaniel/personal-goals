import type { GoalsList } from '../types/goalsList'

export async function getGoalsList(): Promise<GoalsList> {
  const response = await fetch('http://localhost:3333/pending-goals')
  const data = await response.json()
  return data.pendingGoals
}
