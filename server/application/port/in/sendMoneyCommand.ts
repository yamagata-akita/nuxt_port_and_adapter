// 入力モデル
// 入力値の構文的な妥当性確認を行う

export class SendMoneyCommand {
  readonly sourceAccountId: string
  readonly targetAccountId: string
  readonly money: bigint

  constructor(
    sourceAccountId: string,
    targetAccountId: string,
    money: bigint
  ) {
    if (typeof sourceAccountId !== 'string' || sourceAccountId === '') {
      throw new Error('sourceAccountId must be a non-empty string')
    }
    if (typeof targetAccountId !== 'string' || targetAccountId === '') {
      throw new Error('targetAccountId must be a non-empty string')
    }
    if (typeof money !== 'bigint' || money <= BigInt(0)) {
      throw new Error('money must be a positive bigint')
    }
    this.sourceAccountId = sourceAccountId
    this.targetAccountId = targetAccountId
    this.money = money
  }
}