import { AccountEntity } from './accountEntity'

export class AccountRepository {
  async findById(accountId: string): Promise<AccountEntity> {
    const query: string = `SELECT * FROM account WHERE id = '${accountId}'`
    // const account: AccountEntity = await this.db.query(query)
    // return account
    // 仮実装
    return {
      tableName: 'account',
      column: {
        id: 'id_kari'
      }
    } as AccountEntity
  }
}