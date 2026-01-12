import React, { useState } from "react";
import { Button, Input, Link } from "@heroui/react";
import { RxCross2 } from "react-icons/rx";
import { EyeIcon, EyeSlashIcon, AtSymbolIcon, LockClosedIcon } from "@heroicons/react/16/solid";

interface HomepageLayoutMobileLoginDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const HomepageLayoutMobileLoginDrawer = ({
    isOpen,
    onClose,
}: HomepageLayoutMobileLoginDrawerProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] lg:hidden font-sans">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/50 transition-opacity"
                onClick={onClose}
            />

            {/* Drawer Content */}
            <div className="absolute top-0 left-0 bottom-0 w-full bg-white shadow-xl overflow-y-auto flex flex-col p-6 animate-slide-in-left">
                {/* Header / Close Button */}
                <div className="flex justify-start mb-6">
                    <button
                        onClick={onClose}
                        className="text-red-500 hover:text-red-700 transition-colors"
                        aria-label="Close login"
                    >
                        <RxCross2 className="w-8 h-8" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex flex-col">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Sign In</h2>

                    <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <Input
                                startContent={
                                    <AtSymbolIcon className="w-5 h-5 text-gray-400 pointer-events-none" />
                                }
                                isRequired
                                placeholder="e.g. email@example.com"
                                classNames={{
                                    input: "text-base",
                                    inputWrapper: "h-[48px] rounded-full border border-gray-200 bg-white",
                                }}
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password <span className="text-red-500">*</span>
                            </label>
                            <Input
                                startContent={
                                    <LockClosedIcon className="w-5 h-5 text-gray-400 pointer-events-none" />
                                }
                                endContent={
                                    <button
                                        className="focus:outline-none"
                                        type="button"
                                        onClick={toggleVisibility}
                                    >
                                        {isVisible ? (
                                            <EyeIcon className="w-5 h-5 text-gray-400" />
                                        ) : (
                                            <EyeSlashIcon className="w-5 h-5 text-gray-400" />
                                        )}
                                    </button>
                                }
                                isRequired
                                placeholder="xxxxxx"
                                type={isVisible ? "text" : "password"}
                                classNames={{
                                    input: "text-base",
                                    inputWrapper: "h-[48px] rounded-full border border-gray-200 bg-white",
                                }}
                            />
                        </div>

                        {/* Forgot Password */}
                        <Link href="#" className="text-primary font-semibold text-sm">
                            Forgot password?
                        </Link>

                        {/* Submit Button */}
                        <Button
                            className="bg-[#0f294d] text-white w-full font-bold rounded-full py-6 mt-2"
                            size="lg"
                            type="submit"
                        >
                            Sign In
                        </Button>

                        {/* Sign Up Link */}
                        <p className="text-center text-sm font-medium text-gray-600 mt-2">
                            Don&apos;t have an account?&nbsp;
                            <Link href="#" className="text-primary font-bold text-sm">
                                Sign Up
                            </Link>
                        </p>
                    </form>
                </div>
            </div>

            {/* Animation Reuse (Assuming styled-jsx handles duplication or we can move this to global CSS, but for now duplicate safely) */}
            <style jsx global>{`
        @keyframes slide-in-left {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0); }
        }
        .animate-slide-in-left {
          animation: slide-in-left 0.3s ease-out forwards;
        }
      `}</style>
        </div>
    );
};

export default HomepageLayoutMobileLoginDrawer;
