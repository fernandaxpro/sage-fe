interface IProfile {
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
    profile_picture?: string;
    password?: string;
}

// Profile.d.ts
interface IAddressPayload {
    person: string;
    company: string;
    address: string;
    address2?: string;
    country_id: string | number;
    city_id: string | number;
    state_id: string | number;
    suburb: string;
    post_code: string;
}

interface IShippingAddress {
    shipping_addresses: IAddressPayload[];
}

interface IBillingAddress {
    billing_addresses: IAddressPayload[];
}

export type { IProfile, IBillingAddress, IShippingAddress, IAddressPayload };