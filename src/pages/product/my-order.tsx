import HomepageLayout from "@/components/layouts/HomepageLayout";
import MyOrder from "@/components/views/MyOrder";

const MyOrderPage = () => {
    return (
        <HomepageLayout title="My Orders">
            <MyOrder />
        </HomepageLayout>
    );
};

export default MyOrderPage;
