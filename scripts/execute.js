const hre = require("hardhat");

async function main() {

    const [signer0, signer1] = await hre.ethers.getSigners();
    const address0 = await signer0.getAddress();
  
    const FACTORY_ADDRESS = "0xfCfe9A961c0ccE3E14b8D5750a791f1C9bBD4457";
    const EP_ADDRESS = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";
    // const EP_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
    const PM_ADDRESS = "0xeaAE40c25b78Ff67C36aF445f01E96DF2e107c80";

    const entryPoint = await hre.ethers.getContractAt("EntryPoint", EP_ADDRESS);
 
    const AccountFactory = await hre.ethers.getContractFactory("AccountFactory");
    let initCode = FACTORY_ADDRESS + AccountFactory.interface.encodeFunctionData("createAccount", [address0]).slice(2);

    let sender;

    try {
     await entryPoint.getSenderAddress(initCode)
    } catch (ex) {
        sender = "0x" + ex.data.slice(-40)
    }

    const code = await ethers.provider.getCode(sender);
    console.log(code);

    if(code !== "0x") {
       initCode = "0x";
    }

    console.log("sender: ", sender);

    const Account = await hre.ethers.getContractFactory("Account");

    const userOp = {
        sender,
        nonce: "0x" + (await entryPoint.getNonce(sender, 0)).toString(16),
        initCode,
        callData: Account.interface.encodeFunctionData("execute"),
        paymasterAndData: PM_ADDRESS,
        signature: "0xfffffffffffffffffffffffffffffff0000000000000000000000000000000007aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1c",
    }

    const {preVerificationGas, callGasLimit, verificationGasLimit} = await ethers.provider.send("eth_estimateUserOperationGas",[userOp,EP_ADDRESS])

    userOp.preVerificationGas = preVerificationGas;
    userOp.callGasLimit = callGasLimit;
    userOp.verificationGasLimit = verificationGasLimit;

    const { maxFeePerGas } = await ethers.provider.getFeeData();

    userOp.maxFeePerGas = "0x" + maxFeePerGas.toString(16);
    const maxPriorityFeePerGas = await ethers.provider.send("rundler_maxPriorityFeePerGas");

    userOp.maxPriorityFeePerGas = maxPriorityFeePerGas;



    const userOpHash = await entryPoint.getUserOpHash(userOp);
    userOp.signature = await signer0.signMessage(hre.ethers.getBytes(userOpHash))

    const OpHash = await ethers.provider.send("eth_sendUserOperation", [userOp, EP_ADDRESS]);

  setTimeout(async () => {
    const { transactionHash } = await ethers.provider.send("eth_getUserOperationByHash", [OpHash]);
    console.log("transactionHash: ", transactionHash)
  }, 5000)
  
   

    console.log("OpHash: ", OpHash);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });