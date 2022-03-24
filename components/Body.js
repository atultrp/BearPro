import Image from "next/image"
import { useState } from "react";

const Body = () => {

    const [isconnected, setIsConnected] = useState(false);
    const [hasMetamask, setHasMetamask] = useState(false);
    const [signer, setSigner] = useState(undefined);
    const [userAddress, setUserAddress] = useState()

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
                        <button className="custom-font py-2 px-4 text-lg bg-blue-500 text-white rounded-full uppercase font-semibold hover:bg-opacity-75">Marketplace</button>
                    </div>
                </div>
            </div>

            {/* In Progress */}
            <div className="container mx-auto w-full overflow-hidden relative pt-16">
                <div className="flex space-x-4 before:bg-gradient-to-r from-indigo-500 ">
                    <div className="">
                        <Image src="/Assets/1.png" width={200} height={200} />
                    </div>
                    <div className="">
                        <Image src="/Assets/2.png" width={200} height={200} />
                    </div>
                    <div className="">
                        <Image src="/Assets/3.png" width={200} height={200} />
                    </div>
                    <div className="">
                        <Image src="/Assets/4.png" width={200} height={200} />
                    </div>
                    <div className="">
                        <Image src="/Assets/5.png" width={200} height={200} />
                    </div>
                    <div className="">
                        <Image src="/Assets/6.png" width={200} height={200} />
                    </div>
                    <div className="">
                        <Image src="/Assets/7.png" width={200} height={200} />
                    </div>
                    <div className="">
                        <Image src="/Assets/8.png" width={200} height={200} />
                    </div>
                    <div className="">
                        <Image src="/Assets/9.png" width={200} height={200} />
                    </div>
                </div>
            </div>

            <div id="mint" className="pt-16">
                <h2 className="text-4xl md:text-6xl md:text-center custom-font uppercase md:leading-snug font-bold">
                    Mint a MIB
                </h2>
                <div className="lg:flex">
                    <div className="lg:w-1/2 lg:mr-0 lg:ml-auto">
                        <img src="/Assets/beargif.gif" />
                    </div>
                    <div className=" lg:w-1/2">
                        <h3 className="custom-font text-3xl font-bold text-[#aa9b76] uppercase">About</h3>
                        <p className="mx-4 text-lg py-4">
                            An NFT, also known as Non-Fungible Token, is a one-of-a-kind digital token stored on a digital ledger/blockchain. The ther "Non-Fungible" signifies something not interchangeable with another good due to its distinct properties.<br />
                            The Mibbear collection is made up of 3000 NFTs, each NFT has different characteristics that make each of them totally unique. Depending on the different characteristics that an nft obtains, it will have a different level of rarity. For example, only 30 nfts will have the paladin helmet, giving them a mythic rarity.<br />
                            Each rarity gives you a different weight in the project. How to participate in project decisions, or airdrops of our token.
                        </p>
                        <button className="custom-font py-2 px-4 text-lg bg-red-500 text-white rounded-full uppercase font-semibold hover:bg-opacity-75" onClick={connect}>{isconnected ? "Connected" : "Connect And Mint"}</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Body