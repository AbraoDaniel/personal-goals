import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getWeekGoals } from '../../functions/get-week-goals'

export const getPendingGoalsRoute: FastifyPluginAsyncZod = async app => {
  app.get('/pending-goals', async () => {
    const { pendingGoals } = await getWeekGoals()
    return { pendingGoals }
  })
}
