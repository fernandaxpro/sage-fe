interface ICategory {
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
  children: ICategory[];
}

interface IBrand {
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

interface IAttributeSet {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

interface IAttribute {
  id: number;
  attribute_set_id: number;
  name: string;
  filterable: boolean;
  values: string[];
  created_at: string;
  updated_at: string;
  attribute_set: IAttributeSet;
}



interface ISelectOption {
  value: number | strng;
  label: string;
}

export type { ICategory, ISelectOption, IBrand, IAttribute }