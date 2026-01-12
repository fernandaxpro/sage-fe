"use client";

import { useState } from "react";
import { Button, Accordion, AccordionItem } from "@heroui/react";
import { FaPlus, FaMinus } from "react-icons/fa";
import Container from "@/components/ui/Container";
import Link from "next/link";

// FAQ Categories
const categories = [
    { id: "getting-started", label: "Getting Started" },
    { id: "installation", label: "Installation & Setup" },
    { id: "product-features", label: "Product Features" },
    { id: "account-technical", label: "Account & Technical Issues" },
    { id: "warranty", label: "Warranty & Support" },
];

// FAQ Data
const faqData = {
    "getting-started": [
        {
            question: "How do I create an account?",
            answer: "Click \"Register\" at the top right corner, choose Free Account or Trade Account, fill in your details, and verify your email. Once confirmed, you can log in and start exploring the site.",
        },
        {
            question: "How do I log in to my account?",
            answer: "Click the \"Login\" button at the top right corner of the page. Enter your email address and password, then click \"Sign In\". If you&apos;ve forgotten your password, click \"Forgot Password\" to reset it.",
        },
        {
            question: "Do I need an account to make a purchase?",
            answer: "While you can browse products without an account, you&apos;ll need to create one or log in to complete a purchase. This allows us to save your order history and provide better support.",
        },
        {
            question: "Can I track my orders through the website?",
            answer: "Yes! Once logged in, go to \"My Account\" and select \"Orders\". You&apos;ll see all your orders with their current status and tracking information when available.",
        },
        {
            question: "What should I do if I forget my password?",
            answer: "Click \"Login\" and then \"Forgot Password\". Enter your email address and we&apos;ll send you a link to reset your password. Check your spam folder if you don&apos;t see the email within a few minutes.",
        },
    ],
    "installation": [
        {
            question: "How do I install my security camera?",
            answer: "Each camera comes with a detailed installation guide. Generally, you&apos;ll need to mount the camera, connect power, and configure it through our app or web interface. For professional installation, contact our support team.",
        },
        {
            question: "What tools do I need for installation?",
            answer: "Most installations require a drill, screwdriver, and ladder. Specific requirements vary by product - check the product manual for a complete list of tools needed.",
        },
        {
            question: "Can I install products myself?",
            answer: "Many of our products are designed for DIY installation. However, for complex setups or if you&apos;re not comfortable with electrical work, we recommend professional installation services.",
        },
    ],
    "product-features": [
        {
            question: "What is the warranty period for products?",
            answer: "Most products come with a standard 2-year manufacturer warranty. Some premium products may have extended warranty options. Check the product page for specific warranty information.",
        },
        {
            question: "Are the cameras weatherproof?",
            answer: "Outdoor cameras are rated IP65 or higher, meaning they&apos;re protected against dust and water jets. Check individual product specifications for exact ratings.",
        },
        {
            question: "Do products work with smart home systems?",
            answer: "Many of our products integrate with popular smart home platforms like Google Home, Amazon Alexa, and Apple HomeKit. Check product compatibility on each product page.",
        },
    ],
    "account-technical": [
        {
            question: "Why can't I log into my account?",
            answer: "Common issues include incorrect password, unverified email, or account lockout after multiple failed attempts. Try resetting your password or contact support for assistance.",
        },
        {
            question: "How do I update my account information?",
            answer: "Log in to your account, go to \"My Account\" settings, and you can update your personal information, shipping addresses, and communication preferences.",
        },
    ],
    "warranty": [
        {
            question: "How do I make a warranty claim?",
            answer: "Contact our support team with your order number and a description of the issue. We&apos;ll guide you through the warranty claim process and arrange repair or replacement as needed.",
        },
        {
            question: "What does the warranty cover?",
            answer: "Our warranty covers manufacturing defects and component failures under normal use. It does not cover damage from misuse, accidents, or unauthorized modifications.",
        },
        {
            question: "How long does warranty processing take?",
            answer: "Most warranty claims are processed within 5-7 business days. Complex cases may take longer. We&apos;ll keep you updated throughout the process.",
        },
    ],
};

const FAQ = () => {
    const [selectedCategory, setSelectedCategory] = useState("getting-started");

    const currentFAQs = faqData[selectedCategory as keyof typeof faqData] || [];

    return (
        <Container className="flex-col gap-6 lg:gap-8 px-4 sm:px-6 lg:px-8 py-6">
            {/* Breadcrumb */}
            <div className="text-xs sm:text-sm text-gray-500">
                <Link href="/" className="text-gray-400 cursor-pointer hover:text-primary">Home</Link>
                <span className="mx-2">&gt;</span>
                <span className="text-primary">FAQ</span>
            </div>

            {/* Main Content */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                {/* Left Side - Title & Categories */}
                <div className="lg:w-[320px] flex-shrink-0">
                    <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-4">FAQs</h1>
                    <p className="text-gray-500 text-sm mb-6">
                        Everything you need to know about our products, installation process,
                        smart features, and troubleshooting guides.
                    </p>

                    {/* Category Buttons */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category.id
                                        ? "bg-primary text-white"
                                        : "bg-white border border-[#E4E4E4] text-gray-600 hover:border-primary hover:text-primary"
                                    }`}
                            >
                                {category.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right Side - FAQ Accordion */}
                <div className="flex-1">
                    <Accordion
                        variant="light"
                        selectionMode="multiple"
                        className="gap-0"
                    >
                        {currentFAQs.map((faq, index) => (
                            <AccordionItem
                                key={index}
                                aria-label={faq.question}
                                title={
                                    <span className="text-sm sm:text-base font-medium text-gray-800">
                                        {faq.question}
                                    </span>
                                }
                                indicator={({ isOpen }) => (
                                    isOpen ? (
                                        <FaMinus size={12} className="text-gray-400" />
                                    ) : (
                                        <FaPlus size={12} className="text-gray-400" />
                                    )
                                )}
                                classNames={{
                                    base: "border-b border-[#E4E4E4]",
                                    title: "font-medium",
                                    trigger: "py-4 px-0",
                                    content: "pb-4 pt-0 text-sm text-gray-600",
                                }}
                            >
                                {faq.answer}
                            </AccordionItem>
                        ))}
                    </Accordion>

                    {/* Still Have Questions Section */}
                    <div className="mt-8 bg-gray-50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            Still have questions?
                        </h3>
                        <p className="text-sm text-gray-500 mb-4">
                            Contact our support team and we&apos;ll make sure everything is clear and easy for you.
                        </p>
                        <Button
                            color="primary"
                            radius="sm"
                            className="font-medium"
                        >
                            Contact Support
                        </Button>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default FAQ;
