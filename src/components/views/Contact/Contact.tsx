"use client";

import { Input, Textarea, Button, Divider } from "@heroui/react";
import Container from "@/components/ui/Container";
import AppBreadcrumbs from "@/components/ui/AppBreadcrumbs";
import { ContactBreadcrumbs } from "./Contact.constant";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";

// Contact info data
// const contactInfo = [
//     {
//         icon: <LuPhone className="w-5 h-5" />,
//         title: "Contact",
//         value: "1300 843 883",
//     },
//     {
//         icon: <LuMail className="w-5 h-5" />,
//         title: "Email",
//         value: "admin@alarmexpert.com.au",
//     },
//     {
//         icon: <LuMapPin className="w-5 h-5" />,
//         title: "Location",
//         value: "Church Avenue, Mascot, NSW, 2020",
//     },
//     {
//         icon: <LuClock className="w-5 h-5" />,
//         title: "Hours of Operation",
//         value: "Monday - Sunday, 9AM - 10PM",
//     },
// ];

const Contact = () => {

    return (
        <Container className="flex-col gap-6 lg:gap-8 px-4 sm:px-6 lg:px-8 py-6">
            <AppBreadcrumbs items={ContactBreadcrumbs} />

            <div className="flex flex-col gap-4 lg:flex-row lg:gap-6">
                <div className="flex-1 lg:basis-[30%] flex flex-col gap-4">
                    <div className="flex flex-col gap-3">
                        <h1 className="text-primary font-semibold text-5xl">
                            How can we help you?
                        </h1>
                        <p className="text-muted font-medium text-base">We are at your disposal 7 days a week!</p>
                    </div>

                    <Divider className="bg-bordered" />

                    <div className="flex flex-col gap-4">
                        <h1 className="text-primary font-semibold text-xl">
                            {"0020 500 - SAGE GAMING - 000"}
                        </h1>
                        <div className="flex flex-col gap-2">
                            <p className="text-muted font-medium text-base">{"Monday - Friday: 9:00-20:00"}</p>
                            <p className="text-muted font-medium text-base">{"Saturday: 11:00 - 15:00"}</p>
                        </div>

                        <Button
                            radius="full"
                            className="border border-bordered !bg-transparent text-primary text-base font-bold hover:!bg-success hover:text-secondary"
                        >
                            contact@example.com
                        </Button>
                    </div>

                    <Divider className="bg-bordered" />

                    <div className="flex items-center gap-3">
                        <button
                            className="w-10 h-10 flex items-center justify-center bg-[#1877F2] text-white rounded hover:opacity-90 transition-opacity"
                            aria-label="Share on Facebook"
                        >
                            <FaFacebookF size={18} />
                        </button>
                        <button
                            className="w-10 h-10 flex items-center justify-center bg-black text-white rounded hover:opacity-90 transition-opacity"
                            aria-label="Share on X"
                        >
                            <FaXTwitter size={18} />
                        </button>

                        <button
                            className="w-10 h-10 flex items-center justify-center bg-danger text-white rounded hover:opacity-90 transition-opacity"
                            aria-label="Share on Instagram"
                        >
                            <FaInstagram size={18} />
                        </button>
                    </div>
                </div>

                <div className="flex-1 lg:basis-[70%]">
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
            </div>

            <div className="flex flex-col gap-6">
                <h1 className="text-primary font-bold text-3xl">Fill up the form if you have any question</h1>
                <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Input
                            type="text"
                            placeholder="Name and surname"
                            radius="full"
                        />
                        <Input
                            type="email"
                            placeholder="Your E-mail"
                            radius="full"
                        />
                        <Input
                            type="number"
                            placeholder="Phone"
                            radius="full"
                        />
                    </div>

                    <Textarea
                        className="flex-1"
                        placeholder="Message"
                        radius="full"
                    />

                    <div>
                        <Button
                            radius="full"
                            className="hover:border hover:border-success bg-success text-secondary text-base font-bold hover:bg-transparent hover:text-success"
                        >
                            Send Message
                        </Button>
                    </div>
                </div>
            </div>

            <Divider className="bg-bordered mb-10" />
        </Container>
    );
};

export default Contact;
