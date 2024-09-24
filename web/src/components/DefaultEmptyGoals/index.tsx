import { Plus } from 'lucide-react'
import { Button } from '../ui/button'
import { DialogTrigger } from '../ui/dialog'
import defaultIllustration from '../../assets/rocket-launch-illustration.svg'
const DefaultEmptyGoals: React.FC = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-8">
      <div className="flex inline-block items-center">
        <img className="w-8" src={'public/icon.png'} alt="logo" />
        <span className="ml-2 text-lg font-bold text-zinc-300">
          Danti Goals
        </span>
      </div>
      <img src={defaultIllustration} alt="default-illustration" />
      <p className="text-zinc-300 leading-relaxed max-w-80 text-center">
        You haven't set any goals yet, how about setting one right now?
      </p>

      <DialogTrigger asChild>
        <Button>
          <Plus className="size-4" />
          Create goal
        </Button>
      </DialogTrigger>
    </div>
  )
}

export default DefaultEmptyGoals
