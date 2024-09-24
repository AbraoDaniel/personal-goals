import { Dialog } from './components/ui/dialog'
import CreateGoal from './components/CreateGoal'
import SummaryGoals from './components/SummaryGoals'
import DefaultEmptyGoals from './components/DefaultEmptyGoals'
import { useQuery } from '@tanstack/react-query'
import { getSummary } from './services/get-summary'

export function App() {
  const { data } = useQuery({
    queryKey: ['summary_query'],
    queryFn: getSummary,
    staleTime: 1000 * 60,
  })

  return (
    <Dialog>
      {data && data?.total > 0 ? <SummaryGoals /> : <DefaultEmptyGoals />}
      <CreateGoal />
    </Dialog>
  )
}
