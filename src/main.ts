import POW from "./pow"

const args = process.argv.slice(2)

if (args.length < 2) {
    console.error("Usage: npx ts-node main.ts <pattern> <key>")
    console.error("Usage: npx ts-node main.ts 1234 <a_very_secret_key>")
    process.exit(1)
}

let pattern = args[0]
let key = args[1]

const pow = new POW(key, pattern)

pow.giveProof()

let found_nonce = pow.getNonce()
let found_proof = pow.getProof()

pow.verify(found_nonce, found_proof)
