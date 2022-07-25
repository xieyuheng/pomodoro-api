export interface VerifyingJson {
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
      verify: `/register/${this.verification_token}/verify`,
      revoke: `/register/${this.verification_token}/revoke`,
    }
  }
}
