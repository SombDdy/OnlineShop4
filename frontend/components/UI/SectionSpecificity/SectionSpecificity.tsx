import { Icon } from '@iconify/react';
import Image from 'next/image';
import Link from 'next/link';

export default function SectionSpecificity() {
    return (
        <div className="pt-20 pb-2 lg:pb-10 px-2 sm:px-4 lg:px-14">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                <div className="relative lg:pr-12 order-1 sm:order-2 lg:order-1 lg:col-span-2">
                    <div className=" text-neutral-400 text-start sm:text-end lg:text-start text-xs lg:text-lg font-medium">Popular</div>
                    <div className="text-stone-50 text-start sm:text-end lg:text-start text-sm lg:text-3xl font-medium pt-4 sm:pt-8">Find Product Space</div>
                    <div className="flex pl-5 sm:flex-row-reverse lg:flex-row pt-6">
                        <div className="flex flex-col pt-16 pr-6 sm:pt-12 sm:pl-4 lg:pt-32 lg:pr-12">
                            <button className="bg-stone-50 mb-4 lg:mb-8 rounded-full w-1 h-1 lg:w-3 lg:h-3 "></button>
                            <button className="bg-stone-50 mb-4 lg:mb-8 rounded-full w-1 h-1 lg:w-3 lg:h-3  "></button>
                            <button className="bg-stone-50 mb-4 lg:mb-8 rounded-full w-1 h-1 lg:w-3 lg:h-3  "></button>
                            <button className="bg-stone-50 mb-4 lg:mb-8 rounded-full w-1 h-1 lg:w-3 lg:h-3  "></button>
                        </div>
                        <div className="flex w-48 h-56 lg:w-80 lg:h-96 rounded-3xl bg-violet">
                            <div className='relative left-48 lg:top-4 lg:left-6 lg:h-24 lg:w-24'>
                                <div className="absolute w-16 h-16 top-4 right-4 lg:w-16 lg:h-16 lg:top-2 lg:left-2 rounded-full border border-stone-50 blur-[1.70px]"></div>
                                <div className="absolute w-12 h-12 top-6 right-6 lg:w-12 lg:h-12 lg:top-4 lg:left-4 rounded-full border border-stone-50 blur-[1.90px]"></div>
                                <button className="absolute top-8 right-8 lg:top-6 lg:left-6">
                                    <Icon icon="ic:sharp-plus" className="border w-8 h-8 rounded-full  text-violet bg-text" />
                                </button>
                            </div>

                            <Image width={0} height={0} alt='product' src="images/dyson.svg" className="pt-20 px-4 w-full h-full" />
                        </div>
                    </div>
                </div>
                <div className="order-2 sm:order-1 lg:order-2 lg:col-span-2 ">
                    <div className="text-stone-50 text-sm lg:text-xl font-medium pt-6">Specificity</div>
                    <div className="mt-6 mb-1 lg:my-6 p-4 w-50 lg:w-full bg-zinc-800 rounded-3xl lg:gap-x-4 lg:inline-flex">
                        <div className="flex-col justify-start items-start lg:gap-3 xl:gap-5 inline-flex">
                            <div>
                                <span className="text-neutral-400 text-xs lg:text-base xl:text-lg font-medium">Brend:</span><span className="text-stone-50 text-xs lg:text-base xl:text-lg font-medium"> Dyson</span>
                            </div>
                            <div>
                                <span className="text-neutral-400 text-xs lg:text-base xl:text-lg font-medium">Cable length:</span><span className="text-stone-50 text-xs lg:text-base xl:text-lg font-medium"> 2.6m</span>
                            </div>
                            <div>
                                <span className="text-neutral-400 text-xs lg:text-base xl:text-lg font-medium">Model:</span><span className="text-stone-50 text-xs lg:text-base xl:text-lg font-medium"> Airwrap Multi-styler Complete</span>
                            </div>
                            <div className="">
                                <span className="text-neutral-400 text-xs lg:text-base xl:text-lg font-medium">Additional Features:</span><span className="text-stone-50 text-xs lg:text-base xl:text-lg font-medium"> Intelligently controlling the heating element to keep temperatures below 150°C.</span>
                            </div>
                        </div>
                        <div className="flex-col justify-start items-start lg:gap-3 xl:gap-5 hidden lg:inline-flex">
                            <div>
                                <span className="text-neutral-400 lg:text-base xl:text-lg font-medium">Weight:</span><span className="text-stone-50 lg:text-base xl:text-lg font-medium"> 0,6 kg</span>
                            </div>
                            <div className="">
                                <span className="text-neutral-400 lg:text-base xl:text-lg font-medium">More information:</span><span className="text-stone-50 lg:text-base xl:text-lg font-medium"> Three precise airflow rates.  Three precise heating modes. Cold shot - instantly turns off the heating element.</span>
                            </div>
                            <div>
                                <span className="text-neutral-400 lg:text-base xl:text-lg font-medium">Air flow rate:</span><span className="text-stone-50 lg:text-base xl:text-lg font-medium"> 13.5 l/s</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end lg:hidden">
                        <button className="text-text-light text-xs">View all</button>
                    </div>
                    <div className="flex flex-row items-center pt-4">
                        <div className="text-center text-stone-50 text-base lg:text-xl font-medium pr-6">Colors</div>
                        <div className="">
                            <button className="bg-[#EA0082] rounded-full border-2 lg:border-4 -border-zinc-300 w-4 h-4 lg:w-12 lg:h-12 mr-3"></button>
                            <button className="bg-orange-400 rounded-full border-2 lg:border-4 -border-zinc-300 w-4 h-4 lg:w-12 lg:h-12 mr-3"></button>
                            <button className="bg-neutral-400 rounded-full border-2 lg:border-4 -border-zinc-300 w-4 h-4 lg:w-12 lg:h-12 mr-3"></button>
                            <button className="bg-indigo-900 rounded-full border-2 lg:border-4 -border-zinc-300 w-4 h-4 lg:w-12 lg:h-12 mr-3"></button>
                            <button className="bg-blue-950 rounded-full border-2 lg:border-4 -border-zinc-300 w-4 h-4 lg:w-12 lg:h-12"></button>
                        </div>
                    </div>
                    {/* <div className="flex items-center pt-16"> */}
                    <Link href="/product/Iphone13" className='mt-8 w-full md:w-1/2 flex rounded-3xl px-4 py-2 lg:px-6 lg:py-3 text-stone-50 text-xs lg:text-lg font-medium bg-violet  justify-center items-center gap-2.5 mr-8 whitespace-nowrap'>
                        <span className='uppercase'>Order now</span>
                        <Icon icon="fluent-mdl2:shop" className="text-stone-50 w-4 h-4 lg:w-6 lg:h-6" />
                    </Link>
                    {/* </div> */}
                </div>
            </div>
        </div>
    )
}