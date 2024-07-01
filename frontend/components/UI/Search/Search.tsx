import { Icon } from '@iconify/react';
import Link from 'next/link';
import data from '../../../data/data.json';
import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';

interface Modification {
    name?: string;
    price: string;
}

interface Characteristic {
    name: string;
    value: string;
    type: string;
}

interface ImageInfo {
    name: string,
    color: string,
    main?: boolean
}

interface ProductInfo {
    phones: any;
    name: string;
    description: string;
    modifications: Modification[];
    category: string;
    characteristics: Characteristic[];
    images: ImageInfo[];
}

interface Props {
    handleSearch: (e: ChangeEvent<HTMLInputElement>) => void,
}

export default function Search({ handleSearch }: Props) {
    const router = useRouter();
    const path = router.asPath;
    const isHomePage: boolean = router.pathname === '/';
    const isProduct: boolean = path.split('/')[1] === 'product';
    const isCategory: boolean = path.split('/')[1] === 'categories';
    const [isMenuOpen, setMenuOpen] = useState(false);

    const openMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isMenuOpen]);

    const categoryNameInPath = router.query.categories;

    const categoryName = [
        {
            name: 'iMac'
        },
        {
            name: 'MacBook'
        },
        {
            name: 'iPhone'
        },
        {
            name: 'iPad'
        },
        {
            name: 'Apple Watch'
        },
        {
            name: 'AirPods'
        },
        {
            name: 'Dyson'
        }
    ]

    return (

        <div className={`w-full text-black grid grid-cols-14 items-center px-2 sm:px-4 lg:px-10`}>
            <><div className="col-span-11 flex justify-between md2:hidden items-center">
                <Link href={'/'} className="">
                    <Icon icon="mdi:apple" className="text-black text-3xl lg:text-4xl" />
                </Link>
                <div className="flex items-center">
                    <div className={`text-text flex mr-2 items-center justify-between ${categoryNameInPath === 'All' ? 'flex' : 'hidden'} rounded-3xl px-2 bg-black w-24 lg:w-28 2xl:w-32`}>
                        <Icon icon="iconamoon:search" className={`${!!isCategory ? 'text-medium 2xl:text-xl' : 'text-lg 2xl:text-3xl'} text-text`} />
                        <input type="text" placeholder="Search" className={`bg-black text-sm 2xl:text-xl w-12 rounded-3xl py-1.5 placeholder-text focus:outline-none`}
                            onChange={handleSearch}
                        />
                    </div>
                    <Link href={'/basket'} className={` ${(isCategory || isProduct || isHomePage) ? 'flex' : 'hidden'} mr-2`}>
                        <Icon icon="fluent-mdl2:shop" className="text-black text-2xl lg:text-4xl" />
                    </Link>
                    <button onClick={openMenu}>
                        <Icon icon="quill:hamburger" className="text-black text-2xl lg:text-4xl" />
                    </button>
                </div>
            </div>
                {isMenuOpen && (
                    <div className="fixed top-0 left-0 w-full h-full bg-text">
                        <div className="flex flex-col px-4">
                            <button onClick={closeMenu} className="text-black text-5xl">
                                <Icon icon="iconoir:cancel" />
                            </button>
                            <Link href='/categories/All' className={`${categoryNameInPath === 'All' ? 'font-bold' : 'font-medium'} text-black pl-3 text-2xl whitespace-nowrap py-2`}>
                                All
                            </Link>
                            {categoryName.map((k) =>
                                <Link href={`/categories/${k.name.replace(/\s/g, '')}`} className={`${categoryNameInPath === k.name.replace(/\s/g, '') ? 'font-bold' : 'font-medium'} text-black pl-3 text-2xl whitespace-nowrap py-2`}>
                                    {k.name}
                                </Link>
                            )}
                            <Link href={''} className="text-black pl-3 text-2xl whitespace-nowrap py-2 font-medium">
                                Support
                            </Link>
                        </div>
                    </div>
                )}
                <div className={`hidden md2:flex ${!!isCategory ? 'gap-x-0 lg:gap-x-2 xl:gap-x-6 2xl:gap-x-6' : 'gap-x-5 md2:gap-x-2 lg:gap-x-5 xl:gap-x-12 2xl:gap-x-12'} items-center col-span-6 col-start-7`}>
                    <Link href={'/'} className="">
                        <Icon icon="mdi:apple" className="text-black text-xl lg:text-4xl" />
                    </Link>
                    {categoryName.map((k) =>
                        <Link href={`/categories/${k.name.replace(/\s/g, '')}`} className={`${categoryNameInPath === k.name.replace(/\s/g, '') ? 'font-bold' : 'font-medium'} md2:ml-2 xl:ml-0 md2:text-sm lg:text-medium xl:text-xl 2xl:text-2xl md2:px-1 lg:1.5 2xl:px-4 whitespace-nowrap py-2`}>
                            {k.name}
                        </Link>
                    )}
                    <Link href='/categories/All' className={`${categoryNameInPath === 'All' ? 'font-bold' : 'font-medium'} text-black md2:text-base md2:ml-2 xl:ml-0 lg:text-medium xl:text-xl 2xl:text-2xl md2:px-2 lg:px-3 2xl:px-6 py-2`}>
                        All
                    </Link>
                    <Link href={''} className="text-black md2:text-base md2:ml-2 xl:ml-0 lg:text-medium xl:text-xl 2xl:text-2xl md2:px-2 lg:px-3 2xl:px-6 py-2">
                        Support
                    </Link>
                    <div className={`flex flex-row `}>
                        <div className={`text-text flex ml-4 mr-3 items-center justify-between ${isCategory ? 'flex' : 'hidden'} rounded-3xl px-2 bg-black ${!!isCategory ? 'w-20 lg:w-28 2xl:w-32' : 'w-28 lg:w-28 2xl:w-52'}`}>
                            <Icon icon="iconamoon:search" className={`${!!isCategory ? 'text-medium 2xl:text-xl' : 'text-lg 2xl:text-3xl'} text-text`} />
                            <input type="text" placeholder="Search" className={`bg-black ${isCategory ? 'text-sm 2xl:text-xl w-12 lg:w-16 2xl:w-20' : 'text-lg 2xl:text-3xl w-16 lg:w-16 2xl:w-32'} rounded-3xl  py-1.5 placeholder-text focus:outline-none`}
                                onChange={handleSearch}
                            />
                        </div>
                        <Link href={'/basket'} className={` ${(isCategory || isProduct) ? 'flex' : 'hidden'}`}>
                            <Icon icon="fluent-mdl2:shop" className="text-black text-3xl lg:text-4xl" />
                        </Link>
                    </div>
                </div></>
        </div>
    )
}