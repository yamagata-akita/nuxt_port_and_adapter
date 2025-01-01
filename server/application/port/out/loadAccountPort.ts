import { Account } from '../../domain/model/account'

export interface LoadAccountPort {
  loadAccount(accountId: string, baselineDate: Date): Promise<Account>
}