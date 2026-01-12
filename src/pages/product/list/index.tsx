import HomepageLayout from "@/components/layouts/HomepageLayout"
import ProductList from "@/components/views/Products"

const ProductPage = () => {
    return (
        <HomepageLayout title="Products">
            <ProductList />
        </HomepageLayout>
    )
}

export default ProductPage