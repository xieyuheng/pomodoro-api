import { Model } from "../framework/database/Model"
import { PomodoroJson, PomodoroSchema } from "../jsons/PomodoroJson"

export interface Pomodoro extends PomodoroJson {}

export class Pomodoro extends Model<PomodoroJson> {
  schema = PomodoroSchema
}
