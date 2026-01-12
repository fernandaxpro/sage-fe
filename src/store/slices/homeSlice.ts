// src/store/slices/homeSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Types untuk home data
export interface Brand {
  id: number;
  name: string;
  discount_percent: string;
  status: boolean;
  meta_title: string | null;
  meta_description: string | null;
  url_logo: string | null;
  url_banner: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProductImage {
  id: number;
  product_id: number;
  url: string;
  alt_image: string;
  is_thumbnail: boolean;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: number;
  brand_id: number;
  category_id: number | null;
  tax_class_id: number | null;
  sales_account_id: number;
  purchase_account_id: number;
  type: string;
  name: string;
  slug: string;
  description: string | null;
  meta_title: string | null;
  meta_description: string | null;
  manual_url: string | null;
  warranty_month: number;
  status: boolean;
  available_on: string | null;
  sku: string;
  sku2: string | null;
  mpn: string | null;
  unit_of_measurement: string | null;
  best_seller: boolean;
  back_order: boolean;
  new_arrival: boolean;
  clearance: boolean;
  coming_soon: boolean;
  buy_price: string;
  recommended_retail_price: string;
  trade_price: string;
  silver_price: string;
  gold_price: string;
  platinum_price: string;
  diamond_price: string;
  price: number;
  additional_shipping_cost: string;
  weight: string;
  length: string;
  width: string;
  height: string;
  unit_of_weight: string | null;
  unit_of_length: string | null;
  product_replacement_status: boolean;
  product_replacement_id: number | null;
  video: string | null;
  created_by_id: number;
  created_at: string;
  modified_by_id: number;
  updated_at: string;
  brand: Brand | null;
  category: unknown | null;
  images: ProductImage[];
}

export interface Category {
  id: number;
  name: string;
  url_slug: string;
  show_in_search: boolean;
  show_in_page: boolean;
  status: boolean;
  url_logo: string | null;
  url_banner: string | null;
  meta_title: string | null;
  meta_description: string | null;
  page_description: string | null;
  order_parent: number | null;
  order_child: number | null;
  created_at: string;
  updated_at: string;
  children: Category[];
}

export interface Config {
  id: number;
  var: string;
  value: string;
  column_type: string;
  type: string;
  created_at: string;
  updated_at: string;
}

export interface HomeData {
  status: boolean;
  configs: Config[];
  categories: Category[];
  banners: unknown[];
  blogs: unknown[];
  hot_deals: unknown[];
  best_sellers: unknown[];
  new_arrivals: unknown[];
  brands: unknown[];
  featured_products: Product[];
  pages: unknown[];
}

interface HomeState {
//   data: HomeData | null;
  data: any;
  isLoading: boolean;
  error: string | null;
}

const initialState: HomeState = {
  data: null,
  isLoading: false,
  error: null,
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setHomeLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setHomeData: (state, action: PayloadAction<HomeData>) => {
      state.data = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setHomeError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearHomeData: (state) => {
      state.data = null;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
  setHomeLoading,
  setHomeData,
  setHomeError,
  clearHomeData,
} = homeSlice.actions;

export default homeSlice.reducer;