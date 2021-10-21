async function main() {
  const CutePoopNFT = await ethers.getContractFactory("CutePoopNFT")

  // Start deployment, returning a promise that resolves to a contract object
  const cutePoopNFT = await CutePoopNFT.deploy(
    "CutePoopNFT",
    "POOP",
    "https://gateway.pinata.cloud/ipfs/QmdjyGbNNNsvU2PQwn1q2MZ2TdNi1NTFQj57kkHpdvdeQT/",
    "https://gateway.pinata.cloud/ipfs/QmQPB177S6e5wzXS8C2V5VmULpgsGpNcoAeiXSDUu3SU1T/1.json"
  )
  console.log("Contract deployed to address:", cutePoopNFT.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
