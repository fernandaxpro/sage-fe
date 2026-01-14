import HomepageLayout from "@/components/layouts/HomepageLayout";
import Wishlist from "@/components/views/User/Wishlist";

const WishlistPage = () => {
    return (
        <HomepageLayout title="My Wishlist">
            <Wishlist />
        </HomepageLayout>
    );
};

export default WishlistPage;
