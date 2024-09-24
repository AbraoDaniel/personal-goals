import { RadioGroupIndicator, RadioGroupItem } from '../ui/radio-group'

interface IGoalFrequency {
  frequency: string
  emoji: string
}

const GoalFrequencyRadioItem: React.FC<IGoalFrequency> = ({
  frequency,
  emoji,
}) => {
  return (
    <RadioGroupItem value={frequency}>
      <RadioGroupIndicator />
      <span className="text-zinc-300 text-sm font-medium leading-none">
        {frequency}x na semana
      </span>
      <span className="text-lg leading-none">{emoji}</span>
    </RadioGroupItem>
  )
}

export default GoalFrequencyRadioItem
