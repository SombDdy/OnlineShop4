import { useRouter } from "next/router"
import { Layout } from "@/components"
import data from '../../data/data.json';
import { ProductCard } from '@ui';
import { Search } from '@ui';
import { ChangeEvent, SetStateAction, useEffect, useState } from "react";
import Link from "next/link";
import FiltrationSection from "@/components/UI/FiltrationSection/FiltrationSection";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function ProductCategory() {

    const router = useRouter()
    const isCategory = router.asPath.split('/')[2];
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredSearch, setFilteredSearch] = useState('');
    const [filterProccessors, setFilterProccessors] = useState<{ name: string, value: string, type: string }[]>([])
    const [filterMemory, setFilterMemory] = useState<{ name: string, price: string }[]>([])
    const [filterColor, setFilterColor] = useState<{ name: string, color: string, main: boolean }[]>([])
    const [filterPrice, setFilterPrice] = useState<string | undefined>()
    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFilteredSearch(e.currentTarget.value);
    };

    useEffect(() => {
        let filteredData =
            isCategory.toLowerCase() !== 'all'
                ? data.filter((item) => item.category.toLowerCase() === isCategory.toLowerCase())
                : data;

        filteredData = filteredData.filter((item) =>
            item.name.replace(/\s/g, '').toLowerCase().includes(filteredSearch.replace(/\s/g, '').toLowerCase())
        );

        //filter by proccessor
        console.log(filteredData)
        if (filterProccessors.length > 0) {
            console.log()
            filteredData = filteredData.filter((item) =>
                item.characteristics.some((char) =>
                    filterProccessors.some((filter) =>
                        char.name === filter.name && char.value === filter.value
                    )
                )
            );
        }
        //filter by memory
        if (filterMemory.length > 0) {
            filteredData = filteredData.filter((item) =>
                item.modifications.some((char) =>
                    'name' in char && char.name !== undefined &&
                    filterMemory.some((filter) => char.name === filter.name)
                )
            );
        }

        //filter by color
        if (filterColor.length > 0) {
            filteredData = filteredData.filter((item) =>
                item.images.some((char) =>
                    'name' in char && char.name !== undefined &&
                    filterColor.some((filter) => {
                        const extractedValue = char.name.split('/')[3];
                        return extractedValue && extractedValue === filter.name;
                    })
                )
            )
        }
        //filter by price
        if (filterPrice === 'lower') {
            filteredData = filteredData.sort((a, b) => Number(a.modifications[0].price) - Number(b.modifications[0].price))
        }
        if (filterPrice === 'higher') {
            filteredData = filteredData.sort((a, b) => Number(b.modifications[0].price) - Number(a.modifications[0].price))
        }

        setFilteredProducts(filteredData);
        console.log(filteredData);
        setCurrentPage(1);
        console.log(filteredData, filterColor, filterMemory, filterProccessors);
    }, [isCategory, filteredSearch, filterProccessors, filterMemory, filterColor, filterPrice]);

    const productsPerPage = 8;
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const categoryNameInPath = router.query.categories;

    const productsPagination = (newPage: SetStateAction<number>) => {
        setCurrentPage(newPage);
    };

    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const currentItems = filteredProducts.slice(startIndex, endIndex);
    function getFirstSentence(text: string) {
        const sentences = text.split(/[.!?]/);
        const firstSentence = sentences.slice(0, 1).filter(Boolean).join('. ');

        return firstSentence;
    }

    function getTwoSentence(text: string) {
        const sentences = text.split(/[.!?]/);
        const twoSentence = sentences.slice(1, 2).filter(Boolean).join('. ');

        return twoSentence;
    }

    return (
        <Layout>
            <div className="w-full">
                <Search handleSearch={handleSearchChange} />
                <div className={`flex justify-center items-center bg-zinc-100 mt-10 py-3 px-2 md2:px-8 ${categoryNameInPath === 'MacBook' ? 'gap-x-4' : 'gap-x-1 md2:gap-x-8'}`}>
                    {currentItems.map((item) => (
                        <div className="flex items-start">
                            <div className = "flex flex-col items-center justify-start h-16 xs:h-14 sm:h-10 md2:h-36">
                            <Icon icon="majesticons:iphone-x-apps" className="w-full md2:h-16" />
                            <p className = "text-center text-[5px] xs:text-[6px] sm:text-[7px] md:text-[8px] md2:text-base">{item.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col justify-center items-center w-full bg-zinc-100 py-6 mt-6">
                    {currentItems.slice(0, 1).map((item) => (
                        <div className="flex flex-col justify-center items-center text-center">
                            <p className="text-black text-opacity-50">New</p>
                            <p className="text-black text-xl font-bold py-4">{item.name}</p>
                            <p className={`text-black md2:text-3xl text-center font-bold pb-2 ${categoryNameInPath === 'Dyson' || 'iMac' ? 'w-[44vw]' : 'w-full'}`}>{getFirstSentence(item.description)}</p>
                            <p className={`text-black md2:text-3xl text-center font-bold ${categoryNameInPath === 'Dyson' || 'iMac' ? 'w-[44vw]' : 'w-full'}`}>{getTwoSentence(item.description)}</p>
                            <div className="flex gap-x-8 items-center pt-20 pb-10">
                                <button className="cursor-pointer items-center bg-button-blue w-fit px-2 py-1 md:px-3 lg:px-4 rounded-3xl text-text text-lg font-medium whitespace-nowrap flex flex-row gap-x-2">Buy</button>
                                <Link href={""} className="text-button-blue text-lg">Learn More</Link>
                            </div>
                            <div className=" flex justify-center">
                                <img alt='product' src={`/images${item.images[0].name}`} className="w-fit h-fit object-contain" /></div>
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-4 xs:grid-cols-4 sm:grid-cols-4 md2:grid-cols-8 lg:grid-cols-8 2xl:grid-cols-8 gap-x-6 gap-y-6 lg:gap-y-12 lg:gap-x-8 xl:gap-y-12 xl:gap-x-12 pt-16">
                    <div className="col-start-1 col-span-8 ">
                        <FiltrationSection filterProccessors={filterProccessors} setFilterProccessors={setFilterProccessors} filterMemory={filterMemory} setFilterMemory={setFilterMemory} filterColor={filterColor} setFilterColor={setFilterColor} setFilterPrice={setFilterPrice} />
                    </div>
                    <div className="grid grid-cols-9 col-start-2 md2:col-start-3 col-span-9 gap-x-6 gap-y-6">
                        {currentItems.map((item) => (
                            <ProductCard item={item} />
                        ))}
                    </div>
                </div>
                {filteredProducts.length > productsPerPage && (
                    <div className="flex justify-center mt-12">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                className={`mx-2 px-3 py-1 md2:px-4 md2:py-2 border ${index + 1 === currentPage
                                    ? 'bg-black text-text rounded-2xl'
                                    : 'bg-zinc-100 rounded-2xl'
                                    }`}
                                onClick={() => productsPagination(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
}