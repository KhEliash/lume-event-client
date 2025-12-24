import { ProfileComponent } from "@/components/modules/User/ProfileComponent";
import { getMe } from "@/services/user/userprofile";
import { getMyProfile } from "@/services/user/getMyProfile";
import React from "react";

const Profile = async () => {
  const Me = await getMe();
  const profile = await getMyProfile(Me.result._id);

  return (
    <div className="min-h-screen w-full px-4 md:px-10 py-14 md:py-24 space-y-8">
      <div className="border-b-4 border-emerald-950 pb-4">
        <h1 className="text-4xl font-black text-emerald-950 uppercase tracking-tighter">
          Identity Profile
        </h1>
        <p className="text-amber-600 font-bold text-xs uppercase tracking-widest mt-1">
          Manage your personal credentials and activity logs
        </p>
      </div>

      <ProfileComponent data={profile.result} />
    </div>
  );
};

export default Profile;
