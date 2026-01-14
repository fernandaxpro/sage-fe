"use client";

// import { useState } from "react";
import {
  Button,
  Input,
  // Select,
  // SelectItem,
  Avatar,
  Spinner,
  useDisclosure,
} from "@heroui/react";
import Container from "@/components/ui/Container";
import { FaPen } from "react-icons/fa";

import UserSidebar from "@/components/views/User/UserSidebar/UserSidebar";
import useProfile from "./useProfile";
import { Controller } from "react-hook-form";
import ProfileSkeleton from "./ProfileSkeleton";
import ModalChangePassword from "./ModalChangePassword";

const Profile = () => {
  const {
    profileData,
    isLoadingProfile,
    control,
    handleSubmit,
    errors,
    isLoadingUpdateProfile,
    handleUpdateProfile,
    fileInputRef,
    handleFileChange,
    triggerFileInput,
    isUploadingPicture,
    watch,
    refetchProfile
  } = useProfile();
  const { isOpen, onClose, onOpenChange } = useDisclosure();
  const currentProfilePicture = watch("profile_picture");

  if (isLoadingProfile || !profileData) {
    return <ProfileSkeleton />;
  }

  return (
    <>
      <Container className="flex-col md:flex-row gap-8 py-8 px-4 sm:px-6 lg:px-8">
        {/* Sidebar */}
        <UserSidebar activeItem="My Profile" />

        {/* Main Content */}
        <form onSubmit={handleSubmit(handleUpdateProfile)} className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h1>

          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar
                  src={currentProfilePicture || profileData?.profile_picture}
                  className="w-16 h-16 sm:w-20 sm:h-20 text-large"
                />
                <button
                  type="button"
                  onClick={triggerFileInput}
                  disabled={isUploadingPicture}
                  className="absolute bottom-0 right-0 bg-primary text-white p-1 rounded-full text-xs border-2 border-white hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaPen size={10} />
                </button>
                {/* Hidden File Input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  {profileData?.first_name ?? ""} {profileData?.last_name ?? ""}
                </h2>
                <p className="text-gray-500 text-sm">{profileData?.email}</p>
              </div>
            </div>
            <Button
              className="bg-[#0F2744] text-white px-6"
              radius="full"
              onPress={onOpenChange}
              startContent={<FaPen size={12} />}
            >
              Change Password
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
            <Controller
              name="first_name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="First Name"
                  labelPlacement="outside"
                  placeholder="Enter first name"
                  isRequired
                  isInvalid={errors.email !== undefined}
                  errorMessage={errors.email?.message}
                  classNames={{
                    inputWrapper: "border border-[#E4E4E4] bg-white",
                    label: "text-gray-700 font-medium",
                  }}
                />
              )}
            />

            <Controller
              name="last_name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Last Name"
                  labelPlacement="outside"
                  placeholder="Enter last name"
                  isRequired
                  isInvalid={errors.email !== undefined}
                  errorMessage={errors.email?.message}
                  classNames={{
                    inputWrapper: "border border-[#E4E4E4] bg-white",
                    label: "text-gray-700 font-medium",
                  }}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Email"
                  labelPlacement="outside"
                  placeholder="Enter email"
                  type="email"
                  isRequired
                  isInvalid={errors.email !== undefined}
                  errorMessage={errors.email?.message}
                  classNames={{
                    inputWrapper: "border border-[#E4E4E4] bg-white",
                    label: "text-gray-700 font-medium",
                  }}
                />
              )}
            />

            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Phone"
                  labelPlacement="outside"
                  placeholder="Enter phone number"
                  type="tel"
                  isRequired
                  isInvalid={errors.email !== undefined}
                  errorMessage={errors.email?.message}
                  classNames={{
                    inputWrapper: "border border-[#E4E4E4] bg-white",
                    label: "text-gray-700 font-medium",
                  }}
                />
              )}
            />
          </div>

          <div className="flex justify-end mt-8">
            <Button
              className="bg-[#E4E4E4] text-gray-600 font-medium px-8"
              radius="full"
              type="submit"
            >
              {isLoadingUpdateProfile ? (
                <Spinner color="white" size="sm" />
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </Container>
      <ModalChangePassword isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose} refetchProfile={refetchProfile} />
    </>
  );
};

export default Profile;
