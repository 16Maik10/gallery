export const useSummary = () => useState<number>('summary', () => 0)
export const useCards = () => useState<Object>('cards', () => ({}))