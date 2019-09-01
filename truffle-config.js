const HDWalletProvider = require('truffle-hdwallet-provider')
const infuraKey = "https://ropsten.infura.io/v3/87ac5f84d691494588f2162b15d1523d"

const fs = require('fs')
const mnemonic = fs.readFileSync(".secret").toString().trim()

module.exports = {
    networks: {
        development: {
            provider: () => new HDWalletProvider(mnemonic, 'http://localhost:8545'),
            network_id: '*',
        },
        ropsten: {
            provider: () => new HDWalletProvider(mnemonic, infuraKey),
            network_id: 3,       // Ropsten's id
            gas: 8000000,        // Ropsten has a lower block limit than mainnet
            gasPrice: 20e9,
            timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
            skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
        }
    }
}
