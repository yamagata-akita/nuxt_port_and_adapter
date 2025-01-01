export type ActivityEntity = {
  tableName: 'activity',
  column: {
    id: string | null,
    timestamp: Date,
    ownerAccountId: string,
    sourceAccountId: string,
    targetAccountId: string,
    amount: bigint
  }
}