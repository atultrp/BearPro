import { useState, useEffect } from "react";
import Accordion from "./Accordion";
import { ethers } from "ethers"
import Web3 from 'web3';

const Body = () => {
    const [isconnected, setIsConnected] = useState(false);
    const [hasMetamask, setHasMetamask] = useState(false);
    const [signer, setSigner] = useState(undefined);
    const [userAddress, setUserAddress] = useState();
    const [blockchain, setBlockchain] = useState();
    const [web3Var, setWeb3Var] = useState();
    const [mintAmount, setMintAmount] = useState(1);
    const [claimingNft, setClaimingNft] = useState(false);
    const [feedback, setFeedback] = useState(`Click buy to mint your NFT.`);



    // Metamask Connection
    const connect = async () => {
        if (typeof window.ethereum !== "undefined") {
            try {
                await ethereum.request({ method: "eth_requestAccounts" });
                setIsConnected(true);
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                setSigner(provider.getSigner());
                const web3 = new Web3(window.web3.currentProvider);
                setWeb3Var(web3);
            } catch (e) {
                console.log(e);
            }
        } else {
            setIsConnected(false);
        }
    }

    useEffect(async () => {
        try {
            await ethereum.request({ method: "eth_requestAccounts" });
            setIsConnected(true);
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            setSigner(provider.getSigner());
            const web3 = new Web3(window.web3.currentProvider);
            setWeb3Var(web3);

            // User Address
            const accountResponse = await web3Var.eth.getAccounts();
            setBlockchain(accountResponse);
            const instance = accountResponse[0];
            setUserAddress(instance);
        } catch (err) {
            console.log(err)
        }
    }, [web3Var])

    const decrementMintAmount = () => {
        let newMintAmount = mintAmount - 1;
        if (newMintAmount < 1) {
            newMintAmount = 1;
        }
        setMintAmount(newMintAmount);
    };

    const incrementMintAmount = () => {
        let newMintAmount = mintAmount + 1;
        if (newMintAmount > 50) {
            newMintAmount = 50;
        }
        setMintAmount(newMintAmount);
    };

    // Mint

    const [CONFIG, SET_CONFIG] = useState({
        CONTRACT_ADDRESS: "0x6f6B858E054a834966f7a1fCC64cce54435Ac9E3",
        SCAN_LINK: "",
        NETWORK: {
            NAME: "",
            SYMBOL: "",
            ID: 0,
        },
        NFT_NAME: "",
        SYMBOL: "",
        MAX_SUPPLY: 1,
        WEI_COST: 0,
        DISPLAY_COST: 0,
        GAS_LIMIT: 0,
        MARKETPLACE: "",
        MARKETPLACE_LINK: "",
        SHOW_BACKGROUND: false,
    });

    const claimNFTs = async (e) => {
        e.preventDefault();

        try {
            if (!window.ethereum)
                throw new Error("No crypto wallet found. Please install it.");

            const web3 = new Web3(window.web3.currentProvider);
            window.web3 = new Web3(window.web3.currentProvider);

            const mintAbi = [{ "inputs": [{ "internalType": "string", "name": "_name", "type": "string" }, { "internalType": "string", "name": "_symbol", "type": "string" }, { "internalType": "string", "name": "_initBaseURI", "type": "string" }, { "internalType": "string", "name": "_initNotRevealedUri", "type": "string" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "approved", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" }], "name": "ApprovalForAll", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "approve", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_mintAmount", "type": "uint256" }], "name": "mint", "outputs": [], "stateMutability": "payable", "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "inputs": [{ "internalType": "bool", "name": "_state", "type": "bool" }], "name": "pause", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "reveal", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "bytes", "name": "_data", "type": "bytes" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" }], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "_newBaseExtension", "type": "string" }], "name": "setBaseExtension", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "_newBaseURI", "type": "string" }], "name": "setBaseURI", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_newCost", "type": "uint256" }], "name": "setCost", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_newmaxMintAmount", "type": "uint256" }], "name": "setmaxMintAmount", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_limit", "type": "uint256" }], "name": "setNftPerAddressLimit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "_notRevealedURI", "type": "string" }], "name": "setNotRevealedURI", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bool", "name": "_state", "type": "bool" }], "name": "setOnlyWhitelisted", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "transferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address[]", "name": "_users", "type": "address[]" }], "name": "whitelistUsers", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "withdraw", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "addressMintedBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "baseExtension", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "baseURI", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "cost", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "getApproved", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" }], "name": "isApprovedForAll", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_user", "type": "address" }], "name": "isWhitelisted", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "maxMintAmount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "maxSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "nftPerAddressLimit", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "notRevealedUri", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "onlyWhitelisted", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "ownerOf", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "paused", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "revealed", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "tokenByIndex", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "tokenOfOwnerByIndex", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "tokenURI", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_owner", "type": "address" }], "name": "walletOfOwner", "outputs": [{ "internalType": "uint256[]", "name": "", "type": "uint256[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "whitelistedAddresses", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }]

            const accountResponse = await window.web3.eth.getAccounts();
            const instance = accountResponse[0];

            let cost = 100000000000000000;
            let gasLimit = CONFIG.GAS_LIMIT;
            let totalCostWei = String(cost * mintAmount);
            let totalGasLimit = String(gasLimit * mintAmount);

            const presaleContract = new window.web3.eth.Contract(mintAbi, `0x6f6B858E054a834966f7a1fCC64cce54435Ac9E3`);
            await presaleContract.methods.mint(mintAmount).send({ from: instance, value: totalCostWei, gas: 900000 });


        } catch (err) {
            console.log(err)
        }
    };

    // Accordion
    const faqs = [
        {
            key: 0,
            title: "What is Bear?",
            description: "Bear is a project within the polygon blockchain. Based on a metaverse of bears where you can interact with your nfts within the project."
        },
        {
            key: 1,
            title: "When can i buy a bear?",
            description: "The NFTs release date is January 23 at 19:00 UTC. Follow our official channels to find out the latest news."
        },
        {
            key: 2,
            title: "What wallet can i use?",
            description: "All wallets in the polygon ecosystem are compatible with our project. Our recommendation is Phantom Wallet."
        },
        { key: 2, title: "What is the price of nft?", description: "The initial price will be 0.35 Sol for the first 500 nfts. The rest will cost 0.6 Sol." },
        { key: 2, title: "Where can I sell my nft?", description: "You can sell and buy at Opensea. Bear will not be responsible for exchanges for other marketplaces." },
    ];



    return (
        <div>
            <div id="home" className="pt-16 mx-3.5 lg:w-1/2 md:mx-auto ">
                <h2 className="text-4xl md:text-6xl md:text-center custom-font uppercase md:leading-snug font-bold">
                    Collect BEAR NFTs on the metaverse
                </h2>
                <div className="w-11/12 md:w-10/12 mx-auto">
                    <p className="md:text-center pt-6 text-lg">
                        3000 confused bears who have somehow made their way into the metaverse. Only on Polygon.
                    </p>
                    <div className="flex md:w-1/2 md:mx-auto space-x-3 pt-7">
                        <button className="custom-font py-2 px-4 text-lg bg-red-500 text-white rounded-full uppercase font-semibold hover:bg-opacity-75">
                            <a href="#mint">Mint a BEAR</a>
                        </button>
                        <button className={`custom-font py-2 px-4 text-lg bg-blue-500 text-white rounded-full uppercase font-semibold hover:bg-opacity-75`}>Marketplace</button>
                    </div>
                </div>
            </div>

            {/* In Progress */}
            <div className="container mx-auto w-full overflow-hidden relative pt-16">
                <div className="flex before:bg-gradient-to-r from-indigo-500 ">
                    <div className="mx-2">
                        <img src="/Assets/1.png" />
                    </div>
                    <div className="mx-2">
                        <img src="/Assets/2.png" />
                    </div>
                    <div className="mx-2">
                        <img src="/Assets/3.png" />
                    </div>
                    <div className="mx-2">
                        <img src="/Assets/4.png" />
                    </div>
                    <div className="mx-2">
                        <img src="/Assets/5.png" />
                    </div>
                    {/* <div className="mx-2">
                        <img src="/Assets/6.png" />
                    </div> */}
                    {/* <div className="mx-2">
                        <img src="/Assets/7.png" />
                    </div> */}
                    {/* <div className="mx-2">
                        <img src="/Assets/8.png" />
                    </div> */}
                    {/* <div className="mx-2">
                        <img src="/Assets/9.png" />
                    </div> */}
                </div>
            </div>

            {/* Mint Secion */}

            <div id="mint" className="pt-16 text-center">
                <h2 className="text-4xl mx-auto md:text-6xl md:text-center custom-font uppercase md:leading-snug font-bold">
                    Mint a BEAR
                </h2>
                <div className="lg:flex lg:items-center">
                    <div className="lg:px-32 lg:mr-0 lg:ml-auto mx-12">
                        <img src="/Assets/beargif.gif" />
                        <div className={` justify-center ${isconnected ? "hidden" : "block"}`}>
                            <button className={`custom-font py-2 px-4 text-lg bg-red-500 text-white rounded-full uppercase font-semibold hover:bg-opacity-75`} onClick={connect}>Connect And Mint</button>
                        </div>

                        <div className={`${isconnected ? "block" : "hidden"} `}>
                            <div className="flex space-x-2 items-center justify-center">
                                <button className="custom-font hover:bg-red-500 py-2 px-5 font-bold text-2xl bg-white text-[#1b1b1b] rounded-[50%] hover:text-white" onClick={decrementMintAmount}>-</button>
                                <div className="custom-font font-bold text-xl px-3">{mintAmount}</div>
                                <button className="custom-font hover:bg-red-500 py-2 px-5 font-bold text-2xl bg-white text-[#1b1b1b] rounded-[50%] hover:text-white" onClick={incrementMintAmount}>+</button>
                            </div>
                            <button className={`custom-font py-2 px-4 text-lg bg-red-500 text-white rounded-full uppercase font-semibold hover:bg-opacity-75 mt-5`} onClick={(e) => claimNFTs(e)} >Mint Now</button>
                        </div>
                    </div>
                    <div className="pt-6 lg:w-1/2">


                        <h3 className="custom-font text-3xl lg:text-3xl font-bold text-[#aa9b76] uppercase pt-6">About</h3>

                        <p className="mx-6 text-lg py-4 text-left">
                            An NFT, also known as Non-Fungible Token, is a one-of-a-kind digital token stored on a digital ledger/blockchain. The ther "Non-Fungible" signifies something not interchangeable with another good due to its distinct properties.<br />
                            The Bear collection is made up of 3000 NFTs, each NFT has different characteristics that make each of them totally unique. Depending on the different characteristics that an nft obtains, it will have a different level of rarity. For example, only 30 nfts will have the paladin helmet, giving them a mythic rarity.<br />
                            Each rarity gives you a different weight in the project. How to participate in project decisions, or airdrops of our token.
                        </p>


                    </div>
                </div>
            </div>

            <div id="team" className="pt-16 text-center">
                <h2 className="text-4xl md:text-6xl md:text-center custom-font uppercase md:leading-snug font-bold">Teams</h2>
                <div className="flex justify-center space-x-5 lg:space-x-10 pb-5 pt-10">
                    <img src="/Assets/t1.png" className="w-20 lg:w-32 rounded-full ease-in-out lg:grayscale lg:hover:grayscale-0 lg:hover:scale-110" />
                    <img src="/Assets/t2.png" className="w-20 lg:w-32 rounded-full ease-in-out lg:grayscale lg:hover:grayscale-0 lg:hover:scale-110" />
                    <img src="/Assets/t3.png" className="w-20 lg:w-32 rounded-full ease-in-out lg:grayscale lg:hover:grayscale-0 lg:hover:scale-110" />
                    <img src="/Assets/t4.png" className="w-20 lg:w-32 rounded-full ease-in-out lg:grayscale lg:hover:grayscale-0 lg:hover:scale-110" />
                </div>
                <div className="flex justify-center space-x-5 lg:space-x-10 py-5">
                    <img src="/Assets/t5.png" className="w-20 lg:w-32 rounded-full ease-in-out lg:grayscale lg:hover:grayscale-0 lg:hover:scale-110" />
                    <img src="/Assets/t6.png" className="w-20 lg:w-32 rounded-full ease-in-out lg:grayscale lg:hover:grayscale-0 lg:hover:scale-110" />
                    <img src="/Assets/t7.png" className="w-20 lg:w-32 rounded-full ease-in-out lg:grayscale lg:hover:grayscale-0 lg:hover:scale-110" />
                </div>
            </div>

            {/* Accordion Section */}


            <div className="lg:flex mb-2 w-full pl-2 pt-16" id="faq">
                <div className="lg:w-1/2 px-5 pb-5 lg:px-0 mx-auto">
                    <h1 className="text-4xl md:text-6xl md:text-center custom-font uppercase md:leading-snug font-bold">Frequently asked questions</h1>
                </div>
                <div className="lg:w-1/2 px-5 lg:px-24">
                    {faqs.map((faq) => {
                        return <Accordion title={faq.title} description={faq.description} />
                    })}
                </div>
            </div>


            {/* Footer Section */}

            <div className="w-3/4 lg:w-1/2 mx-auto">
                <img src="/Assets/footer.png" />
            </div>

        </div>
    )
}

export default Body