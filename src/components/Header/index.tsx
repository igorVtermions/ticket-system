import  Logo  from "@/../public/images/logo.png";
import Image from "next/image";

export default function Header(){
    return(
    <header className="bg-primary text-white p-4 shadow flex flex-row items-center gap-4">
        <Image src = {Logo} alt="logo" width={60} height={40} />
        <h1 className="text-2xl font-bold">Sistema de Tickets</h1>
    </header>
    )
}