import { LoadAccountPort } from '../../../application/port/out/loadAccountPort'
import { UpdateAccountStatePort } from '../../../application/port/out/updateAccountStatePort'
import { Account } from '../../../application/domain/model/account'
import { AccountEntity } from './accountEntity'
import { ActivityEntity } from './activityEntity'
import { AccountMapper } from './accountMapper'
import { AccountRepository } from './accountRepository'
import { ActivityRepository } from './activityRepository'

export class AccountPersistenceAdapter implements LoadAccountPort, UpdateAccountStatePort {
  private accountRepository: AccountRepository = new AccountRepository()
  private activityRepository: ActivityRepository = new ActivityRepository()
  private accountMapper: AccountMapper = new AccountMapper()

  public async loadAccount(accountId: string, baselineDate: Date): Promise<Account> {
    const account: AccountEntity = await this.accountRepository.findById(accountId)  

    const activities: ActivityEntity[]
      = await this.activityRepository.findByOwnerSince(accountId, baselineDate)

    const withdrawalBalance: bigint
      = await this.activityRepository.getWithdrawalBalanceUntil(accountId, baselineDate)
    
    const depositBalance: bigint
      = await this.activityRepository.getDepositBalanceUntil(accountId, baselineDate)

    
    // ドメインモデルに変換して返却
    return this.accountMapper.mapToDomainEntity(
      account,
      activities,
      withdrawalBalance,
      depositBalance
    )
  }

  public async updateActivities(account: Account): Promise<void> {
    for (const activity of account.getActivityWindow().getActivities()) {
      // エンティティに変換して保存
      await this.activityRepository.save(this.accountMapper.mapToEntity(activity));
    }
  }
}