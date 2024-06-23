// generated with @7nohe/openapi-react-query-codegen@1.4.1 

import { UseQueryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { ContactFormService, GroupService, LinkedInService, MessageService, PrivateConversationService, TopicService, UserService } from "../requests/services.gen";
import * as Common from "./common";
/**
* @param data The data for the request.
* @param data.search
* @param data.page
* @param data.pageSize
* @returns ContactFormDTOPagedResponseRequestResponse Success
* @throws ApiError
*/
export const useContactFormServiceGetApiContactFormGetContactFormsSuspense = <TData = Common.ContactFormServiceGetApiContactFormGetContactFormsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ page, pageSize, search }: {
  page?: number;
  pageSize?: number;
  search?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseContactFormServiceGetApiContactFormGetContactFormsKeyFn({ page, pageSize, search }, queryKey), queryFn: () => ContactFormService.getApiContactFormGetContactForms({ page, pageSize, search }) as TData, ...options });
/**
* @param data The data for the request.
* @param data.search
* @param data.page
* @param data.pageSize
* @returns GroupDTOPagedResponseRequestResponse Success
* @throws ApiError
*/
export const useGroupServiceGetApiGroupGetGroupsSuspense = <TData = Common.GroupServiceGetApiGroupGetGroupsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ page, pageSize, search }: {
  page?: number;
  pageSize?: number;
  search?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseGroupServiceGetApiGroupGetGroupsKeyFn({ page, pageSize, search }, queryKey), queryFn: () => GroupService.getApiGroupGetGroups({ page, pageSize, search }) as TData, ...options });
/**
* @param data The data for the request.
* @param data.search
* @param data.page
* @param data.pageSize
* @returns GroupDTOPagedResponseRequestResponse Success
* @throws ApiError
*/
export const useGroupServiceGetApiGroupGetPublicGroupsSuspense = <TData = Common.GroupServiceGetApiGroupGetPublicGroupsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ page, pageSize, search }: {
  page?: number;
  pageSize?: number;
  search?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseGroupServiceGetApiGroupGetPublicGroupsKeyFn({ page, pageSize, search }, queryKey), queryFn: () => GroupService.getApiGroupGetPublicGroups({ page, pageSize, search }) as TData, ...options });
/**
* @param data The data for the request.
* @param data.id
* @returns GroupLinkResponseRequestResponse Success
* @throws ApiError
*/
export const useGroupServiceGetApiGroupGetInviteLinkSuspense = <TData = Common.GroupServiceGetApiGroupGetInviteLinkDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ id }: {
  id?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseGroupServiceGetApiGroupGetInviteLinkKeyFn({ id }, queryKey), queryFn: () => GroupService.getApiGroupGetInviteLink({ id }) as TData, ...options });
/**
* @param data The data for the request.
* @param data.search
* @param data.page
* @param data.pageSize
* @param data.groupId
* @returns GroupMemberDTOPagedResponseRequestResponse Success
* @throws ApiError
*/
export const useGroupServiceGetApiGroupGetGroupMembersSuspense = <TData = Common.GroupServiceGetApiGroupGetGroupMembersDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ groupId, page, pageSize, search }: {
  groupId?: string;
  page?: number;
  pageSize?: number;
  search?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseGroupServiceGetApiGroupGetGroupMembersKeyFn({ groupId, page, pageSize, search }, queryKey), queryFn: () => GroupService.getApiGroupGetGroupMembers({ groupId, page, pageSize, search }) as TData, ...options });
/**
* @param data The data for the request.
* @param data.groupId
* @returns GroupGetDTORequestResponse Success
* @throws ApiError
*/
export const useGroupServiceGetApiGroupGetGroupSuspense = <TData = Common.GroupServiceGetApiGroupGetGroupDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ groupId }: {
  groupId?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseGroupServiceGetApiGroupGetGroupKeyFn({ groupId }, queryKey), queryFn: () => GroupService.getApiGroupGetGroup({ groupId }) as TData, ...options });
/**
* @param data The data for the request.
* @param data.groupId
* @param data.userId
* @returns GroupMemberDTORequestResponse Success
* @throws ApiError
*/
export const useGroupServiceGetApiGroupGetMemberSuspense = <TData = Common.GroupServiceGetApiGroupGetMemberDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ groupId, userId }: {
  groupId?: string;
  userId?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseGroupServiceGetApiGroupGetMemberKeyFn({ groupId, userId }, queryKey), queryFn: () => GroupService.getApiGroupGetMember({ groupId, userId }) as TData, ...options });
