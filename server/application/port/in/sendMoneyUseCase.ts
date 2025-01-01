import { SendMoneyCommand } from './sendMoneyCommand'

export interface SendMoneyUseCase {
  sendMoney(command: SendMoneyCommand): Promise<boolean>
}