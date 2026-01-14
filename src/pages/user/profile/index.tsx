import HomepageLayout from "@/components/layouts/HomepageLayout";
import Profile from "@/components/views/User/Profile";

const ProfilePage = () => {
    return (
        <HomepageLayout title="My Profile">
            <Profile />
        </HomepageLayout>
    );
};

export default ProfilePage;
