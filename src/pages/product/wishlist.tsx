import HomepageLayout from "@/components/layouts/HomepageLayout";
import Wishlist from "@/components/views/Wishlist";

const WishlistPage = () => {
    return (
        <HomepageLayout title="My Wishlist">
            <Wishlist />
        </HomepageLayout>
    );
};

export default WishlistPage;
