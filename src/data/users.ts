import { User } from "@/types";

export const dummyUser: User = {
    id: "u1",
    name: "Alexandra Leo",
    email: "alexandra.leo@example.com",
    avatar: "/images/avatar-1.png",
    addresses: [
        {
            id: "a1",
            label: "Home",
            isDefault: true,
            recipientName: "Alexandra Leo",
            phoneNumber: "+618337280018",
            addressLine1: "128 Riverbend Road, Apartement 14B",
            city: "Brisbane",
            state: "QLD",
            postcode: "4101",
            country: "Australia"
        },
        {
            id: "a2",
            label: "Work",
            isDefault: false,
            recipientName: "Alexandra Leo",
            phoneNumber: "+618337280018",
            addressLine1: "22 Harbourview Tower, Level 9",
            city: "Sydney",
            state: "NSW",
            postcode: "2000",
            country: "Australia"
        }
    ],
    orders: [
        {
            id: "ORD-89274927",
            date: "November 11, 2025",
            status: "Delivered",
            items: [
                {
                    name: "Hikvision Wireless Outdoor Sounder DS-PS1-E-WB",
                    image: "/images/products/Hikvision Wireless Outdoor Sounder DS-PS1-E-WB.png",
                    qty: 1,
                    price: 79.00
                }
            ],
            total: 79.00
        },
        {
            id: "ORD-88274927",
            date: "November 25, 2025",
            status: "In Process",
            items: [
                {
                    name: "Shelly BUTTON 1 - Black SH-SHELLYBUTB",
                    image: "/images/products/Shelly BUTTON 1 - Black SH-SHELLYBUTB.png",
                    qty: 1,
                    price: 45.27 // Estimated
                }
            ],
            total: 79.00
        },
        {
            id: "ORD-89274925",
            date: "November 11, 2025",
            status: "Cancelled",
            items: [
                {
                    name: "Hikvision Wireless Outdoor Sounder DS-PS1-E-WB",
                    image: "/images/products/Hikvision Wireless Outdoor Sounder DS-PS1-E-WB.png",
                    qty: 1,
                    price: 79.00
                }
            ],
            total: 79.00
        }
    ],
    reviews: [
        {
            id: "r1",
            productId: 3,
            productName: "Shelly BUTTON 1 - Black SH-SHELLYBUTB",
            productImage: "/images/products/Shelly BUTTON 1 - Black SH-SHELLYBUTB.png",
            price: 45.27,
            text: "Works perfectly with my Shelly setup. The response time is super fast, and the rechargeable battery lasts way longer than expected. Totally worth it!",
            rating: 5,
            date: "May 20, 2025",
            user: {
                name: "Alexandra Leo",
                avatar: "/images/avatar-1.png"
            }
        },
        {
            id: "r2",
            productId: 4,
            productName: "HiLook 4 MP Network IR Turret Camera 2.8mm IPC-T240H",
            productImage: "/images/products/HiLook 4 MP Network IR Turret Camera 2.8mm.png",
            price: 70.49,
            text: "It works fine, but sometimes the response time feels a bit slower on battery mode. Still decent for basic automation.",
            rating: 3,
            date: "May 11, 2025",
            user: {
                name: "A****** L**",
                avatar: "/images/avatar-1.png"
            }
        }
    ]
};
