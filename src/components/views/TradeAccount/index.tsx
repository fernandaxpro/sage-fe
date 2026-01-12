"use client";

import React, { useState } from "react";
import { Button, Input, Select, SelectItem, Checkbox, Textarea } from "@heroui/react";
import Container from "@/components/ui/Container";
import UserSidebar from "@/components/views/User/UserSidebar";
import { FaCheck } from "react-icons/fa";

const steps = [
    { title: "Company Details", id: 1 },
    { title: "Contact Details", id: 2 },
    { title: "Trade Reference", id: 3 },
    { title: "Additional Information", id: 4 },
    { title: "Banking Details", id: 5 },
];

const TradeAccount = () => {
    const [currentStep, setCurrentStep] = useState(1);

    const handleNext = () => {
        if (currentStep < steps.length) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <Container className="flex-col md:flex-row gap-8 py-8 px-4 sm:px-6 lg:px-8">
            <UserSidebar activeItem="Trade Account" />

            <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-8">Trade Account</h1>

                {/* Stepper */}
                <div className="mb-12 relative">
                    <div className="absolute top-4 left-0 w-full h-0.5 bg-gray-200 -z-10" />
                    <div
                        className="absolute top-4 left-0 h-0.5 bg-[#0F2744] -z-10 transition-all duration-300"
                        style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                    />
                    <div className="flex justify-between w-full">
                        {steps.map((step) => (
                            <div key={step.id} className="flex flex-col items-center gap-2 bg-white">
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-colors ${currentStep > step.id
                                        ? "bg-[#0F2744] border-[#0F2744] text-white"
                                        : currentStep === step.id
                                            ? "bg-white border-[#0F2744] text-[#0F2744]"
                                            : "bg-white border-gray-200 text-gray-400"
                                        }`}
                                >
                                    {currentStep > step.id ? <FaCheck size={12} /> : step.id}
                                </div>
                                <span
                                    className={`text-xs text-center max-w-[80px] ${currentStep === step.id ? "text-[#0F2744] font-medium" : "text-gray-400"
                                        }`}
                                >
                                    {step.title}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Form Content */}
                <div className="bg-white">
                    {currentStep === 1 && <Step1CompanyDetails />}
                    {currentStep === 2 && <Step2ContactDetails />}
                    {currentStep === 3 && <Step3TradeReference />}
                    {currentStep === 4 && <Step4AdditionalInfo />}
                    {currentStep === 5 && <Step5BankingDetails />}

                    <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-100">
                        {currentStep > 1 && (
                            <Button
                                variant="bordered"
                                radius="full"
                                className="border-[#E4E4E4] text-gray-700 min-w-[120px]"
                                onPress={handleBack}
                            >
                                Previous
                            </Button>
                        )}
                        <Button
                            className="bg-[#0F2744] text-white min-w-[120px]"
                            radius="full"
                            onPress={handleNext}
                        >
                            {currentStep === steps.length ? "Submit Application" : "Next Step"}
                        </Button>
                    </div>
                </div>
            </div>
        </Container>
    );
};

// Step Components
const Step1CompanyDetails = () => (
    <div className="space-y-6">
        <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-4 mb-6 hidden">Company Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Company Name" placeholder="e.g. Sunrise Tech Pty Ltd" labelPlacement="outside" variant="bordered" radius="sm" classNames={{ inputWrapper: "border-[#E4E4E4]" }} required />
            <Input label="Full Legal Name Of The Company" placeholder="e.g. Sunrise Technology Australia Pty Ltd" labelPlacement="outside" variant="bordered" radius="sm" classNames={{ inputWrapper: "border-[#E4E4E4]" }} required />
            <Input label="ABN" placeholder="e.g. 12 345 678 901" labelPlacement="outside" variant="bordered" radius="sm" classNames={{ inputWrapper: "border-[#E4E4E4]" }} required />
            <Input label="ACN" placeholder="e.g. 123 456 789" labelPlacement="outside" variant="bordered" radius="sm" classNames={{ inputWrapper: "border-[#E4E4E4]" }} required />
            <Input label="Street Address" placeholder="e.g. 25 King Street" labelPlacement="outside" variant="bordered" radius="sm" classNames={{ inputWrapper: "border-[#E4E4E4]" }} className="md:col-span-2" required />

            <div className="grid grid-cols-2 gap-4">
                <Select label="City" placeholder="Select city" labelPlacement="outside" variant="bordered" radius="sm" classNames={{ trigger: "border-[#E4E4E4]" }} required>
                    <SelectItem key="sydney">Sydney</SelectItem>
                    <SelectItem key="melbourne">Melbourne</SelectItem>
                </Select>
                <Select label="State / Territory" placeholder="Select state" labelPlacement="outside" variant="bordered" radius="sm" classNames={{ trigger: "border-[#E4E4E4]" }} required>
                    <SelectItem key="nsw">NSW</SelectItem>
                    <SelectItem key="vic">VIC</SelectItem>
                </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Input label="Postcode / ZIP" placeholder="e.g. 2000" labelPlacement="outside" variant="bordered" radius="sm" classNames={{ inputWrapper: "border-[#E4E4E4]" }} required />
                <Input label="Website" placeholder="e.g. www.sunrisetech.com.au" labelPlacement="outside" variant="bordered" radius="sm" classNames={{ inputWrapper: "border-[#E4E4E4]" }} required />
            </div>

            <Input label="Contact Information" placeholder="e.g. +61 412 345 678" labelPlacement="outside" variant="bordered" radius="sm" classNames={{ inputWrapper: "border-[#E4E4E4]" }} required />

            <div className="grid grid-cols-2 gap-4">
                <Input label="Years In Business" placeholder="e.g. 10" labelPlacement="outside" variant="bordered" radius="sm" classNames={{ inputWrapper: "border-[#E4E4E4]" }} required />
                <Input label="Years In Operation" placeholder="e.g. 5" labelPlacement="outside" variant="bordered" radius="sm" classNames={{ inputWrapper: "border-[#E4E4E4]" }} required />
            </div>

            <Select label="Type of Business" placeholder="Select type" labelPlacement="outside" variant="bordered" radius="sm" classNames={{ trigger: "border-[#E4E4E4]" }} required>
                <SelectItem key="installer">Installer</SelectItem>
                <SelectItem key="distributor">Distributor</SelectItem>
            </Select>
        </div>
    </div>
);

const Step2ContactDetails = () => (
    <div className="space-y-8">
        <div>
            <div className="inline-block px-4 py-1 rounded-full border border-blue-200 bg-blue-50 text-blue-600 text-xs font-medium mb-6">
                Contact 1
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Full Name" placeholder="e.g. John Anderson" labelPlacement="outside" variant="bordered" radius="sm" classNames={{ inputWrapper: "border-[#E4E4E4]" }} required />
                <Input label="Job Title" placeholder="e.g. Operations Manager" labelPlacement="outside" variant="bordered" radius="sm" classNames={{ inputWrapper: "border-[#E4E4E4]" }} required />
                <Input label="Phone Number" placeholder="e.g. +61 112 315 678" labelPlacement="outside" variant="bordered" radius="sm" classNames={{ inputWrapper: "border-[#E4E4E4]" }} required />
                <Input label="Email Address" placeholder="e.g. john.anderson@mail.com" labelPlacement="outside" variant="bordered" radius="sm" classNames={{ inputWrapper: "border-[#E4E4E4]" }} required />
            </div>
        </div>
        <div>
            <div className="inline-block px-4 py-1 rounded-full border border-gray-200 bg-gray-50 text-gray-600 text-xs font-medium mb-6">
                Contact 2
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Full Name" placeholder="e.g. John Anderson" labelPlacement="outside" variant="bordered" radius="sm" classNames={{ inputWrapper: "border-[#E4E4E4]" }} />
                <Input label="Job Title" placeholder="e.g. Operations Manager" labelPlacement="outside" variant="bordered" radius="sm" classNames={{ inputWrapper: "border-[#E4E4E4]" }} />
                <Input label="Phone Number" placeholder="e.g. +61 112 315 678" labelPlacement="outside" variant="bordered" radius="sm" classNames={{ inputWrapper: "border-[#E4E4E4]" }} />
                <Input label="Email Address" placeholder="e.g. john.anderson@mail.com" labelPlacement="outside" variant="bordered" radius="sm" classNames={{ inputWrapper: "border-[#E4E4E4]" }} />
            </div>
        </div>
    </div>
);

const Step3TradeReference = () => (
    <div className="space-y-8">
        {[1, 2, 3].map((num) => (
            <div key={num}>
                <div className="inline-block px-4 py-1 rounded-full border border-blue-200 bg-blue-50 text-blue-600 text-xs font-medium mb-6">
                    Reference {num}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input label="Company Name" placeholder="e.g. Alpha Supplies Pty Ltd" labelPlacement="outside" variant="bordered" radius="sm" classNames={{ inputWrapper: "border-[#E4E4E4]" }} required />
                    <Input label="Contact Person" placeholder="e.g. Michael Roberts" labelPlacement="outside" variant="bordered" radius="sm" classNames={{ inputWrapper: "border-[#E4E4E4]" }} required />
                    <Input label="Phone Number" placeholder="e.g. +61 112 315 678" labelPlacement="outside" variant="bordered" radius="sm" classNames={{ inputWrapper: "border-[#E4E4E4]" }} required />
                    <Input label="Email Address" placeholder="e.g. contact@alphasupplies.com.au" labelPlacement="outside" variant="bordered" radius="sm" classNames={{ inputWrapper: "border-[#E4E4E4]" }} required />
                </div>
            </div>
        ))}
    </div>
);

const Step4AdditionalInfo = () => (
    <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
            <Textarea placeholder="Please describe your business activities" label="Business Description" labelPlacement="outside" variant="bordered" radius="sm" classNames={{ inputWrapper: "border-[#E4E4E4]" }} minRows={4} />
            <Checkbox>I agree to the Terms and Conditions of Trade</Checkbox>
        </div>
    </div>
);

const Step5BankingDetails = () => (
    <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Account Name" placeholder="e.g. Business Account" labelPlacement="outside" variant="bordered" radius="sm" classNames={{ inputWrapper: "border-[#E4E4E4]" }} required />
            <Input label="Bank Name" placeholder="e.g. Commonwealth Bank" labelPlacement="outside" variant="bordered" radius="sm" classNames={{ inputWrapper: "border-[#E4E4E4]" }} required />
            <Input label="BSB" placeholder="e.g. 062-000" labelPlacement="outside" variant="bordered" radius="sm" classNames={{ inputWrapper: "border-[#E4E4E4]" }} required />
            <Input label="Account Number" placeholder="e.g. 1234 5678" labelPlacement="outside" variant="bordered" radius="sm" classNames={{ inputWrapper: "border-[#E4E4E4]" }} required />
        </div>
    </div>
);

export default TradeAccount;
