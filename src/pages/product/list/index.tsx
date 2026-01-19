import HomepageLayout from "@/components/layouts/HomepageLayout"
import ProductList from "@/components/views/ProductList"

const ProductPage = () => {
    return (
        <HomepageLayout title="Product List">
            <ProductList />
        </HomepageLayout>
    )
}

export default ProductPage