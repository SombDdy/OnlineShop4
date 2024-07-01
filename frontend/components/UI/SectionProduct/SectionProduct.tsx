import { Icon } from '@iconify/react';
import data from '../../../data/data.json'
import { ProductCard } from '@ui';

export default function SectProduct() {
    return (
        <div className="pt-10 lg:pt-28 xl:pt-24 ">
            <div className="pt-20 w-full  overflow-hidden">
                <div className="">
                    <div>
                        <span>iPhones.</span><span> Essentials that pair perfectly with your favorite devices.</span>
                    </div>
                    <div className="grid justify-between grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-x-6 gap-y-6 lg:gap-y-12 lg:gap-x-8 xl:gap-y-12 xl:gap-x-12">
                        {data.slice(0, 3).map(item => <ProductCard item={item} />)}
                    </div>
                </div>
            </div>
            <div className="pt-20 w-full">
                <div className="">
                    <div>
                        <span>Loud and clear.</span><span> Unparalleled choices for rich, high-quality sound.</span>
                    </div>
                    <div className="grid justify-between grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-x-6 gap-y-6 lg:gap-y-12 lg:gap-x-8 xl:gap-y-12 xl:gap-x-12">
                        {data.slice(3, 6).map(item => <ProductCard item={item} />)}
                    </div>
                </div>
            </div>
        </div>
    )
}