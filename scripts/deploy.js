async function main() {
  const CutePoopNFT = await ethers.getContractFactory("CutePoopNFT")

  // Start deployment, returning a promise that resolves to a contract object
  const cutePoopNFT = await CutePoopNFT.deploy()
  console.log("Contract deployed to address:", cutePoopNFT.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
