import {
  BicepsFlexed,
  ChartNoAxesCombined,
  Flame,
  Gauge,
  HandMetal,
  Lightbulb,
  Rocket,
} from 'lucide-react'
import type { IGoalFrequency } from '../types/createGoals'

export const frequencyFields: IGoalFrequency[] = [
  { value: '1', emoji: <Lightbulb /> },
  { value: '2', emoji: <ChartNoAxesCombined /> },
  { value: '3', emoji: <Gauge /> },
  { value: '4', emoji: <HandMetal /> },
  { value: '5', emoji: <BicepsFlexed /> },
  { value: '6', emoji: <Flame /> },
  { value: '7', emoji: <Rocket /> },
]
