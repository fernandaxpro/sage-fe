import { FaHeadset, FaRegCalendar, FaRegCreditCard, FaShield, FaTruck } from "react-icons/fa6"

const FEATURE_HIGHLIGHTS = [
  {
    title: "Technical Support Available",
    description: "Monday to Friday 6 AM to 10 PM",
    icon: <FaHeadset />,
  },
  {
    title: "Free Shipping",
    description: "Australia Wide Over $350",
    icon: <FaTruck />,
  },
  {
    title: "Pay in 4 with Paypal",
    description: "Minimum $30 up to $1500+",
    icon: <FaShield />,
  },
  {
    title: "Australia Wide Warranty",
    description: "1 to 3 years Warranty Available",
    icon: <FaRegCalendar />,
  },
  {
    title: "Accept Payment",
    description: "Visa, Paypal, Master",
    icon: <FaRegCreditCard />,
  },
]

export { FEATURE_HIGHLIGHTS }