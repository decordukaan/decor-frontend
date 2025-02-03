'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import Profile from '../_components/Proile';

const ProfilePage = () => {
  const { isSignedIn, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      redirect('/sign-in');
    }
  }, [isLoaded, isSignedIn]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isSignedIn && <Profile />}
    </div>
  );
};

export default ProfilePage;