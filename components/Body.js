import { useState } from "react";

const Body = () => {
    const [isconnected, setIsConnected] = useState(false);
    const [hasMetamask, setHasMetamask] = useState(false);
    const [signer, setSigner] = useState(undefined);
    const [userAddress, setUserAddress] = useState();
    const [mintAmount, setMintAmount] = useState(1);
    const [claimingNft, setClaimingNft] = useState(false);

    const [CONFIG, SET_CONFIG] = useState({
        CONTRACT_ADDRESS: "",
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

    const claimNFTs = () => {
        let cost = CONFIG.WEI_COST;
        let gasLimit = CONFIG.GAS_LIMIT;
        let totalCostWei = String(cost * mintAmount);
        let totalGasLimit = String(gasLimit * mintAmount);
        console.log("Cost: ", totalCostWei);
        console.log("Gas limit: ", totalGasLimit);
        setFeedback(`Minting your ${CONFIG.NFT_NAME}...`);
        setClaimingNft(true);
        blockchain.smartContract.methods
            .mint(blockchain.account, mintAmount)
            .send({
                gasLimit: String(totalGasLimit),
                to: CONFIG.CONTRACT_ADDRESS,
                from: blockchain.account,
                value: totalCostWei,
            })
            .once("error", (err) => {
                console.log(err);
                setFeedback("Sorry, something went wrong please try again later.");
                setClaimingNft(false);
            })
            .then((receipt) => {
                console.log(receipt);
                setFeedback(
                    `WOW, the ${CONFIG.NFT_NAME} is yours! go visit Opensea.io to view it.`
                );
                setClaimingNft(false);
                dispatch(fetchData(blockchain.account));
            });
    };


    return (
        <div>
            <div id="home" className="pt-16 mx-3.5 lg:w-1/2 md:mx-auto ">
                <h2 className="text-4xl md:text-6xl md:text-center custom-font uppercase md:leading-snug font-bold">
                    Collect MIB NFTs on the metaverse
                </h2>
                <div className="w-11/12 md:w-10/12 mx-auto">
                    <p className="md:text-center pt-6 text-lg">
                        3000 confused bears who have somehow made their way into the metaverse. Only on Solana.
                    </p>
                    <div className="flex md:w-1/2 md:mx-auto space-x-3 pt-7">
                        <button className="custom-font py-2 px-4 text-lg bg-red-500 text-white rounded-full uppercase font-semibold hover:bg-opacity-75">
                            <a href="#mint">Mint a MIB</a>
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
                    <div className="mx-2">
                        <img src="/Assets/6.png" />
                    </div>
                    <div className="mx-2">
                        <img src="/Assets/7.png" />
                    </div>
                    <div className="mx-2">
                        <img src="/Assets/8.png" />
                    </div>
                    <div className="mx-2">
                        <img src="/Assets/9.png" />
                    </div>
                </div>
            </div>

            {/* Mint Secion */}

            <div id="mint" className="pt-16">
                <h2 className="text-4xl md:text-6xl md:text-center custom-font uppercase md:leading-snug font-bold">
                    Mint a MIB
                </h2>
                <div className="lg:flex lg:items-center">
                    <div className="lg:px-32 lg:mr-0 lg:ml-auto">
                        <img src="/Assets/beargif.gif" />
                    </div>
                    <div className=" lg:w-1/2">
                        <h3 className="custom-font text-3xl font-bold text-[#aa9b76] uppercase">About</h3>
                        <p className="mx-4 text-lg py-4">
                            An NFT, also known as Non-Fungible Token, is a one-of-a-kind digital token stored on a digital ledger/blockchain. The ther "Non-Fungible" signifies something not interchangeable with another good due to its distinct properties.<br />
                            The Mibbear collection is made up of 3000 NFTs, each NFT has different characteristics that make each of them totally unique. Depending on the different characteristics that an nft obtains, it will have a different level of rarity. For example, only 30 nfts will have the paladin helmet, giving them a mythic rarity.<br />
                            Each rarity gives you a different weight in the project. How to participate in project decisions, or airdrops of our token.
                        </p>
                        <button className={`custom-font py-2 px-4 text-lg bg-red-500 text-white rounded-full uppercase font-semibold hover:bg-opacity-75 ${isconnected ? "hidden" : "block"}`} onClick={connect}>Connect And Mint</button>
                        <div className={`${isconnected ? "block" : "hidden"} `}>
                            <div className="flex space-x-2 items-center">
                                <button className="custom-font hover:bg-red-500 py-2 px-5 font-bold text-2xl bg-white text-[#1b1b1b] rounded-[50%] hover:text-white" onClick={decrementMintAmount}>-</button>
                                <div className="custom-font font-bold text-xl px-3">{mintAmount}</div>
                                <button className="custom-font hover:bg-red-500 py-2 px-5 font-bold text-2xl bg-white text-[#1b1b1b] rounded-[50%] hover:text-white" onClick={incrementMintAmount}>+</button>
                            </div>
                            <button className={`custom-font py-2 px-4 text-lg bg-red-500 text-white rounded-full uppercase font-semibold hover:bg-opacity-75 mt-5`} onClick={claimNFTs} >Mint Now</button>
                        </div>
                    </div>
                </div>
            </div>

            <div id="team" className="pt-16">
                <h2 className="text-4xl md:text-6xl md:text-center custom-font uppercase md:leading-snug font-bold">Teams</h2>
                <div className="flex justify-center space-x-6 pb-5 pt-10">
                    <img src="/Assets/t1.png" className="w-32 rounded-full ease-in-out lg:grayscale lg:hover:grayscale-0 lg:hover:scale-110" />
                    <img src="/Assets/t2.png" className="w-32 rounded-full ease-in-out lg:grayscale lg:hover:grayscale-0 lg:hover:scale-110" />
                    <img src="/Assets/t3.png" className="w-32 rounded-full ease-in-out lg:grayscale lg:hover:grayscale-0 lg:hover:scale-110" />
                    <img src="/Assets/t4.png" className="w-32 rounded-full ease-in-out lg:grayscale lg:hover:grayscale-0 lg:hover:scale-110" />
                </div>
                <div className="flex justify-center space-x-6 py-5">
                    <img src="/Assets/t5.png" className="w-32 rounded-full ease-in-out lg:grayscale lg:hover:grayscale-0 lg:hover:scale-110" />
                    <img src="/Assets/t6.png" className="w-32 rounded-full ease-in-out lg:grayscale lg:hover:grayscale-0 lg:hover:scale-110" />
                    <img src="/Assets/t7.png" className="w-32 rounded-full ease-in-out lg:grayscale lg:hover:grayscale-0 lg:hover:scale-110" />
                </div>
            </div>


            <div>
                <img src="/Assets/footer.png" className="w-50%"/>
            </div>

        </div>
    )
}

export default Body