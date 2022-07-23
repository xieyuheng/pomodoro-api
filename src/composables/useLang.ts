import { Lang } from "../states/Lang"
import { defineState } from "../utils/defineState"

export const { use: useLang } = defineState(new Lang("en"))
