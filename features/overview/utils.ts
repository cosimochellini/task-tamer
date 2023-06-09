import type { HabitFrequency } from '@prisma/client'

import type { HabitResult } from '@/store/habits'
import {
  firstDayOfTheMonth,
  firstDayOfTheWeek,
  firstDayOfTheYear,
  greater,
  removeHours,
  today,
} from '@/utils/date'

const firstDayStrategy = {
  DAILY: today,
  WEEKLY: firstDayOfTheWeek,
  MONTHLY: firstDayOfTheMonth,
  YEARLY: firstDayOfTheYear,
} as const satisfies Record<HabitFrequency, () => Date>

export const currentPeriodLogs = ({ habitLogs, frequency }: HabitResult) => {
  const startDate = removeHours(firstDayStrategy[frequency]())

  return habitLogs.filter((log) => greater(log.date, startDate))
}
