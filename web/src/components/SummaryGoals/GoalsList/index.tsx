import { Plus } from 'lucide-react'
import { OutlineButton } from '../ui/outline-button'
import { getGoalsList } from '../../services/get-goals-list'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { createGoalCompletion } from '../../services/create-goal-completion'

const GoalsList: React.FC = () => {
  const queryClient = useQueryClient()
  const { data } = useQuery({
    queryKey: ['goals_list'],
    queryFn: getGoalsList,
    staleTime: 1000 * 60,
  })

  if (!data) {
    return null
  }

  async function handleCompleteGoal(goalId: string) {
    await createGoalCompletion(goalId)
    queryClient.invalidateQueries({ queryKey: ['summary_query'] })
    queryClient.invalidateQueries({ queryKey: ['goals_list'] })
  }

  return (
    <div className="flex flex-wrap gap-3">
      {data?.map(goal => {
        return (
          <OutlineButton
            key={goal?.id}
            disabled={goal?.completionCount >= goal?.desiredWeeklyFrequency}
            onClick={() => handleCompleteGoal(goal?.id)}
          >
            <Plus className="size-4 text-zinc-600" />
            {goal?.title}
          </OutlineButton>
        )
      })}
    </div>
  )
}

export default GoalsList
