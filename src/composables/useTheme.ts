import { defineState } from "@/framework/utils/defineState"
import { Theme } from "../states/Theme"

export const useTheme = defineState(new Theme())
