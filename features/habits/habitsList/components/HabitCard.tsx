import Link from 'next/link'
import type { Habit } from '@prisma/client'

import { fetcher } from '@/utils/fetch'
import { useModal } from '@/store/modal'
import { reloadHabits } from '@/store/habits'
import { startLoading, stopLoading } from '@/store/loading'
import type { DeleteHabitResult } from '@/app/api/habits/[id]/route'
import { HabitCategoryIconBadge } from '@/components/habits/HabitCategoryIcon'
import { HabitFrequencyBadge } from '@/components/habits/HabitFrequencyBadge'

interface HabitCardProps {
  habit: Habit
}

const deleteHabit = (id: string) => fetcher<DeleteHabitResult>(`/api/habits/${id}`, 'DELETE')()

const DeleteModal = () => (
  <div>
    <h3 className='font-bold text-lg'>Delete Habit</h3>
    <p className='py-4'>You are about to delete this habit, are you sure?</p>
  </div>
)

export const HabitCard = ({ habit }: HabitCardProps) => {
  const openModal = useModal(DeleteModal)
  const onDeleteClick = async () => {
    const { reason } = await openModal({ outsideClick: true, modalActions: true })

    if (reason === 'cancel') return

    startLoading()

    const { result: deleteResult } = await deleteHabit(habit.id)

    if (deleteResult.count > 0) await reloadHabits()

    stopLoading()
  }

  return (
    <div className='card w-full bg-primary text-primary-content'>
      <div className='card-body'>
        <h2 className='card-title flex justify-between'>
          <span className='capitalize'>{habit.name}</span>
          <HabitCategoryIconBadge compact category={habit.habitCategory} />
        </h2>

        <p className='italic text-sm color-neutral'>{habit.description}</p>

        <div>
          <HabitFrequencyBadge habit={habit} />
        </div>

        <div className='card-actions justify-end'>
          <button type='button' className='btn btn-sm btn-accent' onClick={onDeleteClick}>
            Delete
          </button>
          <Link href={`/habits/${habit.id}`} className='btn btn-sm btn-secondary'>
            Edit
          </Link>
        </div>
      </div>
    </div>
  )
}
