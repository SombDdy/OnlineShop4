import { Layout, Search } from "@/components";
import { Icon } from '@iconify/react';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import data from '../../data/data.json';
import Image from "next/image";
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import React from "react";
import StarIcon from '@mui/icons-material/Star';
import { toast } from "react-toastify";

const labels: { [index: number]: string } = {
    0.5: '0.5 / 5',
    1: '1 / 5',
    1.5: '1.5 / 5',
    2: '2 / 5',
    2.5: '2.5 / 5',
    3: '3 / 5',
    3.5: '3.5 / 5',
    4: '4 / 5',
    4.5: '4.5 / 5',
    5: '5 / 5',
};

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

export default function Product() {
    const router = useRouter()

    const [pickedColor, setPickedColor] = useState<string | null>(null);
    const [uniqueColors, setUniqueColors] = useState<Set<string>>(new Set());
    const [selectedModification, setSelectedModification] = useState<Modification | null>(null);
    const [activeImageIndex, setActiveImageIndex] = useState<number>(0);


    const getColorFromImagePath = (imagePath: string) => {
        const colorMatch = imagePath.match(/\/\w+\/\w+\/(\w+)\/\w+/);
        return colorMatch ? colorMatch[1] : null;
    };

    const productName = router.query.product;
    const item: ProductInfo = data.find((product) => product.name.replace(/\s/g, '') === productName);

    const otherImages = item?.images.filter((image) => image.name) || [];

    const [filteredImages, setFilteredImages] = useState<ImageInfo[]>(otherImages);

    const colors = Array.from(uniqueColors).filter((color) => color !== null);
    console.log(colors)
    const price = selectedModification?.price || '';
    const modifications = item?.modifications || [];

    useEffect(() => {
        if (colors.length > 0 && pickedColor === null) {
            const initialColor = colors[0];
            setPickedColor(initialColor);
            const initialFilteredImages = initialColor
                ? item?.images.filter((image) => getColorFromImagePath(image.name) === initialColor) || []
                : otherImages;

            setFilteredImages(initialFilteredImages);
        }
        if (item?.modifications && item.modifications.length > 0 && selectedModification === null) {
            setSelectedModification(item.modifications[0]);
        }
        if (item && uniqueColors.size === 0) {
            const colors = new Set(item.images.map((image) => getColorFromImagePath(image.name)));
            setUniqueColors(colors);
        }
    }, [colors, item, otherImages, pickedColor, selectedModification, uniqueColors]);

    const сolorButtonClick = (color: string) => {
        setPickedColor(color);
        const newFilteredImages = color
            ? item?.images.filter((image) => getColorFromImagePath(image.name) === color) || []
            : otherImages;

        setFilteredImages(newFilteredImages);
        setActiveImageIndex(0);
    };

    const onModificationClick = (modification: React.SetStateAction<Modification | null>) => {
        setSelectedModification(modification);
    };

    const prevImage = () => {
        if (filteredImages.length > 1) {
            setActiveImageIndex((prevIndex) => {
                const newIndex = (prevIndex - 1 + filteredImages.length) % filteredImages.length;
                return newIndex;
            });
        }
    };

    const nextImage = () => {
        if (filteredImages.length > 1) {
            setActiveImageIndex((prevIndex) => {
                const newIndex = (prevIndex + 1) % filteredImages.length;
                return newIndex;
            });
        }
    };
    const getUniqueCharacteristicTypes = (characteristics: any[]) => {
        const uniqueTypes = new Set();

        const uniqueCharacteristics = characteristics.filter((characteristic) => {
            const { type } = characteristic;

            if (!uniqueTypes.has(type)) {
                uniqueTypes.add(type);
                return true;
            }

            return false;
        });

        return uniqueCharacteristics;
    };

    const characteristics = item?.characteristics || [];
    const uniqueCharacteristicTypes = getUniqueCharacteristicTypes(characteristics);
    const middleIndex = Math.ceil((uniqueCharacteristicTypes.length + 1) / 2);
    const firstUniqueTypes = uniqueCharacteristicTypes.slice(0, middleIndex);
    const remainingUniqueTypes = uniqueCharacteristicTypes.slice(middleIndex);
    return (
        <Layout>
            <div className=" w-full">
                <Search handleSearch={function (e: React.ChangeEvent<HTMLInputElement>): void {
                    throw new Error("Function not implemented.");
                } } />
                <div className="pb-8 pt-16 grid grid-cols-10 w-full pr-2 sm:pr-4 lg:pr-14 px-2 sm:px-4 lg:px-14">
                    <div className="col-span-10 md2:col-span-7 row-start-1 row-end-2 mr-4">
                        <div className="h-fit">
                            <div className="grid grid-cols-6 rounded-3xl">
                                <p className="text-black pb-10 text-xl xl:text-5xl font-bold font-['Poppins'] whitespace-nowrap">Buy {item?.name}</p>
                                <div className="flex flex-col items-start justify-center lg:items-center col-span-6 h-fit">
                                    <div className="flex flex-col rounded-3xl justify-center items-center bg-text 2xl:mx-10 shadow-lg px-5 sm:px-8 py-12 md2:h-[64vh] md2:w-[70vh]">
                                        <img src={`/images${filteredImages[activeImageIndex]?.name}`} className="w-full h-full object-contain" />
                                        <div className="flex col-span-6 md2:col-start-1 md2:col-end-7 mt-4 w-full">
                                    <div className="flex justify-center mb-4 w-full">
                                        <button onClick={prevImage} className="px-4 bg-primary text-white rounded-full">
                                            <Icon icon="cil:arrow-top" rotate={3} className="text-black sm:text-xl font-medium" />
                                        </button>

                                        <button onClick={nextImage} className="px-4 bg-primary text-white rounded-full">
                                            <Icon icon="cil:arrow-top" rotate={1} className="text-black sm:text-xl font-medium" />
                                        </button>
                                    </div>
                                </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between col-span-10 md2:col-span-6 row-start-2 row-end-6 md2:row-start-1 pt-4 md2:pt-0">
                        <div className="flex flex-col w-96 justify-between">
                            <div>
                                <span className="text-black text-base lg:text-2xl font-bold font-['Poppins'] pt-3 lg:pt-10">Finish.</span><span className="text-black text-opacity-50 text-base lg:text-2xl font-bold font-['Poppins'] pt-3 lg:pt-10"> Pick your favorite.</span>
                            </div>
                            <div className = "flex flex-col">
                            <p className="text-black text-base lg:text-2xl font-bolt font-['Poppins'] pt-5 lg:pt-8">Color</p>
                            <div className="grid grid-cols-3 gap-x-5 xs2:gap-x-8 sm:gap-x-10 md:gap-x-10 md2:gap-x-10 pt-3 lg:pt-4">
                                {colors.map((color) => (
                                    <div className="flex flex-col items-center" key={color}>
                                        <button
                                            className={`px-2 py-1.5 xs2:px-3 sm:px-4 sm:py-4 md2:px-2 md2:py-2 lg:px-4 lg:py-4  ${color === pickedColor ? `text-black font-bolt` : 'text-xs md:text-base font-medium'
                                                } rounded-full border-2 shadow-inner`}
                                            onClick={() => сolorButtonClick(color)}
                                            style={{ background: color }}
                                        >
                                        </button>
                                        <p className={`pb-4 text-black text-base lg:text-2xl font-['Poppins'] ${color === pickedColor ? 'font-bold' : 'font-medium'}`}>{color}</p>
                                    </div>
                                ))}
                            </div>
                            </div>
                            {modifications.some(modification => modification.name && modification.price) && (
                                <div>
                                    <span className="text-black text-base lg:text-2xl font-bold font-['Poppins'] pt-3 lg:pt-10">Storage. </span><span className="text-black text-opacity-50 text-base lg:text-2xl font-bold font-['Poppins'] pt-3 lg:pt-10">How much space do you need?</span>
                                    <div className="flex flex-col gap-x-4 gap-y-4 pt-3 lg:pt-4">
                                        {modifications.map((modification) => (
                                            <button
                                                className={`flex justify-between px-1.5 py-1 sm:px-3 sm:py-1 lg:px-4 lg:py-8 ${modification.name === selectedModification?.name ? 'bg-black text-white' : 'border-black border'} rounded-xl sm:rounded-2xl`}
                                                onClick={() => onModificationClick(modification)}
                                            >
                                                <p className="font-bold">{modification.name}</p>
                                                <p>{modification.price} $</p>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <div className="flex justify-between pb-12">
                                <div>
                                    <p className="text-black text-base lg:text-xl font-bold font-['Poppins'] pt-3 lg:pt-5">Price</p>
                                    <p className="text-black text-base lg:text-3xl font-bold font-['Poppins'] pt-3">{price} $</p>
                                </div>
                                <div className="flex items-center pt-8 text-xl">
                                    <button className="bg-blue items-end px-2 py-1.5 md:px-5 md:py-2 lg:px-10 lg:py-3 rounded-2xl text-text font-medium whitespace-nowrap flex flex-row gap-x-2"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            toast.success('Added to Cart');
                                        }} >
                                        Buy</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="bg-gray-100">
                    <div className="pt-10 w-full grid grid-cols-10 px-2 sm:px-4 lg:px-56">
                        <div className=" pt-8 mt-8 mb-8 col-span-10 border-t-2 border-black border-opacity-50 order-3">
                            <p className="text-black text-2xl lg:text-4xl font-bold font-['Poppins']">Description</p>
                            <p className="text-zinc-600 text-lg lg:text-2xl font-medium font-['Poppins'] pt-8">
                                {item?.description}
                            </p>
                        </div>
                        <p className="text-black text-2xl lg:text-4xl font-bold font-['Poppins']">Specificity</p>
                        <div className="grid grid-cols-10 col-span-10">
                            <div className="flex flex-col col-span-5">
                                <div className="flex flex-col">
                                    {firstUniqueTypes.map((uniqueType) => (
                                        <><p className="text-zinc-600 text-sm md2:text-base font-medium pt-6">{uniqueType.type}</p>
                                            <div className="flex flex-col gap-y-1 pt-3">
                                                {characteristics
                                                    .filter((char) => char.type === uniqueType.type)
                                                    .map((char) => (
                                                        <div>
                                                            <span className="text-zinc-600 text-base font-normal">{char.name}: </span>
                                                            <span className="text-black text-base font-normal">{char.value}</span>
                                                        </div>
                                                    ))}
                                            </div>
                                        </>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col col-span-5">
                                <div className="flex flex-col pl-4">
                                    {remainingUniqueTypes.map((uniqueType) => (
                                        <><p className="text-zinc-600 text-xs md2:text-base font-medium pt-6">{uniqueType.type}</p>
                                            <div className="flex flex-col gap-y-1 pt-3">
                                                {characteristics
                                                    .filter((chars) => chars.type === uniqueType.type)
                                                    .map((chars) => (
                                                        <div>
                                                            <span className="text-zinc-600 text-base font-normal">{chars.name}: </span>
                                                            <span className="text-black text-base font-normal">{chars.value}</span>
                                                        </div>
                                                    ))}
                                            </div>
                                        </>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
