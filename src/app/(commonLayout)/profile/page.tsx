import { ProfileComponent } from "@/components/modules/User/ProfileComponent";
import { getMe } from "@/services/user/userprofile";
import { getMyProfile } from "@/services/user/getMyProfile";
import React from "react";

const Profile = async () => {
  const Me = await getMe();
  const profile = await getMyProfile(Me.result._id);
  console.log(profile);
  return (
    <div className="  min-h-svh w-full  p-6 md:p-10">
      <h1 className="text-2xl text-center font-bold mb-6">My profile</h1>
      <ProfileComponent data={profile.result} />
    </div>
  );
};

export default Profile;
