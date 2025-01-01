import { Account } from '../../../application/domain/model/account'
import { Activity } from '../../../application/domain/model/activity'
import { ActivityWindow } from '../../../application/domain/model/activityWindow'
import { AccountEntity } from './accountEntity'
import { ActivityEntity } from './activityEntity'

export class AccountMapper {

  public mapToDomainEntity(
    account: AccountEntity,
    activities: ActivityEntity[],
    withdrawalBalance: bigint,
    depositBalance: bigint
  ): Account {
    const baselineBalance: bigint = depositBalance - withdrawalBalance
    return new Account(
      account.column.id,
      baselineBalance,
      this.mapToActivityWindow(activities)
    )
  }

  private mapToActivityWindow(activities: ActivityEntity[]): ActivityWindow {
    const mappedActivities: Activity[] = []
    for (const activity of activities) {
      mappedActivities.push(
        new Activity(
          activity.column.ownerAccountId,
          activity.column.sourceAccountId,
          activity.column.targetAccountId,
          activity.column.timestamp,
          activity.column.amount
        )
      )
    }

    return new ActivityWindow(mappedActivities)
  }

  public mapToEntity(activity: Activity): ActivityEntity {
    return {
      tableName: 'activity',
      column: {
        id: activity.getId(),
        timestamp: activity.getTimestamp(),
        ownerAccountId: activity.getOwnerAccountId(),
        sourceAccountId: activity.getSourceAccountId(),
        targetAccountId: activity.getTargetAccountId(),
        amount: activity.getMoney()
      }
    }
  }
}