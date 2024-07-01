import Link from 'next/link';
import { ChangeEvent, useRef, useState } from 'react';
import { Search, SectionProduct } from '@/components';
import React from 'react';
import data from '../../../data/data.json';
import { ProductCard } from '@ui'
import { useSnapCarousel } from 'react-snap-carousel';
import { useRouter } from 'next/router';


export default function MainBody() {

    const handle1Wheel = (e: { preventDefault: () => void; deltaY: number; }) => {
        e.preventDefault();
        const container = document.querySelector('.flex.col-start-5.col-span-12');
        if (container) {
            const scrollSpeed = 5;
            container.scrollLeft -= e.deltaY * scrollSpeed;
        }
    };

    const handle2Wheel = (e: { preventDefault: () => void; deltaY: number; }) => {
        e.preventDefault();
        const container = document.querySelector('.flex.col-start-5.col-span-12');
        if (container) {
            const scrollSpeed = 5;
            container.scrollLeft += e.deltaY * scrollSpeed;
        }
    };

    const router = useRouter()
    const isIphone = "iPhone";
    const isIpad = "iPad"
    const iphoneData = data.filter((item) =>
        item.category && item.category.toLowerCase() === (isIphone && isIphone.toLowerCase())
    );

    const ipadData = data.filter((item) =>
        item.category && item.category.toLowerCase() === (isIpad && isIpad.toLowerCase())
    );

    

    return (
        <div className="flex flex-col">
            <Search handleSearch={function (e: ChangeEvent<HTMLInputElement>): void {
                throw new Error('Function not implemented.');
            }} />
            <div className='flex flex-col items-center justify-center w-full pt-16'>
                <div>
                    <span className="text-4xl text-black">Store.</span><span className="text-4xl text-black text-opacity-50"> The best way to buy the products you love</span>
                </div>
            </div>
            <div className="grid grid-cols-8 pt-12">
                <div className="flex col-start-5 col-span-12 overflow-auto parent-container"
                    onWheel={handle1Wheel}   
                >
                    <ul className="flex gap-x-4"
                        style={{
                            scrollSnapType: 'x mandatory',
                            scrollPadding: '0px',
                            scrollSnapAlign: 'start'
                        }}
                    >
                        {iphoneData.map((item, index) => (
                            <li key={index} className="flex col-span-2" style={{ minWidth: '400px' }}>
                                <ProductCard item={item} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="grid grid-cols-8 pt-12">
                <div className="flex col-start-5 col-span-12 overflow-auto parent-container"
                    onWheel={handle2Wheel}   
                >
                        <ul className="flex gap-x-4"
                            style={{
                                scrollSnapType: 'x mandatory',
                                scrollPadding: '0px',
                                scrollSnapAlign: 'start'
                            }}
                        >
                            {ipadData.map((item, index) => (
                                <li key={index} className="flex col-span-2" style={{ minWidth: '400px' }}>
                                    <ProductCard item={item} />
                                </li>
                            ))}
                        </ul>
                    <button >Prev</button>
                    <button >Next</button>
                </div>
            </div>
        </div>
    )
}