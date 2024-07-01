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
    filterProccessors: { name: string, value: string }[],
    setFilterProccessors: any,
    filterMemory: { name?: string, price: string }[],
    setFilterMemory: any,
    filterColor: { name: string, color: string, main: boolean }[],
    setFilterColor: any
    setFilterPrice: (tx: string) => void
}

export default function Filter({ filterProccessors, setFilterProccessors, filterMemory, setFilterMemory, filterColor, setFilterColor, setFilterPrice }: Props) {
    const router = useRouter();
    const path = router.asPath;
    const isHomePage: boolean = router.pathname === '/';
    const isCategory: boolean = path.split('/')[1] === 'categories';
    const [isFilterMenuVisible, setFilterMenuVisibility] = useState(false);
    const [activeFilterButton, setActiveFilterButton] = useState('');
    const [clickedButton, setClickedButton] = useState(false);
    const [isMenuOpen, setMenuOpen] = useState(false);

    const categoryNameInPath = router.query.categories;

    useEffect(() => {
        if (isFilterMenuVisible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isFilterMenuVisible]);

    const closeFilterMenu = () => {
        setFilterMenuVisibility(false);
    };

    const filterButton = () => {
        setFilterMenuVisibility(!isFilterMenuVisible);
        if (activeFilterButton === 'filter') {
            setActiveFilterButton('');
        } else {
            setActiveFilterButton('filter');
        }
    };

    const allProcessors = Array.from(new Set(data
        .filter(item => item.category === categoryNameInPath)
        .flatMap(item =>
            item.characteristics
                .filter(char => char.name === 'Processor model')
                .map(char => char.value)
        )
    ));

    const allMemory = Array.from(new Set(data
        .filter(item => item.category === categoryNameInPath)
        .flatMap(item =>
            item.modifications
                .filter(mod => ('name' in mod) && mod.name !== undefined)
                .map(mod => mod.name || '')
        )
    ));

    const allColors = Array.from(new Set(data
        .filter(item => item.category === categoryNameInPath)
        .flatMap(item =>
            item.images.map(image => {
                const nameColorPart = image.name.split('/');
                return nameColorPart.length >= 4 ? nameColorPart[3] : '';
            })
        )
        .filter(value => value !== '')
    ));

    const addOrRemoveProccessor = (proccessorName: string) => {
        setFilterProccessors((prevFilters: any[]) => {
            const existingFilterIndex = prevFilters.findIndex((filter: { value: string; }) => filter.value === proccessorName);

            if (existingFilterIndex !== -1) {
                return prevFilters.filter((_: any, index: any) => index !== existingFilterIndex);
            } else {
                return [...prevFilters, { name: 'Processor model', value: proccessorName, type: "Processor" }];
            }
        });
    }

    const addOrRemoveMemory = (memory: string) => {
        setFilterMemory((prevFilters: any[]) => {
            const existingFilterIndex = prevFilters.findIndex((filter: { name: string; }) => filter.name === memory);

            if (existingFilterIndex !== -1) {
                return prevFilters.filter((_: any, index: any) => index !== existingFilterIndex);
            } else {
                return [...prevFilters, { name: memory, price: '' }];
            }
        });
    }

    const addOrRemoveColor = (colored: string) => {
        setFilterColor((prevFilters: any[]) => {
            const existingFilterIndex = prevFilters.findIndex((filter: { name: string; }) => filter.name === colored);

            if (existingFilterIndex !== -1) {
                return prevFilters.filter((_: any, index: any) => index !== existingFilterIndex);
            } else {
                return [...prevFilters, { name: colored }];
            }
        });
    }

    const filterButtons = [
        {
            "name": "All Models"
        },
        {
            "name": "Popular First"
        },
        {
            "name": "Chipest First"
        },
        {
            "name": "Discount First"
        },
        {
            "name": "Newest First"
        }
    ]

    return (
        <div className="pl-2 md2:pl-0 grid grid-cols-8 row-start-1 col-span-8 gap-x-6 gap-y-6 lg:gap-y-10 lg:gap-x-8 xl:gap-y-10 xl:gap-x-12 w-full">
            <p className="md2:ml-6 col-start-1 md2:col-start-3 text-black text-xl md2:text-4xl font-bold whitespace-nowrap">Shop {categoryNameInPath}</p>
            <div className="flex col-start-1 md2:col-start-3 col-span-8">
                <div className="flex md2:ml-6 gap-x-1 sm:gap-x-10 xl:gap-x-24 w-full text-sm md2:text-xl">
                    {filterButtons.map((button, index) => (
                        <button key={index}>{button.name}</button>
                    ))}
                </div>
                <button onClick={filterButton} className="">
                    <Icon icon="clarity:filter-line" className={`rounded-xl text-3xl lg:text-4xl p-1 ml-2`} />
                </button>
                {isFilterMenuVisible && (
                    <div className={`fixed flex flex-col w-full h-full md2:w-fit md2:h-fit md2:flex-row top-0 md2:top-[48vh] right-0 md2:right-48 md2:overflow-hidden`}>
                        <div
                            className={`flex flex-col md2:flex-row items-start gap-x-2 pl-8 md2:px-3 lg:px-4 xl:px-6 py-8 gap-y-6 md2:rounded-b-3xl bg-zinc-100 border border-b border-t border-transparent h-fit md2:-mx-1`}
                        >   <button onClick={closeFilterMenu} className="text-black text-5xl md2:hidden">
                                <Icon icon="iconoir:cancel" />
                            </button>
                            <div className={`flex flex-col items-center ${categoryNameInPath === "AirPods" || categoryNameInPath === "Dyson" || categoryNameInPath === "All" ? 'hidden' : 'flex'}`}>
                                <p className="bg-button-blue text-text xl:text-lg font-medium font-['Poppins'] text-center px-6 py-2 rounded-3xl w-32 mb-4">Proccessor</p>
                                <div className="flex flex-col gap-y-1 md2:px-8 pb-4">
                                    {allProcessors.map((proccesor, index) => (
                                        <label key={index} className=" flex items-center gap-x-2 text-black">
                                            <input type="checkbox" className="text-black bg-white" onChange={() => addOrRemoveProccessor(proccesor)} />
                                            <p onClick={() => addOrRemoveProccessor(proccesor)}>{proccesor}</p>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="bg-button-blue text-text xl:text-lg font-medium font-['Poppins'] text-center px-8 py-2 rounded-3xl w-32 mb-4">
                                    Price
                                </div>
                                <div className="flex flex-col gap-y-4 items-center">
                                    <button
                                        className="border border-black text-black xl:text-lg font-medium font-['Poppins'] text-center xl:px-8 py-2 rounded-3xl w-32 xl:w-44"
                                        onClick={() => setFilterPrice('higher')}
                                    >
                                        Higher</button>
                                    <Icon icon="icon-park-outline:change" className="text-zinc-500 text-2xl" />
                                    <button className="border border-black text-black xl:text-lg font-medium font-['Poppins'] text-center xl:px-8 py-2 rounded-3xl w-32 xl:w-44"
                                        onClick={() => setFilterPrice('lower')}
                                    >Lower</button>
                                </div>
                            </div>
                            <div className={`flex flex-col items-center ${categoryNameInPath === "AirPods" || categoryNameInPath === "Dyson" || categoryNameInPath === "All" ? 'hidden' : 'flex'}`}>
                                <p className="bg-button-blue text-text xl:text-lg font-medium font-['Poppins'] text-center px-8 py-2 rounded-3xl w-32 mb-4">Memory</p>
                                <div className="flex flex-col gap-y-1 md2:px-8 pb-4">
                                    {allMemory.map((memory, index) => (
                                        <label key={index} className="flex items-center gap-x-2">
                                            <input type="checkbox" onChange={() => addOrRemoveMemory(memory)} />
                                            <p onClick={() => addOrRemoveMemory(memory)}>{memory}</p>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className={`flex flex-col items-center ${categoryNameInPath === "AirPods" || categoryNameInPath === "All" ? 'hidden' : 'flex'}`}>
                                <p className="bg-button-blue text-text xl:text-lg font-medium font-['Poppins'] text-center px-8 py-2 rounded-3xl w-32 mb-4">Colors</p>
                                <div className="flex flex-col gap-y-1 md2:px-8 pb-4">
                                    {allColors.map((color, index) => (
                                        <label key={index} className="flex items-center gap-x-2">
                                            <input type="checkbox" onChange={() => addOrRemoveColor(color)} />
                                            <p onClick={() => addOrRemoveColor(color)}>{color}</p>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="md2:ml-6 col-start-1 md2:col-start-3 text-xl md2:text-3xl font-bold whitespace-nowrap">
                <span className="text-black ">All models.</span><span className="text-black text-opacity-50"> Take your pick.</span>
            </div>
        </div>
    )
}