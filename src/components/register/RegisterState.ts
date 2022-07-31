import { VerifyingJson, VerifyingSchema } from "@/types/VerifyingJson"

export class RegisterState {
  lang = useLang()
  theme = useTheme()

  verifying: Verifying | null = null

  verify(json: any) {
    this.verifying = new Verifying(VerifyingSchema.validate(json))
  }
}

export interface Verifying extends VerifyingJson {}
export class Verifying {
  constructor(json: VerifyingJson) {
    Object.assign(this, json)
  }

  get links() {
    return {
      verify: `/api/register/${this.verification_token}/verify`,
      revoke: `/api/register/${this.verification_token}/revoke`,
    }
  }
}
