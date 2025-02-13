'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import { Skeleton } from '@mantine/core';
import Profile from '../_components/Proile';

const ProfilePage = () => {
  const { isSignedIn, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      redirect('/sign-in');
    }
  }, [isLoaded, isSignedIn]);

  if (!isLoaded) {
    return (
      <div className="max-w-2xl mx-auto p-8">
        <h2 className="text-2xl font-bold mb-6">
          <Skeleton height={32} width="100%" /> {/* Increased width */}
        </h2>
        <div className="space-y-5">
          <Skeleton height={24} width="40%" /> {/* Increased width */}
          <Skeleton height={48} width="100%" /> {/* Increased width */}
          <Skeleton height={24} width="40%" /> {/* Increased width */}
          <Skeleton height={48} width="100%" /> {/* Increased width */}
          <Skeleton height={24} width="40%" /> {/* Increased width */}
          <Skeleton height={48} width="100%" /> {/* Increased width */}
          <Skeleton height={56} width="100%" /> {/* Increased button width */}
        </div>
      </div>
    );
  }

  return (
    <div>
      {isSignedIn && <Profile />}
    </div>
  );
};

export default ProfilePage;
