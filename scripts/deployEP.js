const hre = require("hardhat");

async function main() {
    const entryPoint = await hre.ethers.getContractFactory("EntryPoint");
    const EntryPoint = await entryPoint.deploy();
    console.log("EntryPoint deployed to:", EntryPoint.target);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });