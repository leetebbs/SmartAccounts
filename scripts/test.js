const hre = require("hardhat");

const ACCOUNT_ADDR = "0xa7c060c32b5d7b1f99bb88ba547fcf1df89df4d5"



async function main() {
    const account = await hre.ethers.getContractAt("Account", ACCOUNT_ADDR);
    const count = await account.count();
    console.log(count);
}
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });