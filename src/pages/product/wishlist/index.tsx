import HomepageLayout from "@/components/layouts/HomepageLayout";
import Wishlist from "@/components/views/Wishlist";

const index = () => {
  return (
    <HomepageLayout title="Alarm Expert | Wishlist">
      <Wishlist />
    </HomepageLayout>
  );
};

export default index;
