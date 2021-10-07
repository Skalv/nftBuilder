require("dotenv").config()
const API_URL = process.env.ALCHEMY_API
const METAMASK_PRIVATE = process.env.METAMASK_PRIVATE_KEY
const METAMASK_PUBLIC = process.env.METAMASK_PUBLIC_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/cutepoop.sol/CutePoopNFT.json")
const contractAddr = "0xC6d4605f61F8164378F0a8956e4035597e7E7FE9"

const nftContract = new web3.eth.Contract(contract.abi, contractAddr)

async function mintNFT(tokenURI) {
  console.log(METAMASK_PUBLIC)
  const nonce = await web3.eth.getTransactionCount(METAMASK_PUBLIC, 'latest')

  const tx = {
    'from': METAMASK_PUBLIC,
    'to': contractAddr,
    'nonce': nonce,
    'gas': 500000,
    'data': nftContract.methods.mintNFT(METAMASK_PUBLIC, tokenURI).encodeABI()
  }

  const signPromise = web3.eth.accounts.signTransaction(tx, METAMASK_PRIVATE)
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            )
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log(" Promise failed:", err)
    })
}

mintNFT(
  "https://gateway.pinata.cloud/ipfs/QmPo9gme1DTCNJ4UXS195tXVjy3H2FP5eiLaNZpvUHgNEx"
)