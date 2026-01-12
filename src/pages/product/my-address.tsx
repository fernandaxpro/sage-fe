import MyAddress from "@/components/views/MyAddress";
import Head from "next/head";

export default function MyAddressPage() {
    return (
        <>
            <Head>
                <title>My Addresses | Alarm Expert</title>
                <meta name="description" content="Manage your delivery addresses" />
            </Head>
            <MyAddress />
        </>
    );
}
