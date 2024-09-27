import { RadioGroupIndicator, RadioGroupItem } from '../ui/radio-group'
import type { IGoalFrequency } from '../../types/createGoals'

const GoalFrequencyRadioItem: React.FC<IGoalFrequency> = ({
  frequency,
  emoji,
}) => {
  return (
    <RadioGroupItem value={frequency}>
      <RadioGroupIndicator />
      <span className="text-zinc-300 text-sm font-medium leading-none group-data-[state=checked]:text-violet-600">
        {frequency}x per week
      </span>
      <span className="text-lg leading-none size-6 group-data-[state=checked]:text-violet-600">
        {emoji}
      </span>
    </RadioGroupItem>
  )
}

export default GoalFrequencyRadioItem
