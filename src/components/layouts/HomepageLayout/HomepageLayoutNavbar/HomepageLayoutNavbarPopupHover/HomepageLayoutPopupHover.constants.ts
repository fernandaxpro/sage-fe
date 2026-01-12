import { ReactNode } from "react";

export interface SubItem {
  label: string;
  href: string;
  icon?: ReactNode;
}

export interface BrandItem {
  name: string;
  items: SubItem[];
}

interface PopupContent {
  brands?: BrandItem[];
}

type PopupContentMap = {
  [key: string]: PopupContent;
};

const createItems = (items: string[]): SubItem[] => {
  return items.map((label) => ({
    label,
    href: "#",
    icon: null,
  }));
};

const POPUP_CONTENT: PopupContentMap = {
  "Products": {
    brands: [
      {
        name: "Gaming",
        items: createItems(["PS 4", "Nintendo Switch 2"]),
      },
      {
        name: "Laptop",
        items: createItems(["Acer"]),
      },
      {
        name: "Monitor",
        items: []
      }
    ],
  },
  "Test": {
    brands: [
      {
        name: "BOSCH 3000/2000 SOLUTIONS",
        items: createItems([
          "Bosch 2000 kits",
          "Bosch 3000 kits",
          "Battery & power supply",
          "Communicator",
          "Enclosure",
          "Detectors",
          "Expanders",
          "Keypads",
          "Receiver",
          "Remote controls",
          "Sirens and screamers",
          "Software & programming",
          "Panel & modules 2000/3000",
        ]),
      },
      {
        name: "BOSCH 6000 SOLUTIONS",
        items: createItems([
          "Bosch kits",
          "Battery & power supply",
          "Communicator",
          "Detectors",
          "Enclosure",
          "Expanders",
          "Keypads",
          "Panel & modules",
          "Readers & cards",
          "Receiver",
          "Remote controls",
          "Software & programming",
          "Sirens and screamers",
        ]),
      },
      {
        name: "U-PROX WIRELESS",
        items: createItems([
          "U-Prox kits",
          "Control panel",
          "Sirens",
          "Keypads",
          "Detectors",
          "Keyfobs",
          "Repeater",
          "Multiplexer",
          "Wireless",
          "Relay DC",
        ]),
      },
      {
        name: "TAKEX",
        items: createItems([
          "PIR beam",
          "PIR sensors",
          "Glass break sensors",
          "Door sensors",
        ]),
      },
      {
        name: "HIKVISION AX PRO - WIRELESS",
        items: createItems([
          "AX pro kits",
          "Control panel",
          "Detectors",
          "Keypads",
          "Reed switch",
          "Remote control",
          "Relay module",
          "Siren or sounder",
          "Readers",
          "Emergency button",
          "Repeater",
          "Transmitter",
        ]),
      },
      {
        name: "HIKVISION AX HYBRID PRO - WIRED",
        items: createItems([
          "AX hybrid pro kits",
          "Control panel",
          "Detectors",
          "Keypads",
          "GSM",
          "Expanders",
          "Battery and power supply",
          "Receiver",
          "Sounders",
          "Emergency button",
          "Relay",
          "Remote / Keyfob",
        ]),
      },
      {
        name: "HILOOK AX HYBRID PRO",
        items: createItems([
          "AX hybrid pro kits",
          "Control panel",
          "Detectors",
          "Siren",
          "Keypad",
          "Keyfob",
          "Battery & power supply",
        ]),
      },
      {
        name: "INSTALLATION",
        items: [],
      },
      {
        name: "GENERAL",
        items: [],
      },
    ],
  },
};

export { POPUP_CONTENT };
