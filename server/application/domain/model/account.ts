import { ActivityWindow } from './activityWindow'
import { Activity } from './activity'

export class Account {
  private id: string
  private baselineBalance: bigint // 基準日が始まる時点の口座残高
  private activityWindow: ActivityWindow // 取引の履歴

  constructor(id: string, baselineBalance: bigint, activityWindow: ActivityWindow) {
    this.id = id
    this.baselineBalance = baselineBalance
    this.activityWindow = activityWindow
  }

  public getId(): string {
    return this.id
  }

  public getBaselineBalance(): bigint {
    return this.baselineBalance
  }

  public getActivityWindow(): ActivityWindow {
    return this.activityWindow
  }

  /**
   * 残高を計算する
   * @returns 口座の残高
   */
  public calculateBalance(): bigint {
    return this.baselineBalance + this.activityWindow.calculateBalance(this.id)
  }

  /**
   * 自身の口座から引き出す
   * ※自身の口座から送金先の口座に送金した、という取引を取引履歴に追加する
   * @param money 
   * @param targetAccountId 
  * @returns 引き出しが成功したかを示すboolean
   */
  public withdraw(money: bigint, targetAccountId: string): boolean {
    if (!this.mayWithdraw(money)) {
        return false
    }

    const withdrawal = new Activity(
      this.id, // 口座所有者の口座ID
      this.id, // 送金元の口座ID
      targetAccountId, // 送金先の口座ID
      new Date(),
      money
    )
    this.activityWindow.addActivity(withdrawal)

    return true
  } 

  /**
   * 引き出せる金額かどうかの判定
   * @param money 
   * @returns 引き出し可否を示すboolean
   */
  private mayWithdraw(money: bigint): boolean {
    return this.calculateBalance() >= money
  }

  /**
   * 自身の口座に預け入れる
   * ※送金元の口座から自身の口座に送金された、という取引を取引履歴に追加する
   * @param money 
   * @param sourceAccountId 
   * @returns 
   */
  public deposit(money: bigint, sourceAccountId: string): boolean {
    const deposit = new Activity(
      this.id, // 口座所有者の口座ID
      sourceAccountId, // 送金元の口座ID
      this.id, // 送金先の口座ID
      new Date(),
      money
    )
    this.activityWindow.addActivity(deposit)

    return true
  }
}