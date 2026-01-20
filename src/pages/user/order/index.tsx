import HomepageLayout from "@/components/layouts/HomepageLayout";
import Order from "@/components/views/User/Order";

const MyOrderPage = () => {
    return (
        <HomepageLayout title="My Orders">
            <Order />
        </HomepageLayout>
    );
};

export default MyOrderPage;
