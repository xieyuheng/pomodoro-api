import { defineState } from "@/framework/utils/defineState"
import { Lang } from "../states/Lang"

export const useLang = defineState(new Lang("en"))
