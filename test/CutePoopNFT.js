const { web3, assert } = require("hardhat");

const CutePoopNFT = artifacts.require('CutePoopNFT')

const contractName = "CutePoopNFT";
const tokenName = "POOP";
const initBaseURI = "https://gateway.pinata.cloud/ipfs/QmdjyGbNNNsvU2PQwn1q2MZ2TdNi1NTFQj57kkHpdvdeQT/";
const initNotRevealURI = "https://gateway.pinata.cloud/ipfs/QmQPB177S6e5wzXS8C2V5VmULpgsGpNcoAeiXSDUu3SU1T/1.json";

describe('CutePoopNFT contract', function () {
  let accounts;
  let cutepoop;

  before(async function () {
    accounts = await web3.eth.getAccounts()
    cutepoop = await CutePoopNFT.new(
      contractName,
      tokenName,
      initBaseURI,
      initNotRevealURI
    )
  })

  describe("Deployment", function () {
    it("Should deploy with the right parameters", async function () {
      assert.equal(await cutepoop.owner(), accounts[0])
      assert.equal(await cutepoop.name(), contractName)
      assert.equal(await cutepoop.symbol(), tokenName)
      assert.equal(await cutepoop.notRevealedURI(), initNotRevealURI)
      assert.equal(await cutepoop.totalSupply(), "0")
    })
  })

  describe("User", function () {
    it("Should send ether to mint", async function () {
      try {
        await cutepoop.mintNFT(1, {
          from: accounts[1],
          value: web3.utils.toWei('0.02', 'ether')
        })
      } catch (err) {
        assert(err)
      }
    })

    it("Can mint 1 NFT for 0.04 ether", async function () {
      await cutepoop.mintNFT("1", {
        from: accounts[1],
        value: web3.utils.toWei('0.04', 'ether')
      })
      assert.equal(await cutepoop.totalSupply(), "1")
      assert.equal(await cutepoop.ownerOf("1"), accounts[1])
    })

    it("Can mint 10 NFT for 0.4 ether", async function () {
      await cutepoop.mintNFT("10", {
        from: accounts[2],
        value: web3.utils.toWei('0.4', 'ether')
      })
      assert.equal(await cutepoop.totalSupply(), "11")
      assert.equal(await cutepoop.ownerOf("11"), accounts[2])
    })

    it("Can't mint 21 NFT for 0.84 ether", async function () {
      try {
        await cutepoop.mintNFT("21", {
          from: accounts[3],
          value: web3.utils.toWei('0.84', 'ether')
        })
      } catch (err) {
        assert(err)
      }
    })
  })

  describe("Owner", function () {
    it("Can mint 1 for free", async function () {
      await cutepoop.mintNFT("1", {
        from: accounts[0],
        value: web3.utils.toWei('0.00', 'ether')
      })

      assert.equal(await cutepoop.totalSupply(), "12")
      assert.equal(await cutepoop.ownerOf("12"), accounts[0])
    })

    it("Can send giveway to winner", async function () {
      const tx = await cutepoop.mintNFTGivewayPrize(accounts[3], 10001, {
        from: accounts[0],
        value: web3.utils.toWei('0.00', 'ether')
      })

      assert.equal(await cutepoop.totalSupply(), "13")
      assert.equal(await cutepoop.ownerOf("10001"), accounts[3])
    })
  })
})
