
const Header = () => {
    return (
        <>
            <nav className="flex items-center justify-between py-6 px-16 bg-[#1b1b1b] text-white border-b-2 border-b-stone-400">
                <h1 className="text-2xl custom-font font-bold">MIBTEST PRO</h1>
                <ul className="flex space-x-16">
                    <li className="">
                        <a href="#home" className="">Home</a>
                    </li>
                    <li className="hover:opacity-100 opacity-75">
                        <a href="#mint" className="">Mint</a>
                    </li>
                    <li className="hover:opacity-100 opacity-75">
                        <a href="#team" className="">Team</a>
                    </li>
                    <li className="hover:opacity-100 opacity-75">
                        <a href="#faq" className="">FAQ</a>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Header