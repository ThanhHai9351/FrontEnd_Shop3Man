import ProfilePape from '@/app/(customer)/profile/profile-pape';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Profile',
    description: 'Profile',
}
const Page = () => {
    return (
        <ProfilePape />
    );
}

export default Page;
