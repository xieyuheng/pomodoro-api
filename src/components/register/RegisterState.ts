import { VerifyingJson } from "@/types/VerifyingJson"
import { Verifying } from "./models/Verifying"

export class RegisterState {
  lang = useLang()
  theme = useTheme()

  verifying: Verifying | null = null

  verify(json: VerifyingJson) {
    this.verifying = new Verifying(json)
  }
}
