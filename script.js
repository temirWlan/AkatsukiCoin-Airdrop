import abi from "./abi.js";

const connectWalletBtn = document.querySelector("#connect-wallet-btn");
const claimBtn = document.querySelector("#claim-btn");

const ownerWalletAddress = "0x792BC5A09A64857224AF1856d3E5bF0D2d7De6Ee";
const contractAddress = "0x792eCb14dA1909A0dA3B5460c2917641395870f2";

let walletAddress;
let signer;
let contract;


function connectWallet() {
    const provider = new ethers.providers.Web3Provider(window.ethereum, 97);
    
    provider.send("eth_requestAccounts", []).then(() => {
        provider.listAccounts().then((accounts) => {
            walletAddress = accounts[0];
            signer = provider.getSigner(walletAddress);
            contract = new ethers.Contract(contractAddress, abi, signer);
        });
    });
}

async function claim() {

}

connectWalletBtn.addEventListener("click", connectWallet);
claimBtn.addEventListener("click", claim);