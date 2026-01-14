/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, Tab, Tabs } from "@heroui/react";
import { useState } from "react";
import { FaStar } from "react-icons/fa";

interface PropTypes {
  data: any;
}

const dummy = {
  id: 1,
  title: "Shelly BUTTON 1 - Black SH-SHELLYBUTB",
  subtitle:
    "Smart button for instant, easy, and seamless home automation control across devices",
  images: [
    "/images/products/Shelly BUTTON 1 - Black SH-SHELLYBUTB.png",
    "/images/products/Shelly BUTTON 1 - Black SH-SHELLYBUTB.png",
    "/images/products/Shelly BUTTON 1 - Black SH-SHELLYBUTB.png",
    "/images/products/Shelly BUTTON 1 - Black SH-SHELLYBUTB.png",
  ],
  price: 45.27,
  rating: 5,
  reviewCount: 20,
  bestFeatures: [
    "Super-Fast & Smart Performance",
    "Rechargeable & Long-Lasting Power",
    "Universal Compatibility & Easy Integration",
  ],
  stockAvailability: [
    { location: "Online", status: "In Stock", available: true },
    { location: "NSW", status: "3 days", available: false },
    { location: "SA", status: "In Stock", available: true },
    { location: "Apple Bridge", status: "Sold Out", available: false },
  ],
  description: `Shelly BUTTON 1 – Black (SH-SHELLYBUTB) is a versatile smart button that lets you control your smart devices in home automation system instantly with just one touch. Compact in size – 47mmx47x12mm, making it perfect for any spaces.

Features:
• No hub required.
• Long-lasting battery providing for more than 1,000 actions per charge.
• Supports a mix of four, two and one button, and DI-mode – 500 power.
• A distinctive color ensures distinction for all structures.
• Can be mounted to walls or any other flat surfaces.
• Compatible with Android, iOS, Amazon Alexa, Google Assistant, and home automation servers using REST, CoAP, MQTT, or REST API.
• Easily make your home productive and enable digital actions for projects.`,
  specifications: {
    power: [
      { label: "Battery Life", value: "1000 actions per charge" },
      { label: "Power supply, AC", value: "No" },
      { label: "Power supply, DC", value: "Micro USB – 5V" },
    ],
    specialFunctions: [
      {
        label: "Compliance control",
        value:
          "Activate or deactivate a remote automation modes. Shelly devices",
      },
      { label: "Overload protection", value: "Yes" },
      { label: "Power measurement", value: "Yes" },
      { label: "Dimming", value: "Yes" },
    ],
    features: [
      { label: "Operating temperature", value: "-10°C to 40°C" },
      { label: "Local and remote control", value: "Yes" },
      { label: "Button/Switch", value: "Yes" },
      { label: "Weekly Schedule", value: "Yes" },
      { label: "UL Description", value: "Yes" },
    ],
    connectivity: [
      { label: "Wireless/WiFi Protocol", value: "802.11 b/g/n" },
      { label: "Radio frequency", value: "2400 – 2484 MHz" },
      { label: "Radio signal power", value: "1mW" },
      {
        label: "Range",
        value:
          "up to 50 m outdoors and up to 30 m indoors (depending on the building materials)",
      },
    ],
  },
  reviews: [
    {
      id: 1,
      name: "Daniel R.",
      date: "May 20, 2025",
      rating: 5,
      comment:
        "Works perfectly with my Shelly setup. The response time is super fast, and the single press-back for a very longer than expected. 10/10, worth it!",
      avatar: "/images/avatar-1.png",
    },
    {
      id: 2,
      name: "Kevin T.",
      date: "May 20, 2025",
      rating: 5,
      comment:
        "I love how small this = this thing of looks good on my desk. Impressive build time and smart control buttons!",
      avatar: "/images/avatar-2.png",
    },
    {
      id: 3,
      name: "Maria L.",
      date: "May 20, 2025",
      rating: 4,
      comment:
        "I use these and like – the signal is not always right in my living room but in a range – works great. Will reorder!",
      avatar: "/images/avatar-3.png",
    },
    {
      id: 4,
      name: "Sophie A.",
      date: "May 30, 2025",
      rating: 5,
      comment:
        "A really fast, my parents for the response time to be a bit slower but they really trust SH Button - its nice customization",
      avatar: "/images/avatar-4.png",
    },
  ],
};

const TabsProductDetail = (props: PropTypes) => {
  const { data } = props;
  const [selectedTab, setSelectedTab] = useState("description");
  return (
    <Tabs
      selectedKey={selectedTab}
      onSelectionChange={(key) => setSelectedTab(key as string)}
      variant="underlined"
      classNames={{
        tabList:
          "gap-6 w-full relative rounded-none p-0 border-b border-[#E4E4E4]",
        cursor: "w-full bg-primary",
        tab: "max-w-fit px-0 h-12",
        tabContent: "group-data-[selected=true]:text-primary font-medium",
      }}
    >
      <Tab key="description" title="Description">
        <div className="py-4">
          <div className="text-sm text-gray-600 whitespace-pre-line">
            {data?.description}
          </div>
        </div>
      </Tab>

      <Tab key="addition-information" title="Addition Information">
        <div className="py-4">
          <table className="w-[40vw] border-2 border-primary">
            <tbody>
              <tr className="border-b-2 border-primary">
                <th className="bg-secondary text-primary font-semibold text-left p-3 w-[30%]">
                  Weight
                </th>
                <td className="bg-white text-primary p-3 w-[70%]">
                  {data?.weight} Kg
                </td>
              </tr>
              <tr>
                <th className="bg-secondary text-primary font-semibold text-left p-3 w-[30%]">
                  Dimensions
                </th>
                <td className="bg-white text-primary p-3 w-[70%]">
                  {data?.length} x {data?.width} x {data?.height}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Tab>

      <Tab key="specification" title="Specification">
        <div className="py-4 space-y-6">
          <div>
            <h4 className="font-semibold text-primary text-sm mb-3 uppercase">
              Power
            </h4>
            <div className="space-y-2">
              {dummy.specifications.power.map((spec, index) => (
                <div key={index} className="flex border-b border-gray-100 py-2">
                  <span className="text-sm text-gray-500 w-1/3">
                    {spec.label}
                  </span>
                  <span className="text-sm text-gray-700 flex-1">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-primary text-sm mb-3 uppercase">
              Special Functions
            </h4>
            <div className="space-y-2">
              {dummy.specifications.specialFunctions.map((spec, index) => (
                <div key={index} className="flex border-b border-gray-100 py-2">
                  <span className="text-sm text-gray-500 w-1/3">
                    {spec.label}
                  </span>
                  <span className="text-sm text-gray-700 flex-1">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Tab>

      <Tab key="reviews" title="Reviews">
        <div className="py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dummy.reviews.map((review) => (
              <div
                key={review.id}
                className="border border-[#E4E4E4] rounded-lg p-4"
              >
                <div className="flex items-start gap-3">
                  <Avatar
                    size="sm"
                    src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-sm text-primary">
                          {review.name}
                        </p>
                        <p className="text-xs text-gray-400">{review.date}</p>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <FaStar
                            key={i}
                            size={10}
                            fill={i < review.rating ? "#FFD700" : "#E5E7EB"}
                            className={
                              i < review.rating
                                ? "text-yellow-400"
                                : "text-gray-200"
                            }
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      {review.comment}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Tab>
    </Tabs>
  );
};

export default TabsProductDetail;
