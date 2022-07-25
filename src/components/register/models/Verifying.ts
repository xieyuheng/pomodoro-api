export interface VerifyingJson {
  username: string
  email: string
  confirmation_code: string
  verification_token: string
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
