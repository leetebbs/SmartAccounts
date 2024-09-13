
const hre = require("hardhat");

async function main() {

    const EP_ADDRESS = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";
    const PM_ADDRESS = "0xeaAE40c25b78Ff67C36aF445f01E96DF2e107c80";

    const entryPoint = await hre.ethers.getContractAt("EntryPoint", EP_ADDRESS);
 

    await entryPoint.depositTo(PM_ADDRESS, {
        value: hre.ethers.parseEther(".2"),
    })

    console.log("deposit was successful!");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });