import { Button, Input, Tab, Tabs } from '@heroui/react'
import Image from 'next/image'
import React, { useState } from 'react'
import Link from "next/link";
import { AtSymbolIcon, EyeIcon, EyeSlashIcon, LockClosedIcon, UserIcon } from '@heroicons/react/16/solid';

const Register = () => {
    const [isVisiblePassword, setIsVisiblePassword] = useState(false);
    const toggleVisibilityPassword = () => setIsVisiblePassword(!isVisiblePassword);

    const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);
    const toggleVisibilityConfirm = () => setIsVisibleConfirm(!isVisibleConfirm);
    return (
        <div
            className='flex w-full items-stretch flex-col lg:flex-row h-screen p-[16px]'
        >
            <div className='flex-1 relative rounded-[10px]'>
                <Image
                    src="/images/general/login.svg"
                    alt="login"
                    fill
                    className="object-cover"
                    priority
                    style={{
                        borderRadius: '10px'
                    }}
                />
            </div>
            <div className='flex-1 flex flex-col p-[16px]'>
                <div className='flex justify-end'>
                    <Button
                        className='text-base font-medium text-legendary'
                        variant='bordered'
                        radius='full'
                        as={Link}
                        href='/'
                    >
                        Back to Home
                    </Button>
                </div>

                <div className='h-screen flex items-start justify-center my-4'>
                    <div className='flex flex-col justify-center max-w-[600px] gap-[16px]'>
                        <div className='flex flex-col gap-[8px] justify-center items-center'>
                            <h1 className='text-3xl font-semibold'>
                                Sign Up
                            </h1>
                            <p className='text-lg font-medium text-center'>
                                Create your account to explore advanced security solutions and seamless smart home control.
                            </p>
                        </div>

                        <div className="flex w-full flex-col justify-center">
                            <Tabs aria-label="Options" fullWidth>
                                <Tab key="free-account" title="Free Account" className='w-full'>
                                    <div className="flex flex-col gap-[16px] w-full mt-[16px]">
                                        <div className="flex flex-col gap-[16px]">
                                            <div className='flex gap-[16px]'>
                                                <Input
                                                    startContent={
                                                        <UserIcon className="w-5 h-5 text-base text-legendary pointer-events-none" />
                                                    }
                                                    label={
                                                        <span className="text-base font-semibold">First Name</span>
                                                    }
                                                    isRequired
                                                    placeholder="e.g. John"
                                                    labelPlacement="outside"
                                                    variant="bordered"
                                                    radius="full"
                                                    className='text-base font-semibold'
                                                />
                                                <Input
                                                    startContent={
                                                        <UserIcon className="w-5 h-5 text-base text-legendary pointer-events-none" />
                                                    }
                                                    label={
                                                        <span className="text-base font-semibold">Last Name</span>
                                                    }
                                                    isRequired
                                                    placeholder="e.g. Smith"
                                                    labelPlacement="outside"
                                                    variant="bordered"
                                                    radius="full"
                                                    className='text-base font-semibold'
                                                />
                                            </div>

                                            <Input
                                                startContent={
                                                    <AtSymbolIcon className="w-5 h-5 text-base text-legendary pointer-events-none" />
                                                }
                                                label={
                                                    <span className="text-base font-semibold">Email</span>
                                                }
                                                isRequired
                                                placeholder="e.g. email@example.com"
                                                labelPlacement="outside"
                                                variant="bordered"
                                                radius="full"
                                                className='text-base font-semibold'
                                            />

                                            <div className='flex gap-[16px]'>
                                                <Input
                                                    startContent={
                                                        <LockClosedIcon className="w-5 h-5 text-base text-legendary pointer-events-none" />
                                                    }
                                                    endContent={
                                                        <button
                                                            aria-label="toggle password visibility"
                                                            className="focus:outline-solid outline-transparent"
                                                            type="button"
                                                            onClick={toggleVisibilityPassword}
                                                        >
                                                            {isVisiblePassword ? (
                                                                <EyeIcon className="w-5 h-5 text-base text-legendary pointer-events-none" />
                                                            ) : (
                                                                <EyeSlashIcon className="w-5 h-5 text-base text-legendary pointer-events-none" />
                                                            )}
                                                        </button>
                                                    }
                                                    isRequired
                                                    labelPlacement="outside"
                                                    label={
                                                        <span className="text-base font-semibold">Password</span>
                                                    }
                                                    placeholder="*****"
                                                    type={isVisiblePassword ? "text" : "password"}
                                                    variant="bordered"
                                                    radius="full"
                                                    className='text-base font-semibold'
                                                />
                                                <Input
                                                    startContent={
                                                        <LockClosedIcon className="w-5 h-5 text-base text-legendary pointer-events-none" />
                                                    }
                                                    endContent={
                                                        <button
                                                            aria-label="toggle password visibility"
                                                            className="focus:outline-solid outline-transparent"
                                                            type="button"
                                                            onClick={toggleVisibilityConfirm}
                                                        >
                                                            {isVisibleConfirm ? (
                                                                <EyeIcon className="w-5 h-5 text-base text-legendary pointer-events-none" />
                                                            ) : (
                                                                <EyeSlashIcon className="w-5 h-5 text-base text-legendary pointer-events-none" />
                                                            )}
                                                        </button>
                                                    }
                                                    isRequired
                                                    labelPlacement="outside"
                                                    label={
                                                        <span className="text-base font-semibold">Confirm Password</span>
                                                    }
                                                    placeholder="*****"
                                                    type={isVisibleConfirm ? "text" : "password"}
                                                    variant="bordered"
                                                    radius="full"
                                                    className='text-base font-semibold'
                                                />
                                            </div>
                                        </div>

                                        <div className="flex justify-center w-full">
                                            <Button
                                                className="bg-primary text-white text-base font-bold rounded-full flex-1 px-[55px] py-[5px]"
                                                onPress={() => { }}
                                            >
                                                Sign Up
                                            </Button>
                                        </div>

                                        <div className='my-4'>
                                            <p className="text-center text-base font-medium">
                                                {"Already have an account?"}&nbsp;
                                                <Link href="/auth/login" className="text-primary font-bold text-base">
                                                    Sign In
                                                </Link>
                                            </p>
                                        </div>

                                        <div className="relative flex items-center justify-center gap-[24px]">
                                            <div className="flex-grow border-t border-[#E4E4E4]"></div>
                                            <span className="flex-shrink text-legendary text-base font-normal ">Or Sign Up with</span>
                                            <div className="flex-grow border-t border-[#E4E4E4]"></div>
                                        </div>

                                        <div className='flex gap-[16px]'>
                                            <div className="flex gap-4 w-full">
                                                <Button
                                                    className="bg-white text-gray-800 text-base font-semibold rounded-full flex-1 px-6 py-3 border border-gray-300"
                                                    onPress={() => { }}
                                                >
                                                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                                        <path
                                                            fill="#4285F4"
                                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                                        />
                                                        <path
                                                            fill="#34A853"
                                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                                        />
                                                        <path
                                                            fill="#FBBC05"
                                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                                        />
                                                        <path
                                                            fill="#EA4335"
                                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                                        />
                                                    </svg>
                                                    Google
                                                </Button>

                                                <Button
                                                    className="bg-white text-gray-800 text-base font-semibold rounded-full flex-1 px-6 py-3 border border-gray-300"
                                                    onPress={() => { }}
                                                >
                                                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="#1877F2">
                                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                                    </svg>
                                                    Facebook
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </Tab>
                                <Tab key="trade_account" title="Trade Account" className='w-full'>
                                    <div className="flex flex-col gap-[16px] w-full mt-[16px]">
                                        <div className="flex flex-col gap-[16px]">
                                            <div className='flex gap-[16px]'>
                                                <Input
                                                    startContent={
                                                        <UserIcon className="w-5 h-5 text-base text-legendary pointer-events-none" />
                                                    }
                                                    label={
                                                        <span className="text-base font-semibold">First Name</span>
                                                    }
                                                    isRequired
                                                    placeholder="e.g. John"
                                                    labelPlacement="outside"
                                                    variant="bordered"
                                                    radius="full"
                                                    className='text-base font-semibold'
                                                />
                                                <Input
                                                    startContent={
                                                        <UserIcon className="w-5 h-5 text-base text-legendary pointer-events-none" />
                                                    }
                                                    label={
                                                        <span className="text-base font-semibold">Last Name</span>
                                                    }
                                                    isRequired
                                                    placeholder="e.g. Smith"
                                                    labelPlacement="outside"
                                                    variant="bordered"
                                                    radius="full"
                                                    className='text-base font-semibold'
                                                />
                                            </div>

                                            <Input
                                                startContent={
                                                    <AtSymbolIcon className="w-5 h-5 text-base text-legendary pointer-events-none" />
                                                }
                                                label={
                                                    <span className="text-base font-semibold">Email</span>
                                                }
                                                isRequired
                                                placeholder="e.g. email@example.com"
                                                labelPlacement="outside"
                                                variant="bordered"
                                                radius="full"
                                                className='text-base font-semibold'
                                            />

                                            <div className='flex gap-[16px]'>
                                                <Input
                                                    startContent={
                                                        <LockClosedIcon className="w-5 h-5 text-base text-legendary pointer-events-none" />
                                                    }
                                                    endContent={
                                                        <button
                                                            aria-label="toggle password visibility"
                                                            className="focus:outline-solid outline-transparent"
                                                            type="button"
                                                            onClick={toggleVisibilityPassword}
                                                        >
                                                            {isVisiblePassword ? (
                                                                <EyeIcon className="w-5 h-5 text-base text-legendary pointer-events-none" />
                                                            ) : (
                                                                <EyeSlashIcon className="w-5 h-5 text-base text-legendary pointer-events-none" />
                                                            )}
                                                        </button>
                                                    }
                                                    isRequired
                                                    labelPlacement="outside"
                                                    label={
                                                        <span className="text-base font-semibold">Password</span>
                                                    }
                                                    placeholder="*****"
                                                    type={isVisiblePassword ? "text" : "password"}
                                                    variant="bordered"
                                                    radius="full"
                                                    className='text-base font-semibold'
                                                />
                                                <Input
                                                    startContent={
                                                        <LockClosedIcon className="w-5 h-5 text-base text-legendary pointer-events-none" />
                                                    }
                                                    endContent={
                                                        <button
                                                            aria-label="toggle password visibility"
                                                            className="focus:outline-solid outline-transparent"
                                                            type="button"
                                                            onClick={toggleVisibilityConfirm}
                                                        >
                                                            {isVisibleConfirm ? (
                                                                <EyeIcon className="w-5 h-5 text-base text-legendary pointer-events-none" />
                                                            ) : (
                                                                <EyeSlashIcon className="w-5 h-5 text-base text-legendary pointer-events-none" />
                                                            )}
                                                        </button>
                                                    }
                                                    isRequired
                                                    labelPlacement="outside"
                                                    label={
                                                        <span className="text-base font-semibold">Confirm Password</span>
                                                    }
                                                    placeholder="*****"
                                                    type={isVisibleConfirm ? "text" : "password"}
                                                    variant="bordered"
                                                    radius="full"
                                                    className='text-base font-semibold'
                                                />
                                            </div>
                                        </div>

                                        <div className="flex justify-center w-full">
                                            <Button
                                                className="bg-primary text-white text-base font-bold rounded-full flex-1 px-[55px] py-[5px]"
                                                onPress={() => { }}
                                            >
                                                Sign Up
                                            </Button>
                                        </div>

                                        <div className='my-5'>
                                            <p className="text-center text-base font-medium">
                                                {"Already have an account?"}&nbsp;
                                                <Link href="/auth/login" className="text-primary font-bold text-base">
                                                    Sign In
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                </Tab>
                            </Tabs>
                        </div>

                        <div className='flex flex-col justify-center items-center text-center'>
                            <p className='text-sm text-legendary'>
                                By creating account you agree to Company
                            </p>
                            <p className='text-sm text-primary'>
                                <span className='font-semibold'>Terms of Service</span> and <span className='font-semibold'>Privacy Policy.</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Register