import { defineState } from "@/framework/utils/defineState"
import { Auth } from "../states/Auth"

export const useAuth = defineState(new Auth())
