import userService from "@/services/user.service";
import * as yup from "yup";
import { useAppDispatch } from "@/store/hooks/hooks";
import {
  setProfileData,
  setProfileError,
  setProfileLoading,
} from "@/store/slices/profileSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { IProfile } from "@/types/Profile";
import { ToasterContext } from "@/contexts/ToasterContext";

const profileSchema = yup.object().shape({
  first_name: yup.string().required("Please input your first name"),
  last_name: yup.string().required("Please input your last name"),
  email: yup.string().required("Please input your email address"),
  phone: yup.string().required("Please input your phone number"),
  profile_picture: yup.string().required("Please input your profile picture"),
});

const useProfile = () => {
  const { data } = useSession();
  const user: any = data?.user || null;
  const dispatch = useAppDispatch();
  const { setToaster } = useContext(ToasterContext);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // GET PROFILE =============
  const getProfileById = async () => {
    const { data } = await userService.getProfileById(user?.id);
    return data?.data;
  };

  const {
    data: profileData,
    isLoading: isLoadingProfile,
    error,
    refetch: refetchProfile,
  } = useQuery({
    queryKey: ["profile-data"],
    queryFn: getProfileById,
    enabled: !!user?.id,
  });

  useEffect(() => {
    dispatch(setProfileLoading(isLoadingProfile));
  }, [isLoadingProfile, dispatch]);

  useEffect(() => {
    if (profileData) {
      dispatch(setProfileData(profileData));
    }
  }, [profileData, dispatch]);

  useEffect(() => {
    if (error) {
      dispatch(setProfileError(error.message || "Failed to fetch home data"));
    }
  }, [error, dispatch]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
    watch,
  } = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      profile_picture: "",
    },
  });

  useEffect(() => {
    if (!profileData) return;

    reset({
      first_name: profileData.first_name ?? "",
      last_name: profileData.last_name ?? "",
      email: profileData.email ?? "",
      phone: profileData.phone ?? "",
      profile_picture: profileData.profile_picture ?? "",
    });
  }, [profileData, reset]);

  // UPLOAD PROFILE PICTURE =============
  const uploadProfilePicture = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file, file.name);
    formData.append("path_name", "profile");

    const { data } = await userService.uploadProfilePicture(formData);
    return data?.data?.public_url;
  };

  const { mutateAsync: mutateUploadPicture, isPending: isUploadingPicture } =
    useMutation({
      mutationFn: uploadProfilePicture,
      onSuccess: (publicUrl) => {
        setValue("profile_picture", publicUrl);
        setToaster({
          type: "success",
          message: "Profile picture uploaded successfully",
        });
      },
      onError: () => {
        setToaster({
          type: "error",
          message: "Failed to upload profile picture",
        });
      },
    });

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // Validasi tipe file
    const validImageTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    if (!validImageTypes.includes(file.type)) {
      setToaster({
        type: "error",
        message: "Please upload a valid image file (JPEG, PNG, GIF, or WebP)",
      });
      return;
    }

    // Validasi ukuran file (misal max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setToaster({
        type: "error",
        message: "File size must be less than 5MB",
      });
      return;
    }

    await mutateUploadPicture(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // UPDATE PROFILE =============
  const updateProfileById = async (payload: IProfile) => {
    const transformedPayload = {
      first_name: payload.first_name,
      last_name: payload.last_name,
      email: payload.email,
      phone: payload.phone,
      profile_picture: payload.profile_picture,
    };

    const { data } = await userService.updateProfileById(
      transformedPayload,
      user?.id
    );
    return data?.data;
  };

  const {
    mutateAsync: mutateUpdateProfile,
    isPending: isLoadingUpdateProfile,
  } = useMutation({
    mutationFn: updateProfileById,
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Update profile success",
      });
      refetchProfile();
      // reset();
    },
    onError: () => {
      setToaster({
        type: "error",
        message: "Update profile failed",
      });
    },
  });

  const handleUpdateProfile = (data: IProfile) => mutateUpdateProfile(data);

  return {
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
  };
};

export default useProfile;
