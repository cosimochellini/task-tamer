import Head from 'next/head'

import { HabitDetail } from '@/features/habits/habitDetail'
import { useCurrentHabit } from '@/hooks/habits/currentHabit'

const HabitDetailPage = () => {
  const actualHabit = useCurrentHabit()

  if (!actualHabit) return null

  return (
    <div>
      <Head>
        <title>Habits tamer - {actualHabit.name}</title>
      </Head>
      <HabitDetail habit={actualHabit} />
    </div>
  )
}
export default HabitDetailPage
