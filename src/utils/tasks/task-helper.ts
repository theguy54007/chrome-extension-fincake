export function sumTotalValue(tasks: any[], totalField: string) {
  return tasks.reduce((sum, current) => sum + (current[totalField] || 0), 0)
}
