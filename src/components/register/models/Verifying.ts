import { VerifyingJson } from "@/types/VerifyingJson"

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
