import { eq } from 'drizzle-orm'
import { db } from '../db'
import { goalCompletions, goals } from '../db/schema'

interface IDeleteGoalCompletion {
  goalCompletionId: string
}

export async function deleteGoalCompletion({
  goalCompletionId,
}: IDeleteGoalCompletion) {
  await db
    .delete(goalCompletions)
    .where(eq(goalCompletions.id, goalCompletionId))

  return {}
}
