// generated with @7nohe/openapi-react-query-codegen@1.4.1 

import { type QueryClient } from "@tanstack/react-query";
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
export const prefetchUseContactFormServiceGetApiContactFormGetContactForms = (queryClient: QueryClient, { page, pageSize, search }: {
  page?: number;
  pageSize?: number;
  search?: string;
} = {}) => queryClient.prefetchQuery({ queryKey: Common.UseContactFormServiceGetApiContactFormGetContactFormsKeyFn({ page, pageSize, search }), queryFn: () => ContactFormService.getApiContactFormGetContactForms({ page, pageSize, search }) });
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
} = {}) => queryClient.prefetchQuery({ queryKey: Common.UseGroupServiceGetApiGroupGetGroupsKeyFn({ page, pageSize, search }), queryFn: () => GroupService.getApiGroupGetGroups({ page, pageSize, search }) });
/**
* @param data The data for the request.
* @param data.search
* @param data.page
* @param data.pageSize
* @returns GroupDTOPagedResponseRequestResponse Success
* @throws ApiError
*/
export const prefetchUseGroupServiceGetApiGroupGetPublicGroups = (queryClient: QueryClient, { page, pageSize, search }: {
  page?: number;
  pageSize?: number;
  search?: string;
} = {}) => queryClient.prefetchQuery({ queryKey: Common.UseGroupServiceGetApiGroupGetPublicGroupsKeyFn({ page, pageSize, search }), queryFn: () => GroupService.getApiGroupGetPublicGroups({ page, pageSize, search }) });
/**
* @param data The data for the request.
* @param data.id
* @returns GroupLinkResponseRequestResponse Success
* @throws ApiError
*/
export const prefetchUseGroupServiceGetApiGroupGetInviteLink = (queryClient: QueryClient, { id }: {
  id?: string;
} = {}) => queryClient.prefetchQuery({ queryKey: Common.UseGroupServiceGetApiGroupGetInviteLinkKeyFn({ id }), queryFn: () => GroupService.getApiGroupGetInviteLink({ id }) });
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
} = {}) => queryClient.prefetchQuery({ queryKey: Common.UseGroupServiceGetApiGroupGetGroupMembersKeyFn({ groupId, page, pageSize, search }), queryFn: () => GroupService.getApiGroupGetGroupMembers({ groupId, page, pageSize, search }) });
/**
* @param data The data for the request.
* @param data.groupId
* @returns GroupGetDTORequestResponse Success
* @throws ApiError
*/
export const prefetchUseGroupServiceGetApiGroupGetGroup = (queryClient: QueryClient, { groupId }: {
  groupId?: string;
} = {}) => queryClient.prefetchQuery({ queryKey: Common.UseGroupServiceGetApiGroupGetGroupKeyFn({ groupId }), queryFn: () => GroupService.getApiGroupGetGroup({ groupId }) });
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
} = {}) => queryClient.prefetchQuery({ queryKey: Common.UseGroupServiceGetApiGroupGetMemberKeyFn({ groupId, userId }), queryFn: () => GroupService.getApiGroupGetMember({ groupId, userId }) });
/**
* @param data The data for the request.
* @param data.groupId
* @returns GroupDetailsDTORequestResponse Success
* @throws ApiError
*/
export const prefetchUseGroupServiceGetApiGroupGetGroupDetails = (queryClient: QueryClient, { groupId }: {
  groupId?: string;
} = {}) => queryClient.prefetchQuery({ queryKey: Common.UseGroupServiceGetApiGroupGetGroupDetailsKeyFn({ groupId }), queryFn: () => GroupService.getApiGroupGetGroupDetails({ groupId }) });
/**
* @returns unknown Success
* @throws ApiError
*/
export const prefetchUseLinkedInServiceGetSigninLinkedinLink = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseLinkedInServiceGetSigninLinkedinLinkKeyFn(), queryFn: () => LinkedInService.getSigninLinkedinLink() });
/**
* @returns unknown Success
* @throws ApiError
*/
export const prefetchUseLinkedInServiceGetSignupLinkedinLink = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseLinkedInServiceGetSignupLinkedinLinkKeyFn(), queryFn: () => LinkedInService.getSignupLinkedinLink() });
/**
* @returns unknown Success
* @throws ApiError
*/
export const prefetchUseLinkedInServiceGetSigninLinkedin = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseLinkedInServiceGetSigninLinkedinKeyFn(), queryFn: () => LinkedInService.getSigninLinkedin() });
/**
* @returns unknown Success
* @throws ApiError
*/
export const prefetchUseLinkedInServiceGetSignupLinkedin = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseLinkedInServiceGetSignupLinkedinKeyFn(), queryFn: () => LinkedInService.getSignupLinkedin() });
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
} = {}) => queryClient.prefetchQuery({ queryKey: Common.UseMessageServiceGetApiMessageGetTopicMessagesKeyFn({ convId, groupId, lastMessageId, page, pageSize, search, topicId }), queryFn: () => MessageService.getApiMessageGetTopicMessages({ convId, groupId, lastMessageId, page, pageSize, search, topicId }) });
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
} = {}) => queryClient.prefetchQuery({ queryKey: Common.UseMessageServiceGetApiMessageGetPrivateMessagesKeyFn({ convId, groupId, lastMessageId, page, pageSize, search, topicId }), queryFn: () => MessageService.getApiMessageGetPrivateMessages({ convId, groupId, lastMessageId, page, pageSize, search, topicId }) });
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
} = {}) => queryClient.prefetchQuery({ queryKey: Common.UsePrivateConversationServiceGetApiPrivateConversationGetPrivateConversationsKeyFn({ page, pageSize, search }), queryFn: () => PrivateConversationService.getApiPrivateConversationGetPrivateConversations({ page, pageSize, search }) });
/**
* @param data The data for the request.
* @param data.convId
* @returns PrivateConversationDTORequestResponse Success
* @throws ApiError
*/
export const prefetchUsePrivateConversationServiceGetApiPrivateConversationGetPrivateConversation = (queryClient: QueryClient, { convId }: {
  convId?: string;
} = {}) => queryClient.prefetchQuery({ queryKey: Common.UsePrivateConversationServiceGetApiPrivateConversationGetPrivateConversationKeyFn({ convId }), queryFn: () => PrivateConversationService.getApiPrivateConversationGetPrivateConversation({ convId }) });
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
} = {}) => queryClient.prefetchQuery({ queryKey: Common.UseTopicServiceGetApiTopicGetTopicKeyFn({ groupId, topicId }), queryFn: () => TopicService.getApiTopicGetTopic({ groupId, topicId }) });
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
} = {}) => queryClient.prefetchQuery({ queryKey: Common.UseTopicServiceGetApiTopicGetTopicsKeyFn({ groupId, page, pageSize, search }), queryFn: () => TopicService.getApiTopicGetTopics({ groupId, page, pageSize, search }) });
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
} = {}) => queryClient.prefetchQuery({ queryKey: Common.UseTopicServiceGetApiTopicGetMyTopicsKeyFn({ groupId, page, pageSize, search }), queryFn: () => TopicService.getApiTopicGetMyTopics({ groupId, page, pageSize, search }) });
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
} = {}) => queryClient.prefetchQuery({ queryKey: Common.UseTopicServiceGetApiTopicGetRecentTopicsKeyFn({ groupId, page, pageSize, search }), queryFn: () => TopicService.getApiTopicGetRecentTopics({ groupId, page, pageSize, search }) });
/**
* @param data The data for the request.
* @param data.id
* @returns UserDTORequestResponse Success
* @throws ApiError
*/
export const prefetchUseUserServiceGetApiUserGetByIdById = (queryClient: QueryClient, { id }: {
  id: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseUserServiceGetApiUserGetByIdByIdKeyFn({ id }), queryFn: () => UserService.getApiUserGetByIdById({ id }) });
/**
* @returns UserDTORequestResponse Success
* @throws ApiError
*/
export const prefetchUseUserServiceGetApiUserGetMe = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseUserServiceGetApiUserGetMeKeyFn(), queryFn: () => UserService.getApiUserGetMe() });
/**
* @param data The data for the request.
* @param data.search
* @param data.page
* @param data.pageSize
* @returns UserDTOPagedResponseRequestResponse Success
* @throws ApiError
*/
export const prefetchUseUserServiceGetApiUserGetUsers = (queryClient: QueryClient, { page, pageSize, search }: {
  page?: number;
  pageSize?: number;
  search?: string;
} = {}) => queryClient.prefetchQuery({ queryKey: Common.UseUserServiceGetApiUserGetUsersKeyFn({ page, pageSize, search }), queryFn: () => UserService.getApiUserGetUsers({ page, pageSize, search }) });
