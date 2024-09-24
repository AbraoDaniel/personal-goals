import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '../ui/dialog'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from '../ui/radio-group'
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
            <DialogTitle>Cadastrar meta</DialogTitle>
            <DialogClose>
              <X className="size-5 text-zinc-600" />
            </DialogClose>
          </div>
          <DialogDescription>
            Adicione atividades que te fazem bem e que você quer continuar
            praticando toda semana.
          </DialogDescription>
        </div>
        <form
          onSubmit={handleSubmit(handleCreateNewGoal)}
          className="flex-1 flex flex-col justify-between"
        >
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Qual a atividade?</Label>
              <Input
                id="title"
                autoFocus
                placeholder="Acordar cedo, ir para a academia, etc..."
                {...register('title')}
              />

              {formState.errors.title && (
                <p className="text-red-400 text-sm">
                  {formState.errors.title.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Quantas vezes na semana?</Label>
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
                            frequency={field.value}
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
                Fechar
              </Button>
            </DialogClose>
            <Button className="flex-1">Salvar</Button>
          </div>
        </form>
      </div>
    </DialogContent>
  )
}

export default CreateGoal
