import { ReactNode } from 'react';

import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from '@/application/store';
import { setGroup } from '@/application/state-slices';
import { useQueryClient } from '@tanstack/react-query';
import { UseUserServiceGetApiUserGetUsersKeyFn, useContactFormServiceGetApiContactFormGetContactFormsKey, useGroupServiceGetApiGroupGetGroupKey, useGroupServiceGetApiGroupGetGroupsKey, usePrivateConversationServiceGetApiPrivateConversationGetPrivateConversationKey, usePrivateConversationServiceGetApiPrivateConversationGetPrivateConversationsKey, useTopicServiceGetApiTopicGetMyTopicsKey, useTopicServiceGetApiTopicGetRecentTopicsKey, useTopicServiceGetApiTopicGetTopicsKey, useUserServiceGetApiUserGetMeKey, useUserServiceGetApiUserGetUsersKey } from '../../../openapi/queries/common';

const NavigationItem = (props: { children: ReactNode, id: string | undefined }) => {
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();
    const { selectedGroupId } = useAppSelector(x => x.selectedReducer);
    return (
    <button onClick={() => {props.id !== undefined ? dispatch(setGroup(props.id)) : null;
      if (props.id !== "0" && props.id === selectedGroupId) {
      queryClient.invalidateQueries({queryKey: [useGroupServiceGetApiGroupGetGroupKey]});
      queryClient.invalidateQueries({queryKey: [useTopicServiceGetApiTopicGetTopicsKey]});
      queryClient.invalidateQueries({queryKey: [useTopicServiceGetApiTopicGetMyTopicsKey]});
      queryClient.invalidateQueries({queryKey: [useTopicServiceGetApiTopicGetRecentTopicsKey]});
      }
      if (props.id === "0") {
        queryClient.invalidateQueries({queryKey: [useGroupServiceGetApiGroupGetGroupsKey]});
        queryClient.invalidateQueries({queryKey: [useUserServiceGetApiUserGetMeKey]});
        queryClient.invalidateQueries({queryKey: [useContactFormServiceGetApiContactFormGetContactFormsKey]});
        queryClient.invalidateQueries({queryKey: [useUserServiceGetApiUserGetUsersKey]});
        queryClient.invalidateQueries({queryKey: [usePrivateConversationServiceGetApiPrivateConversationGetPrivateConversationsKey]});
        }
    }} className="group flex items-center relative">
        <div className={cn(
          "absolute -left-2 bg-white rounded-r-full transition-all w-[4px] z-40",
          selectedGroupId !== props.id && "group-hover:h-[20px]",
          selectedGroupId === props.id ? "h-[36px]" : "h-[0px]"
        )} />
        <div className={cn(
          "group flex h-11 w-11 rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
          selectedGroupId === props.id && "bg-white/10 text-primary rounded-[16px]"
        )}>
        {props.children}
        </div>
    </button> );
}
 
export default NavigationItem;