import { defineState } from "../plugins/utils/defineState"
import { Lang } from "../states/Lang"

export const { use: useLang } = defineState(new Lang("en"))
