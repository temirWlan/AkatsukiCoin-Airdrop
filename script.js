import abi from "./abi.js";
import ERC20ABI from "./ERC20abi.js";

const connectWalletBtn = document.querySelector("#connect-wallet-btn");
const claimBtn = document.querySelector("#claim-btn");
const contractAddress = "0x52199D1258ca12AD91D3D5991eA986ad37321791";

let isConnected = false;
let isClaimed = false;
let walletAddress;
let signer;
let contract;
let amount;

const provider = new ethers.providers.Web3Provider(window.ethereum);

provider.send("eth_requestAccounts", []).then(() => {
    provider.listAccounts().then((accounts) => {
        walletAddress = accounts[0];
        signer = provider.getSigner(walletAddress);
        contract = new ethers.Contract(contractAddress, abi, signer);
        
        if (window.ethereum._state.accounts && window.ethereum._state?.accounts?.length) {
            claimBtn.addEventListener("click", claim);
            
            if (isClaimed) {
                claimBtn.removeEventListener("click", claim);
            }
        }
    });
});

async function claim() {
    const decimals = await contract.decimals();
    const amount = ethers.utils.parseUnits("1000", 18);
    // ethers.utils.formatUnits("100", decimals)
    await contract.allowance(contractAddress, walletAddress);
    await contract.approve(walletAddress, 1000);
    await contract.transfer(walletAddress, amount).then((tx) => console.log(tx));
    // const data = contract.interface.encodeFunctionData("transfer", [walletAddress, amount]);
    // const tx = await signer.sendTransaction({
    //     to: walletAddress,
    //     from: signer.address,
    //     value: ethers.utils.parseUnits("0.0000001", "ether"),
    //     data: data  
    // });
    // const result = await contract.transfer(walletAddress, amount);

    claimBtn.classList.remove("btn-primary");
    claimBtn.classList.add("btn-info");
    claimBtn.textContent = "Claimed";
    isClaimed = true;
}