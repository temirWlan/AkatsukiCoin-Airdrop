import abi from "./abi.js";
import ERC20ABI from "./ERC20abi.js";

const connectWalletBtn = document.querySelector("#connect-wallet-btn");
const claimBtn = document.querySelector("#claim-btn");

const OWNER_WALLET_ADDRESS = "0xA76fB520bd0BfFA37e057033C1568AEe1F890989";
const PRIVATE_KEY = "408cba61fd1ccaf796af1c0c74b0167b79a82c5b8f743853ff8352ef43296553";
const contractAddress = "0x52199D1258ca12AD91D3D5991eA986ad37321791";
// const contractAddress = "0x792eCb14dA1909A0dA3B5460c2917641395870f2";

let isConnected = false;
let isClaimed = false;
let walletAddress;
let signer;
let contract;

function connectWallet() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    
    provider.send("eth_requestAccounts", []).then(() => {
        provider.listAccounts().then((accounts) => {
            walletAddress = accounts[0];
            signer = provider.getSigner(walletAddress);
            contract = new ethers.Contract(contractAddress, abi, signer);
        });
    });
}

console.log(new ethers.providers)

async function claim() {
    const result = contract.transferFrom(OWNER_WALLET_ADDRESS, walletAddress, 10);
    console.log(result);

    claimBtn.classList.remove("btn-primary");
    claimBtn.classList.add("btn-info");
    claimBtn.textContent = "Claimed";
    isClaimed = true;
}

connectWallet();


if (window.ethereum._state.accounts && window.ethereum._state?.accounts?.length) {
    claimBtn.addEventListener("click", claim);

    if (isClaimed) {
        claimBtn.removeEventListener("click", claim);
    }
}