import { Plus, Trash } from 'lucide-react'
import { OutlineButton } from '../ui/outline-button'
import { getGoalsList } from '../../services/get-goals-list'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { createGoalCompletion } from '../../services/create-goal-completion'
import { deleteGoal } from '../../services/delete-goal'

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

  async function handleDeleteGoal(goalId: string) {
    await deleteGoal(goalId)
    queryClient.invalidateQueries({ queryKey: ['summary_query'] })
    queryClient.invalidateQueries({ queryKey: ['goals_list'] })
  }

  return (
    <div className="flex flex-wrap gap-3">
      {data?.map(goal => {
        return (
          <div
            key={goal.id}
            className={
              goal?.completionCount >= goal?.desiredWeeklyFrequency
                ? 'cursor-not-allowed flex items-center pr-4 rounded-full border border-dashed border-zinc-800'
                : 'flex items-center pr-4 rounded-full border border-dashed border-zinc-800 hover:border-violet-600'
            }
          >
            <OutlineButton
              key={goal?.id}
              disabled={goal?.completionCount >= goal?.desiredWeeklyFrequency}
              onClick={() => handleCompleteGoal(goal?.id)}
            >
              <Plus className="size-4 text-zinc-400 mb-0.5" />
              {goal?.title}
            </OutlineButton>
            <Trash
              onClick={() => handleDeleteGoal(goal?.id)}
              className="cursor-pointer size-4 mb-1 text-zinc-400 hover:text-violet-600"
            />
          </div>
        )
      })}
    </div>
  )
}

export default GoalsList
