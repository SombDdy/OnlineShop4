import { Layout, Search } from "@/components";
import { Icon } from '@iconify/react';
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { useCartStore } from './../store/cart'

interface Product {
    name: string;
    category: string;
    description: string;
    pricePerItem: number;
    quantity: number;
    rating: number
}

export default function PaymentConfirmation() {
    const router = useRouter()
    const [isFormVisible, setIsFormVisible] = useState(true);
    const card = useCartStore(state => state.cart)
    const incrementQuantity = useCartStore(state => state.incrementQuantity)
    const decrementQuantity = useCartStore(state => state.decrementQuantity)
    // const getTotalPrice = useCartStore(state => state.getTotalPrice)
    const removeItem = useCartStore(state => state.removeItem)
    // let subTotal : number = getTotalPrice()
    // useEffect(() => {
    //     subTotal = getTotalPrice();
    // }, [])

    const handleButtonClick = () => {
        setIsFormVisible(!isFormVisible);
    };

    const backButton = () => {
        router.back();
    }

    return (
        <Layout>
            <div className=" pb-12 w-full px-2 sm:px-4 lg:px-14">
                <Search handleSearch={function (e: React.ChangeEvent<HTMLInputElement>): void {
                    throw new Error("Function not implemented.");
                }} />
                <div className="pt-12 grid grid-cols-8">
                    <div className="flex flex-col col-span-8 md2:col-span-5 row-start-1">
                        <button onClick={backButton} className="pb-10 flex md2:hidden flex-row items-center gap-x-2 sm:gap-x-3">
                            <Icon icon="cil:arrow-top" rotate={3} className="text-black text-xl xs2:text-2xl sm:text-4xl font-medium" />
                            <p className="text-lg xs2:text-xl sm:text-3xl font-medium">Back</p>
                        </button>
                        <p className="text-black text-2xl xs2:text-3xl sm:text-5xl md2:text-4xl lg:text-5xl xl:text-7xl">Shipping Information</p>
                        {card.map((product, index) => (
                            <div className="mt-10 flex justify-center">
                                <div key={index} className="flex m2:w-[32vw] px-8 sm:px-10 md2:pl-10 items-center bg-zinc-100 rounded-2xl h-fit">
                                    <div className="flex w-full flex-col items-start">
                                        <div className="grid grid-cols-10 w-full  md2:flex-row py-4 md2:py-4">
                                            <Link href={'/product/Apple'} className="flex col-span-10 md2:col-start-2 lg:col-start-2 xl:col-start-3 row-start-1 justify-center md2:w-fit h-56 sm:h-80">
                                                <Image width={0} height={0} alt="product" src="/images/iphoneLight.svg" className="w-full h-full object-contain" />
                                            </Link>
                                            <div className="flex flex-col col-span-10 md2:col-start-2 lg:col-start-3 xl:col-start-3 row-start-2 gap-y-4 ">
                                                <p className="text-black lg:w-56 text-center text-base lg:text-lg xl:text-4xl font-medium mb-4 mt-4">{product.name}</p>
                                                <div className="flex justify-between ">
                                                    <div className="flex w-56 lg:w-72 flex-row items-center justify-center">
                                                        <button onClick={() => incrementQuantity(product.slug, product.modification)}>
                                                            <Icon icon="ic:sharp-minus" className={`border rounded-full border-blue items-center lg:w-6 lg:h-6 lg:px-0.5 `} />
                                                        </button>
                                                        <p className="text-dark text-base lg:text-lg xl:text-3xl font-medium px-6">{product.quantity}</p>
                                                        <button onClick={() => decrementQuantity(product.slug, product.modification)}>
                                                            <Icon icon="ic:sharp-plus" className={`border rounded-full border-blue items-center lg:w-6 lg:h-6 lg:px-0.5 `} />
                                                        </button>
                                                        <p className="text-black text-sm lg:text-base xl:text-3xl  font-medium mr-2">$ {product.modifications.price * product.quantity}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="col-span-8 md2:col-span-3 row-start-2 md2:row-start-1">
                        <div className={` bg-zinc-100 rounded-3xl w-fit h-fit p-10 ${isFormVisible ? 'block' : 'hidden'} mt-28`}>
                            <p className="text-black text-3xl font-medium pb-5">Contact information</p>
                            <input type="text" placeholder="First name" className=" border border-black text-lg placeholder-black rounded-3xl pl-10 w-full py-4 focus:outline-none" />
                            <input type="text" placeholder="Last Name" className=" border border-black text-lg placeholder-black rounded-3xl pl-10 w-full py-4 mt-5 focus:outline-none" />
                            <input type="text" placeholder="Phone number" className=" border border-black text-lg placeholder-black rounded-3xl pl-10 w-full py-4 mt-5 focus:outline-none" />
                            <input type="text" placeholder="Email" className=" border border-black text-lg placeholder-black rounded-3xl pl-10 w-full py-4 mt-5 focus:outline-none" />
                            <p className="text-black text-3xl font-medium pt-10">Delivery</p>
                            <input type="text" placeholder="City" className="border border-black text-lg rounded-3xl placeholder-black pl-10 w-full py-2 mt-10 focus:outline-none" />
                            <div className="flex justify-center pt-10">
                                <button onClick={handleButtonClick} className="bg-button-blue text-text py-2 w-4/5 rounded-3xl">Make an order</button>
                            </div>
                        </div>
                        <div className={` bg-zinc-100 rounded-3xl w-full h-fit p-10 ${isFormVisible ? 'hidden' : 'flex flex-col'} mt-28`}>
                            <div className="flex flex-row justify-between">
                                <p className="text-black text-3xl font-medium">Card detail</p>
                                <button onClick={handleButtonClick}>
                                    <Icon icon="cil:arrow-top" rotate={3} className="text-black text-xl font-medium" />
                                </button>
                            </div>
                            <p className="text-black opacity-60 text-lg font-medium pt-5">Select card Type</p>
                            <div className="flex gap-3 text-button-blue pt-5">
                                <Icon icon="cib:cc-visa" className="text-5xl" />
                                <Icon icon="fa-brands:cc-mastercard" className="text-5xl" />
                                <Icon icon="simple-icons:applepay" className="text-5xl" />
                            </div>
                            <input type="text" placeholder="Card Number" className=" border border-text text-lg placeholder-black rounded-3xl pl-10 w-full py-2 mt-5 focus:outline-none" />
                            <div className="flex flex-row justify-between pt-5">
                                <p className="text-black text-lg font-medium">Explore Date</p>
                                <p className="text-black text-lg font-medium">CVV</p>
                            </div>
                            <div className="flex flex-row justify-between pt-5">
                                <div className="flex flex-row items-end gap-x-1">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DateField variant="standard" />
                                    </LocalizationProvider>
                                </div>
                                <div>
                                    <div className="flex flex-row items-end">
                                        <input type="text" placeholder="" className="bg-zinc-100 border-b border-black border-opacity-50 text-sm text-bottom placeholder-black w-16 focus:outline-none" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex col-span-10 justify-between mt-10">
                                <div>
                                    <button className="bg-button-blue text-text py-2.5 px-5 rounded-3xl">CHECKOUT</button>
                                </div>
                                <div>
                                    <span className="text-black text-sm lg:text-base xl:text-3xl  font-medium mr-4">Bag total:</span><span className="text-black text-sm lg:text-base xl:text-3xl  font-bold">2000$</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}