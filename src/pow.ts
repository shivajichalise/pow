import { sha256 } from "js-sha256"

class POW {
    private secret_key: string
    private desired_pattern: string
    private nonce: number
    private proof: string

    constructor(secret_key: string, desired_pattern: string) {
        this.secret_key = secret_key
        this.desired_pattern = desired_pattern
        this.nonce = 0
        this.proof = ""
    }

    public getNonce(): number {
        return this.nonce
    }

    public getProof(): string {
        return this.proof
    }

    public giveProof(): void {
        let data
        let result_hash

        while (true) {
            data = this.nonce + this.secret_key
            result_hash = sha256.hex(data)

            if (result_hash.startsWith(this.desired_pattern)) {
                console.log("Found n: ", this.nonce)
                console.log("Hash: ", result_hash)

                this.proof = result_hash
                break
            }

            this.nonce += 1
        }
    }

    public verify(nonce: number, result_hash: string): void {
        let hash = sha256.hex(nonce + this.secret_key)
        if (hash === result_hash) {
            console.log("Verified!")
        } else {
            console.log("Invalid!")
        }
    }
}

export default POW
