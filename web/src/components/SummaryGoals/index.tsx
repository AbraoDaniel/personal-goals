import { CheckCircle2, Plus } from 'lucide-react'
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

  return (
    <div className="py-10 max-w-[480px] px-5 mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <PrincipalIcon />
          <span className="text-lg font-semibold capitalize">{`${firstWeekDay} - ${lastWeekDay}`}</span>
        </div>
        <DialogTrigger asChild>
          <Button size="sm">
            <Plus className="size-4" />
            Cadastrar Meta
          </Button>
        </DialogTrigger>
      </div>

      <div className="flx flex-col gap-3">
        <Progress value={8} max={15}>
          <ProgressIndicator style={{ width: `${completedPercentage}%` }} />
        </Progress>
        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>
            Você completou{' '}
            <span className="text-zinc-100">{data?.completed}</span> de{' '}
            <span className="text-zinc-100">{data?.total}</span> metas nessa
            semana
          </span>
          <span>{completedPercentage}%</span>
        </div>
      </div>

      <Separator />

      <GoalsList />

      <h2 className="text-xl font-medium">Sua semana</h2>
      {Object?.entries(data?.goalsPerDay)?.map(([date, goals]) => {
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
                  const formattedHour = dayjs(goal.completedAt).format('HH:mm')

                  return (
                    <li key={goal.id} className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-pink-500" />
                      <span className="text-sm text-zinc-400">
                        Você completou "
                        <span className="text-zinc-100">{goal.title}</span>" às{' '}
                        <span className="text-zinc-100">{formattedHour}h</span>
                        <span className="ml-3 text-xs hover:text-pink-500">
                          <button
                            type="button"
                            onClick={() => alert('desfazer')}
                          >
                            {' '}
                            Desfazer
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
      })}
    </div>
  )
}

export default SummaryGoals
