import HomepageLayout from "@/components/layouts/HomepageLayout";
import OrderTracking from "@/components/views/User/OrderTracking";

const OrderTrackingPage = () => {
    return (
        <HomepageLayout title="Order Tracking">
            <OrderTracking />
        </HomepageLayout>
    );
};

export default OrderTrackingPage;
