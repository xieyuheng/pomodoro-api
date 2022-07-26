import { useLang } from "../../composables/useLang"
import { useTheme } from "../../composables/useTheme"
import { Verifying } from "./models/Verifying"
import { VerifyingJson } from "@/types/VerifyingJson"

export class RegisterState {
  lang = useLang()
  theme = useTheme()

  verifying: Verifying | null = null

  verify(json: VerifyingJson) {
    this.verifying = new Verifying(json)
  }
}
