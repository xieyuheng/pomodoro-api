import { defineState } from "@/framework/utils/defineState"
import { Auth } from "../states/Auth"

export const { use: useAuth } = defineState(new Auth())