/**
* @param data The data for the request.
* @param data.groupId
* @returns GroupDetailsDTORequestResponse Success
* @throws ApiError
*/
export const useGroupServiceGetApiGroupGetGroupDetailsSuspense = <TData = Common.GroupServiceGetApiGroupGetGroupDetailsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ groupId }: {
  groupId?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseGroupServiceGetApiGroupGetGroupDetailsKeyFn({ groupId }, queryKey), queryFn: () => GroupService.getApiGroupGetGroupDetails({ groupId }) as TData, ...options });
/**
* @returns unknown Success
* @throws ApiError
*/
export const useLinkedInServiceGetSigninLinkedinLinkSuspense = <TData = Common.LinkedInServiceGetSigninLinkedinLinkDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseLinkedInServiceGetSigninLinkedinLinkKeyFn(queryKey), queryFn: () => LinkedInService.getSigninLinkedinLink() as TData, ...options });
/**
* @returns unknown Success
* @throws ApiError
*/
export const useLinkedInServiceGetSignupLinkedinLinkSuspense = <TData = Common.LinkedInServiceGetSignupLinkedinLinkDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseLinkedInServiceGetSignupLinkedinLinkKeyFn(queryKey), queryFn: () => LinkedInService.getSignupLinkedinLink() as TData, ...options });
/**
* @returns unknown Success
* @throws ApiError
*/
export const useLinkedInServiceGetSigninLinkedinSuspense = <TData = Common.LinkedInServiceGetSigninLinkedinDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseLinkedInServiceGetSigninLinkedinKeyFn(queryKey), queryFn: () => LinkedInService.getSigninLinkedin() as TData, ...options });
/**
* @returns unknown Success
* @throws ApiError
*/
export const useLinkedInServiceGetSignupLinkedinSuspense = <TData = Common.LinkedInServiceGetSignupLinkedinDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseLinkedInServiceGetSignupLinkedinKeyFn(queryKey), queryFn: () => LinkedInService.getSignupLinkedin() as TData, ...options });
/**
* @param data The data for the request.
* @param data.search
* @param data.page
* @param data.pageSize
* @param data.groupId
* @param data.topicId
* @param data.convId
* @param data.lastMessageId
* @returns MessageDTOPagedResponseRequestResponse Success
* @throws ApiError
*/
export const useMessageServiceGetApiMessageGetTopicMessagesSuspense = <TData = Common.MessageServiceGetApiMessageGetTopicMessagesDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ convId, groupId, lastMessageId, page, pageSize, search, topicId }: {
  convId?: string;
  groupId?: string;
  lastMessageId?: string;
  page?: number;
  pageSize?: number;
  search?: string;
  topicId?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseMessageServiceGetApiMessageGetTopicMessagesKeyFn({ convId, groupId, lastMessageId, page, pageSize, search, topicId }, queryKey), queryFn: () => MessageService.getApiMessageGetTopicMessages({ convId, groupId, lastMessageId, page, pageSize, search, topicId }) as TData, ...options });
/**
* @param data The data for the request.
* @param data.search
* @param data.page
* @param data.pageSize
* @param data.groupId
* @param data.topicId
* @param data.convId
* @param data.lastMessageId
* @returns MessageDTOPagedResponseRequestResponse Success
* @throws ApiError
*/
export const useMessageServiceGetApiMessageGetPrivateMessagesSuspense = <TData = Common.MessageServiceGetApiMessageGetPrivateMessagesDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ convId, groupId, lastMessageId, page, pageSize, search, topicId }: {
  convId?: string;
  groupId?: string;
  lastMessageId?: string;
  page?: number;
  pageSize?: number;
  search?: string;
  topicId?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseMessageServiceGetApiMessageGetPrivateMessagesKeyFn({ convId, groupId, lastMessageId, page, pageSize, search, topicId }, queryKey), queryFn: () => MessageService.getApiMessageGetPrivateMessages({ convId, groupId, lastMessageId, page, pageSize, search, topicId }) as TData, ...options });
/**
* @param data The data for the request.
* @param data.search
* @param data.page
* @param data.pageSize
* @returns PrivateConversationDTOPagedResponseRequestResponse Success
* @throws ApiError
*/
export const usePrivateConversationServiceGetApiPrivateConversationGetPrivateConversationsSuspense = <TData = Common.PrivateConversationServiceGetApiPrivateConversationGetPrivateConversationsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ page, pageSize, search }: {
  page?: number;
  pageSize?: number;
  search?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UsePrivateConversationServiceGetApiPrivateConversationGetPrivateConversationsKeyFn({ page, pageSize, search }, queryKey), queryFn: () => PrivateConversationService.getApiPrivateConversationGetPrivateConversations({ page, pageSize, search }) as TData, ...options });
