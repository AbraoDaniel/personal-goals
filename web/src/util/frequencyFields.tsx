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
  { frequency: '1', emoji: <Lightbulb /> },
  { frequency: '2', emoji: <ChartNoAxesCombined /> },
  { frequency: '3', emoji: <Gauge /> },
  { frequency: '4', emoji: <HandMetal /> },
  { frequency: '5', emoji: <BicepsFlexed /> },
  { frequency: '6', emoji: <Flame /> },
  { frequency: '7', emoji: <Rocket /> },
]
