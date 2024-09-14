'use client';

import Loader from '@/components/Loader';
import { getClerkUsers, getDocumentUsers } from '@/lib/actions/user.actions';
import { useUser } from '@clerk/nextjs';
import { ClientSideSuspense, LiveblocksProvider } from '@liveblocks/react/suspense';
import { ReactNode } from 'react';

const Provider = ({ children }: { children: ReactNode }) => {
  const { user: clerkUser } = useUser();

  return (
    <LiveblocksProvider 
      authEndpoint="/api/liveblocks-auth"
      resolveUsers={async ({ userIds }) => {
        const users = await getClerkUsers({ userIds });
        return users;
      }}

      resolveMentionSuggestions={async ({ text, roomId }) => {
        // Handle optional chaining properly
        const emailAddress = clerkUser?.emailAddresses[0]?.emailAddress;
        if (!emailAddress) {
          // Handle the case where emailAddress is undefined
          throw new Error('No email address available for the current user');
        }

        const roomUsers = await getDocumentUsers({
          roomId,
          currentUser: emailAddress,
          text,
        });

        return roomUsers;
      }}
       
    >
      <ClientSideSuspense fallback={<Loader />}>
        {children}
      </ClientSideSuspense>
    </LiveblocksProvider>
  );
}

export default Provider;
