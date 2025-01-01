import { Activity } from './activity'

export class ActivityWindow {
  private activities: Activity[]

  constructor(activities: Activity[]) {
    this.activities = activities
  }

  public calculateBalance(accountId: string): bigint {
    const depositBalance: bigint = this.activities
      .filter((activity: Activity) => 
        activity.getTargetAccountId() === accountId)
      .reduce((total: bigint, activity: Activity) => 
        total + activity.getMoney(), BigInt(0))
    
    const withdrawalBalance: bigint = this.activities
      .filter((activity: Activity) =>
        activity.getSourceAccountId() === accountId)
      .reduce((total: bigint, activity: Activity) =>
        total + activity.getMoney(), BigInt(0))
    
    return depositBalance - withdrawalBalance
  }

  // public List<Activity> getActivities() {
	// 	return Collections.unmodifiableList(this.activities);
	// }
  public getActivities(): Activity[] {
		return this.activities
	}

  public addActivity(activity: Activity): void {
    this.activities.push(activity)
  }
}