import { CheckCircle2, Plus, CircleSlash } from 'lucide-react'
import { Button } from '../ui/button'
import { DialogTrigger } from '../ui/dialog'
import { PrincipalIcon } from '../PrincipalIcon'
import { Progress, ProgressIndicator } from '../ui/progress-bar'
import { Separator } from '../ui/separator'
import { getSummary } from '../../services/get-summary'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import GoalsList from '../GoalsList'

const SummaryGoals: React.FC = () => {
  const { data } = useQuery({
    queryKey: ['summary_query'],
    queryFn: getSummary,
    staleTime: 1000 * 60,
  })

  if (!data) {
    return null
  }

  const firstWeekDay = dayjs().startOf('week').format('DD MMM')
  const lastWeekDay = dayjs().endOf('week').format('DD MMM')

  const completedPercentage = Math.round((data?.completed * 100) / data?.total)
  const hasData = Object?.keys(data?.goalsPerDay)?.length > 0

  return (
    <div className="py-10 max-w-[480px] px-5 mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img className="w-7" src="public/icon.png" alt="icon" />
          <span className="text-lg font-semibold">
            {
              <>
                <span>{`${firstWeekDay}`}</span> to{' '}
                <span>{`${lastWeekDay}`}</span>
              </>
            }
          </span>
        </div>
        <DialogTrigger asChild>
          <Button size="sm">
            <Plus className="size-4" />
            Create goal
          </Button>
        </DialogTrigger>
      </div>

      <div className="flx flex-col gap-3">
        <Progress value={8} max={15}>
          <ProgressIndicator style={{ width: `${completedPercentage}%` }} />
        </Progress>
        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>
            You have completed{' '}
            <span className="text-zinc-100">{data?.completed}</span> of{' '}
            <span className="text-zinc-100">{data?.total}</span> goals this week
          </span>
          <span>{completedPercentage}%</span>
        </div>
      </div>

      <Separator />

      <GoalsList />

      {hasData && <h2 className="text-xl font-medium">Your week</h2>}
      {hasData ? (
        Object?.entries(data?.goalsPerDay)?.map(([date, goals]) => {
          const weekDay = dayjs(date).format('dddd')
          const formattedDate = dayjs(date).format('D [of] MMMM')

          return (
            <div key={date} className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <h3 className="font-medium">
                  <span className="capitalize">{weekDay} </span>
                  <span className="text-zinc-400 text-xs">{formattedDate}</span>
                </h3>

                <ul className="flex flex-col gap-3">
                  {goals.map(goal => {
                    const formattedHour = dayjs(goal.completedAt).format(
                      'HH:mm'
                    )

                    return (
                      <li key={goal.id} className="flex items-center gap-2">
                        <CheckCircle2 className="size-4 text-pink-500" />
                        <span className="text-sm text-zinc-400">
                          You have completed "
                          <span className="text-zinc-100">{goal.title}</span>"
                          on{' '}
                          <span className="text-zinc-100">
                            {formattedHour}h
                          </span>
                          <span className="ml-3 text-xs hover:text-pink-500">
                            <button
                              type="button"
                              onClick={() => alert('desfazer')}
                              hidden
                            >
                              {' '}
                              Undo
                            </button>
                          </span>
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          )
        })
      ) : (
        <div className="flex flex-col items-center gap-3">
          <CircleSlash className="text-zinc-500 size-8" />
          <p className="text-zinc-500 text-lg leading-relaxed max-w-80 text-center">
            You haven't completed any goals this week yet
          </p>
        </div>
      )}
    </div>
  )
}

export default SummaryGoals
