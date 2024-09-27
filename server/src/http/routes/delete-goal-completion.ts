import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { deleteGoalCompletion } from '../../functions/delete-goal-completion'

export const deleteGoalCompletionRoute: FastifyPluginAsyncZod = async app => {
  app.delete(
    '/delete_completion',
    {
      schema: {
        body: z.object({
          goalCompletionId: z.string(),
        }),
      },
    },
    async request => {
      const { goalCompletionId } = request.body
      await deleteGoalCompletion({
        goalCompletionId,
      })
    }
  )
}
