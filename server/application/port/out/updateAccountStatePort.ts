import { Account } from '../../domain/model/account'

export interface UpdateAccountStatePort {
  updateActivities(account: Account): void
}