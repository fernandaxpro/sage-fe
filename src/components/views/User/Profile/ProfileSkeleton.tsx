import { Skeleton } from "@heroui/react";
import Container from "@/components/ui/Container";
import UserSidebar from "@/components/views/User/UserSidebar/UserSidebar";

const ProfileSkeleton = () => {
  return (
    <Container className="flex-col md:flex-row gap-8 py-8 px-4 sm:px-6 lg:px-8">
      {/* Sidebar */}
      <UserSidebar activeItem="My Profile" />

      {/* Main Content */}
      <div className="flex-1">
        {/* Title Skeleton */}
        <Skeleton className="h-8 w-40 rounded-lg mb-6" />

        {/* Profile Header Skeleton */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            {/* Avatar Skeleton */}
            <Skeleton className="w-16 h-16 sm:w-20 sm:h-20 rounded-full" />
            
            <div className="space-y-2">
              {/* Name Skeleton */}
              <Skeleton className="h-6 w-32 rounded-lg" />
              {/* Email Skeleton */}
              <Skeleton className="h-4 w-48 rounded-lg" />
            </div>
          </div>
          
          {/* Change Password Button Skeleton */}
          <Skeleton className="h-10 w-40 rounded-full" />
        </div>

        {/* Form Fields Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
          {/* First Name */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-24 rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>

          {/* Last Name */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-24 rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-16 rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-16 rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
        </div>

        {/* Save Button Skeleton */}
        <div className="flex justify-end mt-8">
          <Skeleton className="h-10 w-36 rounded-full" />
        </div>
      </div>
    </Container>
  );
};

export default ProfileSkeleton;