import { container } from '../di-container'
import { SendMoneyUseCase } from '../application/port/in/sendMoneyUseCase'
import { SendMoneyCommand } from '../application/port/in/sendMoneyCommand'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const command = new SendMoneyCommand(
    body.sourceAccountId,
    body.targetAccountId,
    BigInt(body.money)
  )
  
  const sendMoneyUseCase = container.get<SendMoneyUseCase>('SendMoneyUseCase')
  let result: boolean
  try {
    result = await sendMoneyUseCase.sendMoney(command)
  } catch (e: any) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: e.message })
    }
  }
  if (!result) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Failed to send money' })
    }
  }
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'OK' })
  }
})