import { defineState } from "../plugins/utils/defineState"
import { Theme } from "../states/Theme"

export const { use: useTheme } = defineState(new Theme())
