import HomepageLayout from "@/components/layouts/HomepageLayout"
import Cart from "@/components/views/Cart"

const index = () => {
  return (
    <HomepageLayout title="Cart">
        <Cart />
    </HomepageLayout>
  )
}

export default index