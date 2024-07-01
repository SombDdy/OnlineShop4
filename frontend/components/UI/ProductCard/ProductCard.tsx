import { Icon } from '@iconify/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from "react-toastify";
import {useCartStore} from "../../../store/cart"
import { useState } from 'react';

interface Modification {
    name: string;
    price: string;
}

interface Image {
    name: string,
    color: string,
    main: boolean
}

interface ProductCardProps {
    item: {
        name: string,
        category: string,
        modifications: Modification[],
        images: Image[]

    }
}


export default function ProductCard({ item }: ProductCardProps) {
    const [pickedColor, setPickedColor] = useState<number>(0);
    const firstPrice = item.modifications && item.modifications.length > 0 && item.modifications[0].price ? item.modifications[0].price : "no price";
    const uniqueColors = Array.from(new Set(item.images.map((image) => image.color)));
    const addProduct = useCartStore(state => state.addProduct)
    const productInfo = {
        "name:": 'asdasdads',
        "description": 'dssdsd'
    }

    const colors = [
        {
            id: 0,
            img: '/images/mainwhiteMax.png',
            color: 'linear-gradient(to bottom,#F5F4F0,#D2D3D4)',
        },
        {
            id: 1,
            img: '/images/mainblueMax.png',
            color: 'linear-gradient(to bottom,#2F506C,#91A6BB)',
        },
        {
            id: 2,
            img: '/images/mainredMax.png',
            color: 'linear-gradient(to bottom,#F3443B,#D8A097)',
        },
        {
            id: 3,
            img: '/images/mainblackMax.png',
            color: 'linear-gradient(to bottom,#150605,#A4A4A4)',
        }
    ]

    return (
        <div className={`w-full col-span-8 md2:col-span-3`}>
            <div className="flex rounded-3xl flex-col justify-between w-full bg-zinc-100 px-4 py-4 h-full">
                <div className="text-black text-start text-xs sm:text-base lg:text-xl font-medium">{item.name}</div>
                <Link href={item.name ? `/product/${item.name.replace(/\s/g, '')}` : '#'} className="rounded-3xl px-5 py-6 sm:px-10 sm:py-6 h-56 sm:h-80 ">
                    {item.images && item.images.length > 0 && (
                        <img alt='product' src={`/images${item.images[0].name}`} className="w-full h-full object-contain" />
                    )}
                </Link>
                <div className = "flex justify-center w-full gap-x-2">
                    {uniqueColors.map((color, index) => (
                        <button
                            key={index}
                            className="p-2 rounded-full"
                            style={{ backgroundColor: color }}
                            
                        />
                    ))}
                    </div>
                <div className="flex flex-col justify-between mt-10">
                    <div className="flex flex-row items-center justify-between w-full">
                        <div className="text-black text-center text-xs lg:text-xl font-bold">{firstPrice} $</div>
                        <div className="inline-flex items-center rounded-xl px-1 py-1">
                            <div
                                className="cursor-pointer items-center bg-button-blue w-fit px-2 py-1.5 md:px-5 md:py-2 lg:px-10 lg:py-3 rounded-3xl text-text text-lg font-medium whitespace-nowrap flex flex-row gap-x-2"
                                onClick={(e) => {
                                    addProduct({...productInfo, color: colors[pickedColor].img, modification: ''});
                                    e.preventDefault();
                                    e.stopPropagation();
                                    toast.success('Added to Cart');
                                }}
                            >Buy</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}