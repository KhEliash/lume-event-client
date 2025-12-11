import { UpdateProfileForm } from '@/components/modules/User/UpdateProfileForm';
import { getMe } from '@/services/user/userprofile';
import { getMyProfile } from '@/services/user/getMyProfile';
import React from 'react';

const ProfileUpdatef = async () => {
  const Me = await getMe();
  const profile = await getMyProfile(Me.result._id);

  return (
    <UpdateProfileForm user={profile.result.user} />
  );
};
export default ProfileUpdatef;