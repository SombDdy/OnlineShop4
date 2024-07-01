import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


export default function Footer() {
  const router = useRouter()
  const path = router.asPath
  const categoryNameInPath = path.split('/')[2];
  const icons = [
    {
      icon: "mi:computer",
      href: "/categories/iMac",
      name: 'iMac'
    },
    {
      icon: "ri:macbook-line",
      href: "/categories/MacBook",
      name: 'MacBook'
    },
    {
      icon: "pepicons-pop:smartphone-notch",
      href: "/categories/iPhone",
      name: 'iPhone'
    },
    {
      icon: "raphael:ipad",
      href: "/categories/iPad",
      name: 'iPad'
    },
    {
      icon: "tdesign:watch",
      href: "/categories/AppleWatch",
      name: 'AppleWatch'
    },
    {
      icon: "solar:airbuds-case-open-broken",
      href: "/categories/AirPods",
      name: 'AirPods'
    },
    {
      icon: "arcticons:my-dyson",
      href: "/categories/Dyson",
      name: 'Dyson'
    },
  ]
  return (
    <div className={`w-full bg-white flex`}>
      <div className="justify-around items-center flex w-full">
        <div className="flex w-full h-fit justify-between md2:justify-around my-8  items-center">
          <div className="mr-6">
            <p className="font-bold text-black text-sm md2:text-base md2:pl-6 sm:px-6 ">Categories</p>
            <div className="grid md2:grid-cols-2 justify-center gap-2 mt-4">
              {icons.map((k, index) => (
                <Link
                  key={index}
                  href={k.href}
                  className={`flex gap-6 sm:px-6 rounded-lg items-center text-sm md2:text-base text-text-light`}
                >
                  <p>{k.name}</p>
                </Link>
              ))}
              <Link href='/categories/All' className="text-text-light text-sm md2:text-base xl:ml-0 sm:px-6">
                Support
              </Link>
              <Link href='/categories/All' className={`text-text-light text-sm md2:text-base xl:ml-0 sm:px-6`}>
                All
              </Link>
            </div>
          </div>
          <div className="flex mb-6 sm:mb-9 md:mb-12 md2:mb-16 flex-col justify-start gap-y-3">
            <p className="font-bold text-black text-sm md2:text-base">Contact us</p>
            <p className="flex items-center text-black text-sm md2:text-base"><Icon icon="mingcute:location-line" />123 Main Street, Anytown,USA</p>
            <p className="flex items-center text-black text-sm md2:text-base"><Icon icon="solar:phone-calling-linear" />+1 (555) 123-4567</p>
            <p className="flex items-center text-black text-sm md2:text-base"><Icon icon="solar:letter-linear" />TechHeimSupport@gmail.com</p>
            <div className="flex md2:hidden  flex-col  justify-start items-start">
              <p className="font-bold text-black text-sm md2:text-base">Sign up for News and updates</p>
              <Box sx={{ '& > :not(style)': { my: 2 } }}>
                <TextField
                  label="E-mail Address"
                  id="outlined-size-small"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <ArrowForwardIosIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <div className="flex gap-x-2">
                <Icon icon="ant-design:facebook-outlined" />
                <Icon icon="radix-icons:twitter-logo" />
                <Icon icon="mdi:instagram" />
                <Icon icon="teenyicons:youtube-outline" />
              </div>
            </div>
          </div>
          <div className="hidden md2:flex flex-col mb-20 justify-start items-start">
            <p className="font-bold text-black ">Sign up for News and updates</p>
            <Box sx={{ '& > :not(style)': { my: 2 } }}>
              <TextField
                label="E-mail Address"
                id="outlined-size-small"
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <ArrowForwardIosIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <div className="flex gap-x-2">
              <Icon icon="ant-design:facebook-outlined" />
              <Icon icon="radix-icons:twitter-logo" />
              <Icon icon="mdi:instagram" />
              <Icon icon="teenyicons:youtube-outline" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}