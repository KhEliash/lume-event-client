 

import { cookies } from 'next/headers';
import React from 'react';
import NavClient from './NavClient';

const Navbar =async () => {
    const accessToken = (await cookies()).get("accessToken")?.value || null;

  return (
    <NavClient isLoggedIn={!!accessToken} />
  );
};

export default Navbar;