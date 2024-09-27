import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { createGoalRoute } from './routes/create-goal'
import { createGoalCompletionRoute } from './routes/create-completion'
import { getPendingGoalsRoute } from './routes/get-pending-goals'
import { getWeekSummaryRoute } from './routes/get-week-summary'
import { deleteGoalCompletionRoute } from './routes/delete-goal-completion'
import { deleteGoalRoute } from './routes/delete-goal'
import fastifyCors from '@fastify/cors'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: '*',
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

// ROTAS DE CRIAÇÃO
app.register(createGoalRoute)
app.register(createGoalCompletionRoute)

// ROTAS DE CONSULTA
app.register(getPendingGoalsRoute)
app.register(getWeekSummaryRoute)

// ROTAS DE REMOÇÃO
app.register(deleteGoalCompletionRoute)
app.register(deleteGoalRoute)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP server running!')
  })
