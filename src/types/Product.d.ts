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

interface ISelectOption {
  value: number;
  label: string;
}

export type { ICategory, ISelectOption }