"use client"
import React from 'react';
import AvatarProfile from '@/components/social_mode/avatar-profile';
import SuggestFriend from '@/components/social_mode/suggest-friend';
import StorySession from '@/components/social_mode/story-session';
import PostSession from '@/components/social_mode/post-session';

const Page = () => {
  return (
    <>
      {/* Main Content */}
      <main className="flex-1 ml-64 mr-80" >
        <div className="max-w-[800px] mx-auto py-8 px-4">
          {/* Stories Section */}
          <StorySession />

          {/* Posts Section */}
          <PostSession />
        </div>
      </main >

      {/* Right Sidebar - Suggestions */}
      <aside style={{ position: 'fixed', right: 0, top: 0, height: '100vh', width: '320px', background: '#121212', borderLeft: '1px solid #262626', padding: '24px' }}>
        {/* User Profile */}
        < AvatarProfile />

        {/* Suggestions */}
        < SuggestFriend />
      </aside >
    </>
  );
}



export default Page;