// generated with @7nohe/openapi-react-query-codegen@1.4.0 

import { type QueryClient } from "@tanstack/react-query";
import { GroupService, MessageService, PrivateConversationService, TopicService, UserService } from "../requests/services.gen";
import * as Common from "./common";
/**
* @param data The data for the request.
* @param data.search
* @param data.page
* @param data.pageSize
* @returns GroupDTOPagedResponseRequestResponse Success
* @throws ApiError
*/
export const prefetchUseGroupServiceGetApiGroupGetGroups = (queryClient: QueryClient, { page, pageSize, search }: {
  page?: number;
  pageSize?: number;
  search?: string;
} = {}) => queryClient.prefetchQuery({ queryKey: [Common.useGroupServiceGetApiGroupGetGroupsKey, [{ page, pageSize, search }]], queryFn: () => GroupService.getApiGroupGetGroups({ page, pageSize, search }) });
/**
* @param data The data for the request.
* @param data.id
* @returns GroupLinkResponseRequestResponse Success
* @throws ApiError
*/
export const prefetchUseGroupServiceGetApiGroupGetInviteLink = (queryClient: QueryClient, { id }: {
  id?: string;
} = {}) => queryClient.prefetchQuery({ queryKey: [Common.useGroupServiceGetApiGroupGetInviteLinkKey, [{ id }]], queryFn: () => GroupService.getApiGroupGetInviteLink({ id }) });
/**
* @param data The data for the request.
* @param data.search
* @param data.page
* @param data.pageSize
* @param data.groupId
* @returns GroupMemberDTOPagedResponseRequestResponse Success
* @throws ApiError
*/
export const prefetchUseGroupServiceGetApiGroupGetGroupMembers = (queryClient: QueryClient, { groupId, page, pageSize, search }: {
  groupId?: string;
  page?: number;
  pageSize?: number;
  search?: string;
} = {}) => queryClient.prefetchQuery({ queryKey: [Common.useGroupServiceGetApiGroupGetGroupMembersKey, [{ groupId, page, pageSize, search }]], queryFn: () => GroupService.getApiGroupGetGroupMembers({ groupId, page, pageSize, search }) });
/**
* @param data The data for the request.
* @param data.groupId
* @returns GroupGetDTORequestResponse Success
* @throws ApiError
*/
export const prefetchUseGroupServiceGetApiGroupGetGroup = (queryClient: QueryClient, { groupId }: {
  groupId?: string;
} = {}) => queryClient.prefetchQuery({ queryKey: [Common.useGroupServiceGetApiGroupGetGroupKey, [{ groupId }]], queryFn: () => GroupService.getApiGroupGetGroup({ groupId }) });
/**
* @param data The data for the request.
* @param data.groupId
* @param data.userId
* @returns GroupMemberDTORequestResponse Success
* @throws ApiError
*/
export const prefetchUseGroupServiceGetApiGroupGetMember = (queryClient: QueryClient, { groupId, userId }: {
  groupId?: string;
  userId?: string;
} = {}) => queryClient.prefetchQuery({ queryKey: [Common.useGroupServiceGetApiGroupGetMemberKey, [{ groupId, userId }]], queryFn: () => GroupService.getApiGroupGetMember({ groupId, userId }) });
/**
* @param data The data for the request.
* @param data.groupId
* @returns GroupDetailsDTORequestResponse Success
* @throws ApiError
*/
export const prefetchUseGroupServiceGetApiGroupGetGroupDetails = (queryClient: QueryClient, { groupId }: {
  groupId?: string;
} = {}) => queryClient.prefetchQuery({ queryKey: [Common.useGroupServiceGetApiGroupGetGroupDetailsKey, [{ groupId }]], queryFn: () => GroupService.getApiGroupGetGroupDetails({ groupId }) });
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
export const prefetchUseMessageServiceGetApiMessageGetTopicMessages = (queryClient: QueryClient, { convId, groupId, lastMessageId, page, pageSize, search, topicId }: {
  convId?: string;
  groupId?: string;
  lastMessageId?: string;
  page?: number;
  pageSize?: number;
  search?: string;
  topicId?: string;
} = {}) => queryClient.prefetchQuery({ queryKey: [Common.useMessageServiceGetApiMessageGetTopicMessagesKey, [{ convId, groupId, lastMessageId, page, pageSize, search, topicId }]], queryFn: () => MessageService.getApiMessageGetTopicMessages({ convId, groupId, lastMessageId, page, pageSize, search, topicId }) });
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
export const prefetchUseMessageServiceGetApiMessageGetPrivateMessages = (queryClient: QueryClient, { convId, groupId, lastMessageId, page, pageSize, search, topicId }: {
  convId?: string;
  groupId?: string;
  lastMessageId?: string;
  page?: number;
  pageSize?: number;
  search?: string;
  topicId?: string;
} = {}) => queryClient.prefetchQuery({ queryKey: [Common.useMessageServiceGetApiMessageGetPrivateMessagesKey, [{ convId, groupId, lastMessageId, page, pageSize, search, topicId }]], queryFn: () => MessageService.getApiMessageGetPrivateMessages({ convId, groupId, lastMessageId, page, pageSize, search, topicId }) });
/**
* @param data The data for the request.
* @param data.search
* @param data.page
* @param data.pageSize
* @returns PrivateConversationDTOPagedResponseRequestResponse Success
* @throws ApiError
*/
export const prefetchUsePrivateConversationServiceGetApiPrivateConversationGetPrivateConversations = (queryClient: QueryClient, { page, pageSize, search }: {
  page?: number;
  pageSize?: number;
  search?: string;
} = {}) => queryClient.prefetchQuery({ queryKey: [Common.usePrivateConversationServiceGetApiPrivateConversationGetPrivateConversationsKey, [{ page, pageSize, search }]], queryFn: () => PrivateConversationService.getApiPrivateConversationGetPrivateConversations({ page, pageSize, search }) });
/**
* @param data The data for the request.
* @param data.convId
* @returns PrivateConversationDTORequestResponse Success
* @throws ApiError
*/
export const prefetchUsePrivateConversationServiceGetApiPrivateConversationGetPrivateConversation = (queryClient: QueryClient, { convId }: {
  convId?: string;
} = {}) => queryClient.prefetchQuery({ queryKey: [Common.usePrivateConversationServiceGetApiPrivateConversationGetPrivateConversationKey, [{ convId }]], queryFn: () => PrivateConversationService.getApiPrivateConversationGetPrivateConversation({ convId }) });
/**
* @param data The data for the request.
* @param data.groupId
* @param data.topicId
* @returns TopicDTORequestResponse Success
* @throws ApiError
*/
export const prefetchUseTopicServiceGetApiTopicGetTopic = (queryClient: QueryClient, { groupId, topicId }: {
  groupId?: string;
  topicId?: string;
} = {}) => queryClient.prefetchQuery({ queryKey: [Common.useTopicServiceGetApiTopicGetTopicKey, [{ groupId, topicId }]], queryFn: () => TopicService.getApiTopicGetTopic({ groupId, topicId }) });
/**
* @param data The data for the request.
* @param data.search
* @param data.page
* @param data.pageSize
* @param data.groupId
* @returns TopicDTOPagedResponseRequestResponse Success
* @throws ApiError
*/
export const prefetchUseTopicServiceGetApiTopicGetTopics = (queryClient: QueryClient, { groupId, page, pageSize, search }: {
  groupId?: string;
  page?: number;
  pageSize?: number;
  search?: string;
} = {}) => queryClient.prefetchQuery({ queryKey: [Common.useTopicServiceGetApiTopicGetTopicsKey, [{ groupId, page, pageSize, search }]], queryFn: () => TopicService.getApiTopicGetTopics({ groupId, page, pageSize, search }) });
/**
* @param data The data for the request.
* @param data.search
* @param data.page
* @param data.pageSize
* @param data.groupId
* @returns TopicDTOPagedResponseRequestResponse Success
* @throws ApiError
*/
export const prefetchUseTopicServiceGetApiTopicGetMyTopics = (queryClient: QueryClient, { groupId, page, pageSize, search }: {
  groupId?: string;
  page?: number;
  pageSize?: number;
  search?: string;
} = {}) => queryClient.prefetchQuery({ queryKey: [Common.useTopicServiceGetApiTopicGetMyTopicsKey, [{ groupId, page, pageSize, search }]], queryFn: () => TopicService.getApiTopicGetMyTopics({ groupId, page, pageSize, search }) });
/**
* @param data The data for the request.
* @param data.search
* @param data.page
* @param data.pageSize
* @param data.groupId
* @returns TopicDTOPagedResponseRequestResponse Success
* @throws ApiError
*/
export const prefetchUseTopicServiceGetApiTopicGetRecentTopics = (queryClient: QueryClient, { groupId, page, pageSize, search }: {
  groupId?: string;
  page?: number;
  pageSize?: number;
  search?: string;
} = {}) => queryClient.prefetchQuery({ queryKey: [Common.useTopicServiceGetApiTopicGetRecentTopicsKey, [{ groupId, page, pageSize, search }]], queryFn: () => TopicService.getApiTopicGetRecentTopics({ groupId, page, pageSize, search }) });
/**
* @param data The data for the request.
* @param data.id
* @returns UserDTORequestResponse Success
* @throws ApiError
*/
export const prefetchUseUserServiceGetApiUserGetByIdById = (queryClient: QueryClient, { id }: {
  id: string;
}) => queryClient.prefetchQuery({ queryKey: [Common.useUserServiceGetApiUserGetByIdByIdKey, [{ id }]], queryFn: () => UserService.getApiUserGetByIdById({ id }) });
/**
* @returns UserDTORequestResponse Success
* @throws ApiError
*/
export const prefetchUseUserServiceGetApiUserGetMe = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: [Common.useUserServiceGetApiUserGetMeKey, []], queryFn: () => UserService.getApiUserGetMe() });
/**
* @param data The data for the request.
* @param data.search
* @param data.page
* @param data.pageSize
* @returns UserDTOPagedResponseRequestResponse Success
* @throws ApiError
*/
export const prefetchUseUserServiceGetApiUserGetPage = (queryClient: QueryClient, { page, pageSize, search }: {
  page?: number;
  pageSize?: number;
  search?: string;
} = {}) => queryClient.prefetchQuery({ queryKey: [Common.useUserServiceGetApiUserGetPageKey, [{ page, pageSize, search }]], queryFn: () => UserService.getApiUserGetPage({ page, pageSize, search }) });
