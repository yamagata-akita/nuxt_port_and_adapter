import 'reflect-metadata'
import { TYPES } from './types'
import { Container } from 'inversify'
import { SendMoneyUseCase } from '../application/port/in/sendMoneyUseCase'
import { SendMoneyService } from '../application/domain/service/sendMoneyService'
import { LoadAccountPort } from '../application/port/out/loadAccountPort'
import { UpdateAccountStatePort } from '../application/port/out/updateAccountStatePort'
import { AccountPersistenceAdapter } from '../adapter/out/persistence/accountPersistenceAdapter'

const container = new Container()
container.bind<SendMoneyUseCase>(TYPES.SendMoneyUseCase).to(SendMoneyService)
container.bind<LoadAccountPort>(TYPES.LoadAccountPort).to(AccountPersistenceAdapter)
container.bind<UpdateAccountStatePort>(TYPES.UpdateAccountStatePort).to(AccountPersistenceAdapter)

export { container }