import HomepageLayout from "@/components/layouts/HomepageLayout";
import ProductDetail from "@/components/views/ProductDetail";
import { useRouter } from "next/router";

const ProductDetailPage = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <HomepageLayout title="Product Detail">
            <ProductDetail id={id as string} />
        </HomepageLayout>
    );
};

export default ProductDetailPage;
