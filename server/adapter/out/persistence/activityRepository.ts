import { ActivityEntity } from './activityEntity'

export class ActivityRepository {
  async findByOwnerSince(ownerAccountId: string, since: Date): Promise<ActivityEntity[]> {
    const query: string = 
      `SELECT * FROM activity
        WHERE target_account_id = '${ownerAccountId}'
        AND timestamp >= '${since.toISOString()}'`
    // const activities: ActivityEntity[] = await this.db.query(query)
    // return activities
    // 仮実装
    return [{
      tableName: 'activity',
      column: {
        id: 'id_kari',
        timestamp: new Date(),
        ownerAccountId: 'ownerAccountId_kari',
        sourceAccountId: 'sourceAccountId_kari',
        targetAccountId: 'targetAccountId_kari',
        amount: BigInt(100)
      }
    }] as ActivityEntity[]
  }

  async getWithdrawalBalanceUntil(accountId: string, until: Date): Promise<bigint> {
    const query: string =
      `SELECT sum(amount) FROM activity
        WHERE target_account_id = '${accountId}'
        AND owner_account_id = '${accountId}'
        AND timestamp < '${until.toISOString()}'
      `
      // const withdrawalBalance: bigint = await this.db.query(query)
      // return withdrawalBalance
      // 仮実装
      return BigInt(100)
  }

  async getDepositBalanceUntil(accountId: string, until: Date): Promise<bigint> {
    const query: string =
      `SELECT sum(amount) FROM activity
        WHERE source_account = '${accountId}'
        AND owner_account_id = '${accountId}'
        AND timestamp < '${until.toISOString()}'
      `
      // const depositBalance: bigint = await this.db.query(query)
      // return depositBalance
      // 仮実装
      return BigInt(100)
  }

  async save(activity: ActivityEntity): Promise<void> {
    const query: string =
      `INSERT INTO activity
        VALUES (
          '${activity.column.id}',
          '${activity.column.timestamp.toISOString()}',
          '${activity.column.ownerAccountId}',
          '${activity.column.sourceAccountId}',
          '${activity.column.targetAccountId}',
          '${activity.column.amount}'
        )
      `
    // await this.db.query(query)
    return
  }
}