import { BreadcrumbItemType } from "@/components/ui/AppBreadcrumbs/AppBreadcrumbs";

const CheckoutBreadcrumbs: BreadcrumbItemType[] = [
    {
      label: 'Home',
      href: '/'
    },
    {
      label: 'My Orders',
      href: '/user/order'
    },
    {
      label: 'Checkout',
    },
]

export { CheckoutBreadcrumbs }