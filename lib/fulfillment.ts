export type FulfillmentVendor = "tapstitch-pod" | "bulk-inventory";

export type CatalogProduct = {
  title: string;
  handle: string;
  vendor: "Tapstitch" | "Loyalty Lane Bulk";
  fulfillmentVendor: FulfillmentVendor;
  productType: string;
  tags: string[];
  description: string;
  price: string;
  costPerUnit: string;
  options: Array<{ name: string; values: string[] }>;
};

export const catalogProducts: CatalogProduct[] = [
  {
    title: "1991 Block Frequency Jersey",
    handle: "1991-block-frequency-jersey",
    vendor: "Loyalty Lane Bulk",
    fulfillmentVendor: "bulk-inventory",
    productType: "1990s Catalogue Series",
    tags: ["1990s-catalogue", "heritage-drop", "jersey", "limited-drop"],
    description: "Collectible 1991 Heritage Jersey with QR code story and limited packaging.",
    price: "59.99",
    costPerUnit: "18.50",
    options: [{ name: "Size", values: ["S", "M", "L", "XL", "2XL"] }],
  },
  {
    title: "Loyalty Core Stretch Underwear 3-Pack",
    handle: "loyalty-core-stretch-underwear",
    vendor: "Loyalty Lane Bulk",
    fulfillmentVendor: "bulk-inventory",
    productType: "Core Essentials",
    tags: ["core-essentials", "underwear", "basics"],
    description: "Premium stretch fabric engineered for all-day breathability and comfort.",
    price: "18.00",
    costPerUnit: "3.80",
    options: [{ name: "Size", values: ["S", "M", "L", "XL"] }],
  },
  {
    title: "Loyalty Gold Heavy Rope Chain & Pendant",
    handle: "loyalty-gold-rope-chain",
    vendor: "Loyalty Lane Bulk",
    fulfillmentVendor: "bulk-inventory",
    productType: "Jewelry",
    tags: ["gold-line", "bling-collection", "jewelry", "chains"],
    description: "14K gold plated brass chain with cubic zirconia accents.",
    price: "29.99",
    costPerUnit: "6.00",
    options: [{ name: "Style", values: ["24 Inch Cuban", "26 Inch Rope"] }],
  },
  {
    title: "Kotton's Code Oversized Fleeced Hoodie",
    handle: "kottons-code-oversized-fleeced-hoodie",
    vendor: "Tapstitch",
    fulfillmentVendor: "tapstitch-pod",
    productType: "Outerwear",
    tags: ["kottons-code", "youth-streetwear", "tapstitch-pod", "hoodie"],
    description: "350 GSM heavyweight fleeced hoodie featuring positive youth streetwear graphics.",
    price: "85.00",
    costPerUnit: "14.92",
    options: [
      { name: "Color", values: ["Black", "Purple", "Cream"] },
      { name: "Size", values: ["S", "M", "L", "XL", "2XL"] },
    ],
  },
  {
    title: "Snow Washed Heavyweight Graphic Tee",
    handle: "snow-washed-heavyweight-graphic-tee",
    vendor: "Tapstitch",
    fulfillmentVendor: "tapstitch-pod",
    productType: "Tops",
    tags: ["kottons-code", "tapstitch-pod", "tees"],
    description: "250 GSM cotton vintage snow-washed oversized tee with custom neck-label concept.",
    price: "45.00",
    costPerUnit: "9.99",
    options: [
      { name: "Color", values: ["Washed Black", "Burgundy", "Cream"] },
      { name: "Size", values: ["S", "M", "L", "XL", "2XL"] },
    ],
  },
  {
    title: "That's My Lingo Casino Lounge Sweatshirt",
    handle: "thats-my-lingo-casino-lounge-sweatshirt",
    vendor: "Tapstitch",
    fulfillmentVendor: "tapstitch-pod",
    productType: "Loungewear",
    tags: ["thats-my-lingo", "tapstitch-pod", "loungewear"],
    description: "380 GSM lapel collar sweatshirt tailored for entertainment-only casino energy.",
    price: "65.00",
    costPerUnit: "19.99",
    options: [
      { name: "Color", values: ["Black/Gold", "Burgundy/Cream"] },
      { name: "Size", values: ["S", "M", "L", "XL"] },
    ],
  },
];

export function getFulfillmentVendor(vendor: string): FulfillmentVendor {
  return vendor.toLowerCase() === "tapstitch" ? "tapstitch-pod" : "bulk-inventory";
}
