import { UpdateProfileForm } from "@/components/modules/User/UpdateProfileForm";
import { getMe } from "@/services/user/userprofile";
import { getMyProfile } from "@/services/user/getMyProfile";
import React from "react";

const ProfileUpdate = async () => {
  const Me = await getMe();
  const profile = await getMyProfile(Me.result._id);

  return (
    <div className="min-h-screen bg-white">
      <div className=" mx-auto py-14 md:py-24 px-4 md:px-10">
        <UpdateProfileForm user={profile.result.user} />
      </div>
    </div>
  );
};

export default ProfileUpdate;
