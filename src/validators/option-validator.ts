// bg-blue-950 border-blue-950
// bg-zinc-900 border-zinc-900
// bg-rose-950 border-rose-950
// bg-red-400 border-red-400
// bg-gray-400 border-gray-400

import { PRODUCT_PRICES } from "@/config/products";

// Đây là cách định nghĩa một hằng số trong TypeScript và xuất nó ra bên ngoài module để có thể sử dụng ở nơi khác
export const COLORS = [
  // label: Một nhãn đặt tên cho màu, trong tường hợp này là black
  // value: Giá trị môt tả màu, trong trường hợp này là Black (đen)
  // tw: Giá trị tham chiếu tới hệ thống chỉ mục màu sắc được định nghĩa bằng tailwin css, trong trường hợp này là zinc-900
  { label: "Black", value: "black", tw: "zinc-900" },
  {
    label: "Blue",
    value: "blue",
    tw: "blue-950",
  },
  { label: "Rose", value: "rose", tw: "rose-950" },
  { label: "Red", value: "red", tw: "red-400" },
  { label: "Gray", value: "gray", tw: "gray-400" },
] as const; // as const: Dùng để khai báo mảng COLORS là một hằng số không thể thay đổi, giúp TypeScript hiểu rằng mảng này không được phép thay đổi sau khi được khai báo.

export const MODELS = {
  name: "models",
  options: [
    {
      label: "iPhone X",
      value: "iphonex",
    },
    {
      label: "iPhone 11",
      value: "iphone11",
    },
    {
      label: "iPhone 12",
      value: "iphone12",
    },
    {
      label: "iPhone 13",
      value: "iphone13",
    },
    {
      label: "iPhone 14",
      value: "iphone14",
    },
    {
      label: "iPhone 15",
      value: "iphone15",
    },
  ],
} as const;

export const MATERIALS = {
  name: "material",
  options: [
    {
      label: "Silicone",
      value: "silicone",
      description: undefined,
      price: PRODUCT_PRICES.material.silicon,
    },
    {
      label: "Soft Polycarbonate",
      value: "polycarbonate",
      description: undefined,
      price: PRODUCT_PRICES.material.polycarbonate,
    },
  ],
} as const;

export const FINISHES = {
  name: "finish",
  options: [
    {
      label: "Smooth Finish",
      value: "smooth",
      description: undefined,
      price: PRODUCT_PRICES.finish.smooth,
    },
    {
      label: "Textured Finish",
      value: "textutred",
      description: "Soft grippy textture",
      price: PRODUCT_PRICES.finish.textured,
    },
  ],
} as const;
