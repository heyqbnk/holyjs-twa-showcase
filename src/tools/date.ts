export function extractTime(date: Date): string {
  return new Intl
    .DateTimeFormat('ru-RU', {
      hour: 'numeric',
      minute: 'numeric'
    })
    .format(date);
}