import { ReactNode } from "react";
import Footer from "../Footer/Footer";
import { useRouter } from "next/router";
import Search from "../Search/Search";

interface LayoutProps {
    children: ReactNode;
}


export default function Layout({ children }: LayoutProps) {
    const router = useRouter()
    const path = router.asPath
    const isCategory = router.asPath.split('/')[1];
    const isBasket: boolean = path.split('/')[1] === 'basket';
    return (
        <>
            <div className='flex'>
                <div className={`w-full lg:w-full bg-bg-body`}>
                    <div className = "mb-10 mt-3">
                    {children}
                    </div>
                </div>
            </div>
            <Footer />
        </>
        
    )
}