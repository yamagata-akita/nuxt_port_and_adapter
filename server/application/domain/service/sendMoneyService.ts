import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { TYPES } from '../../../di-container/types'
import { SendMoneyUseCase } from '../../port/in/sendMoneyUseCase'
import { SendMoneyCommand } from '../../port/in/sendMoneyCommand'
import { Account } from '../model/account'
import { LoadAccountPort } from '../../port/out/loadAccountPort'
import { UpdateAccountStatePort } from '../../port/out/updateAccountStatePort'

@injectable()
export class SendMoneyService implements SendMoneyUseCase {
  constructor(
    @inject(TYPES.LoadAccountPort) private loadAccountPort: LoadAccountPort,
    @inject(TYPES.UpdateAccountStatePort) private updateAccountStatePort: UpdateAccountStatePort
  ) {}

  public async sendMoney(command: SendMoneyCommand): Promise<boolean> {
    this.checkThreshold(command)

    const baselineDate: Date = new Date()
    baselineDate.setDate(baselineDate.getDate() - 10)

    const sourceAccount: Account = await this.loadAccountPort.loadAccount(
      command.sourceAccountId,
      baselineDate
    )
    const targetAccount: Account = await this.loadAccountPort.loadAccount(
      command.targetAccountId,
      baselineDate
    )

    const sourceAccountId = sourceAccount.getId()
    const targetAccountId = targetAccount.getId()

    // accountLock.lockAccount(sourceAccountId)
    if (!sourceAccount.withdraw(command.money, targetAccountId)) {
      // accountLock.releaseAccount(sourceAccountId)
      return false
    }

    // accountLock.lockAccount(targetAccountId)
    if (!targetAccount.deposit(command.money, sourceAccountId)) {
      // accountLock.releaseAccount(sourceAccountId)
      return false
    }

    await this.updateAccountStatePort.updateActivities(sourceAccount)
    await this.updateAccountStatePort.updateActivities(targetAccount)

    // accountLock.releaseAccount(sourceAccountId)
		// accountLock.releaseAccount(targetAccountId)
		return true
  }

  private checkThreshold(command: SendMoneyCommand): void {
    if (command.money > BigInt(100000)) {
      throw new Error('The threshold of 100000 for a single transaction is exceeded')
    }
  }
}

