import { defineAsyncState } from "@/framework/utils/defineAsyncState"
import { Auth } from "../states/Auth"

export const { use: useAuth } = defineAsyncState(() => new Auth().loadUser())