/**
* @param data The data for the request.
* @param data.convId
* @returns PrivateConversationDTORequestResponse Success
* @throws ApiError
*/
export const usePrivateConversationServiceGetApiPrivateConversationGetPrivateConversationSuspense = <TData = Common.PrivateConversationServiceGetApiPrivateConversationGetPrivateConversationDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ convId }: {
  convId?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UsePrivateConversationServiceGetApiPrivateConversationGetPrivateConversationKeyFn({ convId }, queryKey), queryFn: () => PrivateConversationService.getApiPrivateConversationGetPrivateConversation({ convId }) as TData, ...options });
/**
* @param data The data for the request.
* @param data.groupId
* @param data.topicId
* @returns TopicDTORequestResponse Success
* @throws ApiError
*/
export const useTopicServiceGetApiTopicGetTopicSuspense = <TData = Common.TopicServiceGetApiTopicGetTopicDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ groupId, topicId }: {
  groupId?: string;
  topicId?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseTopicServiceGetApiTopicGetTopicKeyFn({ groupId, topicId }, queryKey), queryFn: () => TopicService.getApiTopicGetTopic({ groupId, topicId }) as TData, ...options });
/**
* @param data The data for the request.
* @param data.search
* @param data.page
* @param data.pageSize
* @param data.groupId
* @returns TopicDTOPagedResponseRequestResponse Success
* @throws ApiError
*/
export const useTopicServiceGetApiTopicGetTopicsSuspense = <TData = Common.TopicServiceGetApiTopicGetTopicsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ groupId, page, pageSize, search }: {
  groupId?: string;
  page?: number;
  pageSize?: number;
  search?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseTopicServiceGetApiTopicGetTopicsKeyFn({ groupId, page, pageSize, search }, queryKey), queryFn: () => TopicService.getApiTopicGetTopics({ groupId, page, pageSize, search }) as TData, ...options });
/**
* @param data The data for the request.
* @param data.search
* @param data.page
* @param data.pageSize
* @param data.groupId
* @returns TopicDTOPagedResponseRequestResponse Success
* @throws ApiError
*/
export const useTopicServiceGetApiTopicGetMyTopicsSuspense = <TData = Common.TopicServiceGetApiTopicGetMyTopicsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ groupId, page, pageSize, search }: {
  groupId?: string;
  page?: number;
  pageSize?: number;
  search?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseTopicServiceGetApiTopicGetMyTopicsKeyFn({ groupId, page, pageSize, search }, queryKey), queryFn: () => TopicService.getApiTopicGetMyTopics({ groupId, page, pageSize, search }) as TData, ...options });
/**
* @param data The data for the request.
* @param data.search
* @param data.page
* @param data.pageSize
* @param data.groupId
* @returns TopicDTOPagedResponseRequestResponse Success
* @throws ApiError
*/
export const useTopicServiceGetApiTopicGetRecentTopicsSuspense = <TData = Common.TopicServiceGetApiTopicGetRecentTopicsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ groupId, page, pageSize, search }: {
  groupId?: string;
  page?: number;
  pageSize?: number;
  search?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseTopicServiceGetApiTopicGetRecentTopicsKeyFn({ groupId, page, pageSize, search }, queryKey), queryFn: () => TopicService.getApiTopicGetRecentTopics({ groupId, page, pageSize, search }) as TData, ...options });
/**
* @param data The data for the request.
* @param data.id
* @returns UserDTORequestResponse Success
* @throws ApiError
*/
export const useUserServiceGetApiUserGetByIdByIdSuspense = <TData = Common.UserServiceGetApiUserGetByIdByIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ id }: {
  id: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseUserServiceGetApiUserGetByIdByIdKeyFn({ id }, queryKey), queryFn: () => UserService.getApiUserGetByIdById({ id }) as TData, ...options });
/**
* @returns UserDTORequestResponse Success
* @throws ApiError
*/
export const useUserServiceGetApiUserGetMeSuspense = <TData = Common.UserServiceGetApiUserGetMeDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseUserServiceGetApiUserGetMeKeyFn(queryKey), queryFn: () => UserService.getApiUserGetMe() as TData, ...options });
/**
* @param data The data for the request.
* @param data.search
* @param data.page
* @param data.pageSize
* @returns UserDTOPagedResponseRequestResponse Success
* @throws ApiError
*/
export const useUserServiceGetApiUserGetUsersSuspense = <TData = Common.UserServiceGetApiUserGetUsersDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ page, pageSize, search }: {
  page?: number;
  pageSize?: number;
  search?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseUserServiceGetApiUserGetUsersKeyFn({ page, pageSize, search }, queryKey), queryFn: () => UserService.getApiUserGetUsers({ page, pageSize, search }) as TData, ...options });
