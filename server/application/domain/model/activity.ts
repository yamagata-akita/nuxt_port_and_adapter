export class Activity {
  private id: string | null
  private ownerAccountId: string
  private sourceAccountId: string
  private targetAccountId: string
  private timestamp: Date
  private money: bigint

  constructor(
    ownerAccountId: string,
    sourceAccountId: string,
    targetAccountId: string,
    timestamp: Date,
    money: bigint
  ) {
    this.id = null
    this.ownerAccountId = ownerAccountId
    this.sourceAccountId = sourceAccountId
    this.targetAccountId = targetAccountId
    this.timestamp = timestamp
    this.money = money
  }

  public getId(): string | null {
    return this.id
  }

  public getOwnerAccountId(): string {
    return this.ownerAccountId
  }

  public getSourceAccountId(): string {
    return this.sourceAccountId
  }

  public getTargetAccountId(): string {
    return this.targetAccountId
  }

  public getTimestamp(): Date {
    return this.timestamp
  }

  public getMoney(): bigint {
    return this.money
  }
}