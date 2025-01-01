import { Container } from 'inversify'
import { SendMoneyUseCase } from './application/port/in/sendMoneyUseCase'
import { SendMoneyService } from './application/domain/service/sendMoneyService'
import { LoadAccountPort } from './application/port/out/loadAccountPort'
import { UpdateAccountStatePort } from './application/port/out/updateAccountStatePort'
import { AccountPersistenceAdapter } from './adapter/out/persistence/accountPersistenceAdapter'

const container = new Container()
container.bind<SendMoneyUseCase>('SendMoneyUseCase').to(SendMoneyService)
container.bind<LoadAccountPort>('LoadAccountPort').to(AccountPersistenceAdapter)
container.bind<UpdateAccountStatePort>('UpdateAccountStatePort').to(AccountPersistenceAdapter)

export { container }