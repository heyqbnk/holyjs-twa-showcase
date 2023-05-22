export function getActivityTitle(activityType: string): string | null {
  return {
    interview: 'Интервью',
    masterclass: 'Мастер-класс',
    talk: 'Доклад и дискуссия',
    conversation: 'Обсуждение',
    bof_session: null,
    workshop: 'Воркшоп'
  }[activityType] || null;
}