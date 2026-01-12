"use client";

import { useState } from "react";
import { Input, Textarea, Button } from "@heroui/react";
import { LuPhone, LuMail, LuMapPin, LuClock } from "react-icons/lu";
import Container from "@/components/ui/Container";
import Link from "next/link";

// Contact info data
const contactInfo = [
    {
        icon: <LuPhone className="w-5 h-5" />,
        title: "Contact",
        value: "1300 843 883",
    },
    {
        icon: <LuMail className="w-5 h-5" />,
        title: "Email",
        value: "admin@alarmexpert.com.au",
    },
    {
        icon: <LuMapPin className="w-5 h-5" />,
        title: "Location",
        value: "Church Avenue, Mascot, NSW, 2020",
    },
    {
        icon: <LuClock className="w-5 h-5" />,
        title: "Hours of Operation",
        value: "Monday - Sunday, 9AM - 10PM",
    },
];

const Contact = () => {
    const [formData, setFormData] = useState({
        email: "",
        subject: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsSubmitting(false);
        // Reset form
        setFormData({ email: "", subject: "", message: "" });
        alert("Message sent successfully!");
    };

    return (
        <Container className="flex-col gap-6 lg:gap-8 px-4 sm:px-6 lg:px-8 py-6">
            {/* Breadcrumb */}
            <div className="text-xs sm:text-sm text-gray-500">
                <Link href="/" className="text-gray-400 cursor-pointer hover:text-primary">Home</Link>
                <span className="mx-2">&gt;</span>
                <span className="text-primary">Contact</span>
            </div>

            {/* Page Title */}
            <h1 className="text-3xl sm:text-4xl font-bold text-primary">Contact Us</h1>

            {/* Main Content */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                {/* Left Side - Contact Info */}
                <div className="lg:w-[400px] flex-shrink-0">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">
                        How can we help you?
                    </h2>
                    <p className="text-sm text-gray-500 mb-6">
                        Feel free to contact us for any questions, technical support, or potential
                        collaboration—we&apos;re happy to help.
                    </p>

                    {/* Contact Info Items */}
                    <div className="space-y-4">
                        {contactInfo.map((item, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                                    {item.icon}
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-800">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-gray-500">{item.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side - Contact Form */}
                <div className="flex-1">
                    <div className="bg-white border border-[#E4E4E4] rounded-lg p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            Leave a Message
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        type="email"
                                        placeholder="Enter email address"
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({ ...formData, email: e.target.value })
                                        }
                                        required
                                        size="sm"
                                        radius="sm"
                                        classNames={{
                                            inputWrapper: "border border-[#E4E4E4] bg-white",
                                        }}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Subject <span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        type="text"
                                        placeholder="Enter subject"
                                        value={formData.subject}
                                        onChange={(e) =>
                                            setFormData({ ...formData, subject: e.target.value })
                                        }
                                        required
                                        size="sm"
                                        radius="sm"
                                        classNames={{
                                            inputWrapper: "border border-[#E4E4E4] bg-white",
                                        }}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Messages <span className="text-red-500">*</span>
                                </label>
                                <Textarea
                                    placeholder="Enter messages"
                                    value={formData.message}
                                    onChange={(e) =>
                                        setFormData({ ...formData, message: e.target.value })
                                    }
                                    required
                                    minRows={4}
                                    radius="sm"
                                    classNames={{
                                        inputWrapper: "border border-[#E4E4E4] bg-white",
                                    }}
                                />
                            </div>

                            <div className="flex justify-center pt-2">
                                <Button
                                    type="submit"
                                    color="primary"
                                    radius="sm"
                                    isLoading={isSubmitting}
                                    className="px-8"
                                >
                                    Send Message
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Google Map */}
            <div className="w-full h-[300px] sm:h-[400px] rounded-lg overflow-hidden border border-[#E4E4E4] mt-4">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.5889891774986!2d151.18879!3d-33.9247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12b9da97e1a1e7%3A0x504f5b6d28c7e31!2sChurch%20Ave%2C%20Mascot%20NSW%202020%2C%20Australia!5e0!3m2!1sen!2sus!4v1701760883581!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Location Map"
                />
            </div>
        </Container>
    );
};

export default Contact;
