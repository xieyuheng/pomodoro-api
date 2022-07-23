import { Theme } from "../states/Theme"
import { defineState } from "../utils/defineState"

export const { use: useTheme } = defineState(new Theme())
