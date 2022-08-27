export const getETHTransactionDate = (time: string): Date =>
  new Date(+time.slice(0, 2) > 30 ? `19${time}` : `20${time}`)
