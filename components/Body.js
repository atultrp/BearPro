
const Body = () => {
    return (
        <div>
            <div id="home" className="pt-16 mx-3.5 lg:w-1/2 md:mx-auto">
                <h2 className="text-4xl md:text-6xl md:text-center custom-font uppercase leading-tight font-bold">
                    Collect MIB NFTs on the metaverse
                </h2>
                <div className="w-11/12 md:w-10/12 mx-auto">
                    <p className="md:text-center pt-6 text-lg">
                        3000 confused bears who have somehow made their way into the metaverse. Only on Solana.
                    </p>
                    <div className="flex md:w-1/2 md:mx-auto space-x-3 pt-7">
                        <button className="custom-font py-2 px-4 text-lg bg-red-500 text-white rounded-full uppercase font-semibold hover:bg-opacity-75">Mint a MIB</button>
                        <button className="custom-font py-2 px-4 text-lg bg-blue-500 text-white rounded-full uppercase font-semibold hover:bg-opacity-75">Marketplace</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Body