const hre = require("hardhat");

async function main() {
    const af = await hre.ethers.getContractFactory("AccountFactory");
    const accountFactory= await af.deploy();
    console.log("AccountFactory deployed to:", accountFactory.target);

    // const entryPoint = await hre.ethers.getContractFactory("EntryPoint");
    // const EntryPoint = await entryPoint.deploy();
    // console.log("EntryPoint deployed to:", EntryPoint.target);

    // const paymaster = await hre.ethers.getContractFactory("Paymaster");
    // const Paymaster = await paymaster.deploy();
    // console.log("Paymaster deployed to:", Paymaster.target);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });