import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '../ui/dialog'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { X } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import type { CreateGoalFields } from '../../types/createGoals'
import { frequencyFields } from '../../util/frequencyFields'
import GoalFrequencyRadioItem from '../GoalFrequencyRadioItem'
import { createNewGoal } from '../../services/create-new-goal'
import { useQueryClient } from '@tanstack/react-query'

const createGoalStructure = z.object({
  title: z.string().min(1, 'Informe a atividade que deseja realizar'),
  desiredWeeklyFrequency: z.coerce.number().min(1).max(7),
})

const CreateGoal: React.FC = () => {
  const queryClient = useQueryClient()
  const { register, control, handleSubmit, formState, reset } =
    useForm<CreateGoalFields>({
      resolver: zodResolver(createGoalStructure),
    })

  async function handleCreateNewGoal(data: CreateGoalFields) {
    await createNewGoal({
      title: data.title,
      desiredWeeklyFrequency: data.desiredWeeklyFrequency,
    })

    queryClient.invalidateQueries({ queryKey: ['summary_query'] })
    queryClient.invalidateQueries({ queryKey: ['goals_list'] })

    reset()
  }

  return (
    <DialogContent>
      <div className="flex flex-col gap-6 h-full">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <DialogTitle>Create Goal</DialogTitle>
            <DialogClose>
              <X className="size-5 text-zinc-600" />
            </DialogClose>
          </div>
          <DialogDescription>
            Add activities you want to practice during the week.
          </DialogDescription>
        </div>
        <form
          onSubmit={handleSubmit(handleCreateNewGoal)}
          className="flex-1 flex flex-col justify-between"
        >
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">What is the activity?</Label>
              <Input
                id="title"
                autoFocus
                placeholder="Waking up early, go to the gym, etc."
                {...register('title')}
              />

              {formState.errors.title && (
                <p className="text-red-400 text-sm">
                  {formState.errors.title.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">How many times per week?</Label>
              <Controller
                defaultValue={1}
                control={control}
                name="desiredWeeklyFrequency"
                render={({ field }) => {
                  return (
                    <RadioGroup
                      onValueChange={field?.onChange}
                      value={String(field?.value)}
                    >
                      {frequencyFields?.map(field => {
                        return (
                          <GoalFrequencyRadioItem
                            key={field.value}
                            value={field.value}
                            emoji={field.emoji}
                          />
                        )
                      })}
                    </RadioGroup>
                  )
                }}
              />
            </div>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <DialogClose asChild>
              <Button type="button" className="flex-1" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <Button className="flex-1">Create</Button>
          </div>
        </form>
      </div>
    </DialogContent>
  )
}

export default CreateGoal
