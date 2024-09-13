const hre = require("hardhat");

async function main() {
    const af = await hre.ethers.getContractFactory("AccountFactory");
    const accountFactory= await af.deploy();
    console.log("AccountFactory deployed to:", accountFactory.target);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });