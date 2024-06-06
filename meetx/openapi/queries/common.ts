// generated with @7nohe/openapi-react-query-codegen@1.4.0 

import { UseQueryResult } from "@tanstack/react-query";
import { AuthorizationService, ContactFormService, GroupService, LinkedInService, MessageFilesService, MessageService, PrivateConversationService, TopicService, UserService } from "../requests/services.gen";
export type ContactFormServiceGetApiContactFormGetContactFormsDefaultResponse = Awaited<ReturnType<typeof ContactFormService.getApiContactFormGetContactForms>>;
export type ContactFormServiceGetApiContactFormGetContactFormsQueryResult<TData = ContactFormServiceGetApiContactFormGetContactFormsDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useContactFormServiceGetApiContactFormGetContactFormsKey = "ContactFormServiceGetApiContactFormGetContactForms";
export const UseContactFormServiceGetApiContactFormGetContactFormsKeyFn = ({ page, pageSize, search }: {
  page?: number;
  pageSize?: number;
  search?: string;
} = {}, queryKey?: Array<unknown>) => [useContactFormServiceGetApiContactFormGetContactFormsKey, ...(queryKey ?? [{ page, pageSize, search }])];
export type GroupServiceGetApiGroupGetGroupsDefaultResponse = Awaited<ReturnType<typeof GroupService.getApiGroupGetGroups>>;
export type GroupServiceGetApiGroupGetGroupsQueryResult<TData = GroupServiceGetApiGroupGetGroupsDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useGroupServiceGetApiGroupGetGroupsKey = "GroupServiceGetApiGroupGetGroups";
export const UseGroupServiceGetApiGroupGetGroupsKeyFn = ({ page, pageSize, search }: {
  page?: number;
  pageSize?: number;
  search?: string;
} = {}, queryKey?: Array<unknown>) => [useGroupServiceGetApiGroupGetGroupsKey, ...(queryKey ?? [{ page, pageSize, search }])];
export type GroupServiceGetApiGroupGetPublicGroupsDefaultResponse = Awaited<ReturnType<typeof GroupService.getApiGroupGetPublicGroups>>;
export type GroupServiceGetApiGroupGetPublicGroupsQueryResult<TData = GroupServiceGetApiGroupGetPublicGroupsDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useGroupServiceGetApiGroupGetPublicGroupsKey = "GroupServiceGetApiGroupGetPublicGroups";
export const UseGroupServiceGetApiGroupGetPublicGroupsKeyFn = ({ page, pageSize, search }: {
  page?: number;
  pageSize?: number;
  search?: string;
} = {}, queryKey?: Array<unknown>) => [useGroupServiceGetApiGroupGetPublicGroupsKey, ...(queryKey ?? [{ page, pageSize, search }])];
export type GroupServiceGetApiGroupGetInviteLinkDefaultResponse = Awaited<ReturnType<typeof GroupService.getApiGroupGetInviteLink>>;
export type GroupServiceGetApiGroupGetInviteLinkQueryResult<TData = GroupServiceGetApiGroupGetInviteLinkDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useGroupServiceGetApiGroupGetInviteLinkKey = "GroupServiceGetApiGroupGetInviteLink";
export const UseGroupServiceGetApiGroupGetInviteLinkKeyFn = ({ id }: {
  id?: string;
} = {}, queryKey?: Array<unknown>) => [useGroupServiceGetApiGroupGetInviteLinkKey, ...(queryKey ?? [{ id }])];
export type GroupServiceGetApiGroupGetGroupMembersDefaultResponse = Awaited<ReturnType<typeof GroupService.getApiGroupGetGroupMembers>>;
export type GroupServiceGetApiGroupGetGroupMembersQueryResult<TData = GroupServiceGetApiGroupGetGroupMembersDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useGroupServiceGetApiGroupGetGroupMembersKey = "GroupServiceGetApiGroupGetGroupMembers";
export const UseGroupServiceGetApiGroupGetGroupMembersKeyFn = ({ groupId, page, pageSize, search }: {
  groupId?: string;
  page?: number;
  pageSize?: number;
  search?: string;
} = {}, queryKey?: Array<unknown>) => [useGroupServiceGetApiGroupGetGroupMembersKey, ...(queryKey ?? [{ groupId, page, pageSize, search }])];
export type GroupServiceGetApiGroupGetGroupDefaultResponse = Awaited<ReturnType<typeof GroupService.getApiGroupGetGroup>>;
export type GroupServiceGetApiGroupGetGroupQueryResult<TData = GroupServiceGetApiGroupGetGroupDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useGroupServiceGetApiGroupGetGroupKey = "GroupServiceGetApiGroupGetGroup";
export const UseGroupServiceGetApiGroupGetGroupKeyFn = ({ groupId }: {
  groupId?: string;
} = {}, queryKey?: Array<unknown>) => [useGroupServiceGetApiGroupGetGroupKey, ...(queryKey ?? [{ groupId }])];
export type GroupServiceGetApiGroupGetMemberDefaultResponse = Awaited<ReturnType<typeof GroupService.getApiGroupGetMember>>;
export type GroupServiceGetApiGroupGetMemberQueryResult<TData = GroupServiceGetApiGroupGetMemberDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useGroupServiceGetApiGroupGetMemberKey = "GroupServiceGetApiGroupGetMember";
export const UseGroupServiceGetApiGroupGetMemberKeyFn = ({ groupId, userId }: {
  groupId?: string;
  userId?: string;
} = {}, queryKey?: Array<unknown>) => [useGroupServiceGetApiGroupGetMemberKey, ...(queryKey ?? [{ groupId, userId }])];
export type GroupServiceGetApiGroupGetGroupDetailsDefaultResponse = Awaited<ReturnType<typeof GroupService.getApiGroupGetGroupDetails>>;
export type GroupServiceGetApiGroupGetGroupDetailsQueryResult<TData = GroupServiceGetApiGroupGetGroupDetailsDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useGroupServiceGetApiGroupGetGroupDetailsKey = "GroupServiceGetApiGroupGetGroupDetails";
export const UseGroupServiceGetApiGroupGetGroupDetailsKeyFn = ({ groupId }: {
  groupId?: string;
} = {}, queryKey?: Array<unknown>) => [useGroupServiceGetApiGroupGetGroupDetailsKey, ...(queryKey ?? [{ groupId }])];
export type LinkedInServiceGetSigninLinkedinLinkDefaultResponse = Awaited<ReturnType<typeof LinkedInService.getSigninLinkedinLink>>;
export type LinkedInServiceGetSigninLinkedinLinkQueryResult<TData = LinkedInServiceGetSigninLinkedinLinkDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useLinkedInServiceGetSigninLinkedinLinkKey = "LinkedInServiceGetSigninLinkedinLink";
export const UseLinkedInServiceGetSigninLinkedinLinkKeyFn = (queryKey?: Array<unknown>) => [useLinkedInServiceGetSigninLinkedinLinkKey, ...(queryKey ?? [])];
export type LinkedInServiceGetSignupLinkedinLinkDefaultResponse = Awaited<ReturnType<typeof LinkedInService.getSignupLinkedinLink>>;
export type LinkedInServiceGetSignupLinkedinLinkQueryResult<TData = LinkedInServiceGetSignupLinkedinLinkDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useLinkedInServiceGetSignupLinkedinLinkKey = "LinkedInServiceGetSignupLinkedinLink";
export const UseLinkedInServiceGetSignupLinkedinLinkKeyFn = (queryKey?: Array<unknown>) => [useLinkedInServiceGetSignupLinkedinLinkKey, ...(queryKey ?? [])];
export type LinkedInServiceGetSigninLinkedinDefaultResponse = Awaited<ReturnType<typeof LinkedInService.getSigninLinkedin>>;
export type LinkedInServiceGetSigninLinkedinQueryResult<TData = LinkedInServiceGetSigninLinkedinDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useLinkedInServiceGetSigninLinkedinKey = "LinkedInServiceGetSigninLinkedin";
export const UseLinkedInServiceGetSigninLinkedinKeyFn = (queryKey?: Array<unknown>) => [useLinkedInServiceGetSigninLinkedinKey, ...(queryKey ?? [])];
export type LinkedInServiceGetSignupLinkedinDefaultResponse = Awaited<ReturnType<typeof LinkedInService.getSignupLinkedin>>;
export type LinkedInServiceGetSignupLinkedinQueryResult<TData = LinkedInServiceGetSignupLinkedinDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useLinkedInServiceGetSignupLinkedinKey = "LinkedInServiceGetSignupLinkedin";
export const UseLinkedInServiceGetSignupLinkedinKeyFn = (queryKey?: Array<unknown>) => [useLinkedInServiceGetSignupLinkedinKey, ...(queryKey ?? [])];
export type MessageServiceGetApiMessageGetTopicMessagesDefaultResponse = Awaited<ReturnType<typeof MessageService.getApiMessageGetTopicMessages>>;
export type MessageServiceGetApiMessageGetTopicMessagesQueryResult<TData = MessageServiceGetApiMessageGetTopicMessagesDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useMessageServiceGetApiMessageGetTopicMessagesKey = "MessageServiceGetApiMessageGetTopicMessages";
export const UseMessageServiceGetApiMessageGetTopicMessagesKeyFn = ({ convId, groupId, lastMessageId, page, pageSize, search, topicId }: {
  convId?: string;
  groupId?: string;
  lastMessageId?: string;
  page?: number;
  pageSize?: number;
  search?: string;
  topicId?: string;
} = {}, queryKey?: Array<unknown>) => [useMessageServiceGetApiMessageGetTopicMessagesKey, ...(queryKey ?? [{ convId, groupId, lastMessageId, page, pageSize, search, topicId }])];
export type MessageServiceGetApiMessageGetPrivateMessagesDefaultResponse = Awaited<ReturnType<typeof MessageService.getApiMessageGetPrivateMessages>>;
export type MessageServiceGetApiMessageGetPrivateMessagesQueryResult<TData = MessageServiceGetApiMessageGetPrivateMessagesDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useMessageServiceGetApiMessageGetPrivateMessagesKey = "MessageServiceGetApiMessageGetPrivateMessages";
export const UseMessageServiceGetApiMessageGetPrivateMessagesKeyFn = ({ convId, groupId, lastMessageId, page, pageSize, search, topicId }: {
  convId?: string;
  groupId?: string;
  lastMessageId?: string;
  page?: number;
  pageSize?: number;
  search?: string;
  topicId?: string;
} = {}, queryKey?: Array<unknown>) => [useMessageServiceGetApiMessageGetPrivateMessagesKey, ...(queryKey ?? [{ convId, groupId, lastMessageId, page, pageSize, search, topicId }])];
export type PrivateConversationServiceGetApiPrivateConversationGetPrivateConversationsDefaultResponse = Awaited<ReturnType<typeof PrivateConversationService.getApiPrivateConversationGetPrivateConversations>>;
export type PrivateConversationServiceGetApiPrivateConversationGetPrivateConversationsQueryResult<TData = PrivateConversationServiceGetApiPrivateConversationGetPrivateConversationsDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const usePrivateConversationServiceGetApiPrivateConversationGetPrivateConversationsKey = "PrivateConversationServiceGetApiPrivateConversationGetPrivateConversations";
export const UsePrivateConversationServiceGetApiPrivateConversationGetPrivateConversationsKeyFn = ({ page, pageSize, search }: {
  page?: number;
  pageSize?: number;
  search?: string;
} = {}, queryKey?: Array<unknown>) => [usePrivateConversationServiceGetApiPrivateConversationGetPrivateConversationsKey, ...(queryKey ?? [{ page, pageSize, search }])];
export type PrivateConversationServiceGetApiPrivateConversationGetPrivateConversationDefaultResponse = Awaited<ReturnType<typeof PrivateConversationService.getApiPrivateConversationGetPrivateConversation>>;
export type PrivateConversationServiceGetApiPrivateConversationGetPrivateConversationQueryResult<TData = PrivateConversationServiceGetApiPrivateConversationGetPrivateConversationDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const usePrivateConversationServiceGetApiPrivateConversationGetPrivateConversationKey = "PrivateConversationServiceGetApiPrivateConversationGetPrivateConversation";
export const UsePrivateConversationServiceGetApiPrivateConversationGetPrivateConversationKeyFn = ({ convId }: {
  convId?: string;
} = {}, queryKey?: Array<unknown>) => [usePrivateConversationServiceGetApiPrivateConversationGetPrivateConversationKey, ...(queryKey ?? [{ convId }])];
export type TopicServiceGetApiTopicGetTopicDefaultResponse = Awaited<ReturnType<typeof TopicService.getApiTopicGetTopic>>;
export type TopicServiceGetApiTopicGetTopicQueryResult<TData = TopicServiceGetApiTopicGetTopicDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useTopicServiceGetApiTopicGetTopicKey = "TopicServiceGetApiTopicGetTopic";
export const UseTopicServiceGetApiTopicGetTopicKeyFn = ({ groupId, topicId }: {
  groupId?: string;
  topicId?: string;
} = {}, queryKey?: Array<unknown>) => [useTopicServiceGetApiTopicGetTopicKey, ...(queryKey ?? [{ groupId, topicId }])];
export type TopicServiceGetApiTopicGetTopicsDefaultResponse = Awaited<ReturnType<typeof TopicService.getApiTopicGetTopics>>;
export type TopicServiceGetApiTopicGetTopicsQueryResult<TData = TopicServiceGetApiTopicGetTopicsDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useTopicServiceGetApiTopicGetTopicsKey = "TopicServiceGetApiTopicGetTopics";
export const UseTopicServiceGetApiTopicGetTopicsKeyFn = ({ groupId, page, pageSize, search }: {
  groupId?: string;
  page?: number;
  pageSize?: number;
  search?: string;
} = {}, queryKey?: Array<unknown>) => [useTopicServiceGetApiTopicGetTopicsKey, ...(queryKey ?? [{ groupId, page, pageSize, search }])];
export type TopicServiceGetApiTopicGetMyTopicsDefaultResponse = Awaited<ReturnType<typeof TopicService.getApiTopicGetMyTopics>>;
export type TopicServiceGetApiTopicGetMyTopicsQueryResult<TData = TopicServiceGetApiTopicGetMyTopicsDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useTopicServiceGetApiTopicGetMyTopicsKey = "TopicServiceGetApiTopicGetMyTopics";
export const UseTopicServiceGetApiTopicGetMyTopicsKeyFn = ({ groupId, page, pageSize, search }: {
  groupId?: string;
  page?: number;
  pageSize?: number;
  search?: string;
} = {}, queryKey?: Array<unknown>) => [useTopicServiceGetApiTopicGetMyTopicsKey, ...(queryKey ?? [{ groupId, page, pageSize, search }])];
export type TopicServiceGetApiTopicGetRecentTopicsDefaultResponse = Awaited<ReturnType<typeof TopicService.getApiTopicGetRecentTopics>>;
export type TopicServiceGetApiTopicGetRecentTopicsQueryResult<TData = TopicServiceGetApiTopicGetRecentTopicsDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useTopicServiceGetApiTopicGetRecentTopicsKey = "TopicServiceGetApiTopicGetRecentTopics";
export const UseTopicServiceGetApiTopicGetRecentTopicsKeyFn = ({ groupId, page, pageSize, search }: {
  groupId?: string;
  page?: number;
  pageSize?: number;
  search?: string;
} = {}, queryKey?: Array<unknown>) => [useTopicServiceGetApiTopicGetRecentTopicsKey, ...(queryKey ?? [{ groupId, page, pageSize, search }])];
export type UserServiceGetApiUserGetByIdByIdDefaultResponse = Awaited<ReturnType<typeof UserService.getApiUserGetByIdById>>;
export type UserServiceGetApiUserGetByIdByIdQueryResult<TData = UserServiceGetApiUserGetByIdByIdDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useUserServiceGetApiUserGetByIdByIdKey = "UserServiceGetApiUserGetByIdById";
export const UseUserServiceGetApiUserGetByIdByIdKeyFn = ({ id }: {
  id: string;
}, queryKey?: Array<unknown>) => [useUserServiceGetApiUserGetByIdByIdKey, ...(queryKey ?? [{ id }])];
export type UserServiceGetApiUserGetMeDefaultResponse = Awaited<ReturnType<typeof UserService.getApiUserGetMe>>;
export type UserServiceGetApiUserGetMeQueryResult<TData = UserServiceGetApiUserGetMeDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useUserServiceGetApiUserGetMeKey = "UserServiceGetApiUserGetMe";
export const UseUserServiceGetApiUserGetMeKeyFn = (queryKey?: Array<unknown>) => [useUserServiceGetApiUserGetMeKey, ...(queryKey ?? [])];
export type UserServiceGetApiUserGetUsersDefaultResponse = Awaited<ReturnType<typeof UserService.getApiUserGetUsers>>;
export type UserServiceGetApiUserGetUsersQueryResult<TData = UserServiceGetApiUserGetUsersDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useUserServiceGetApiUserGetUsersKey = "UserServiceGetApiUserGetUsers";
export const UseUserServiceGetApiUserGetUsersKeyFn = ({ page, pageSize, search }: {
  page?: number;
  pageSize?: number;
  search?: string;
} = {}, queryKey?: Array<unknown>) => [useUserServiceGetApiUserGetUsersKey, ...(queryKey ?? [{ page, pageSize, search }])];
export type AuthorizationServicePostApiAuthorizationLoginMutationResult = Awaited<ReturnType<typeof AuthorizationService.postApiAuthorizationLogin>>;
export type AuthorizationServicePostApiAuthorizationRegisterMutationResult = Awaited<ReturnType<typeof AuthorizationService.postApiAuthorizationRegister>>;
export type AuthorizationServicePostApiAuthorizationRequestResetMutationResult = Awaited<ReturnType<typeof AuthorizationService.postApiAuthorizationRequestReset>>;
export type AuthorizationServicePostApiAuthorizationResetPasswordMutationResult = Awaited<ReturnType<typeof AuthorizationService.postApiAuthorizationResetPassword>>;
export type AuthorizationServicePostApiAuthorizationRefreshTokenMutationResult = Awaited<ReturnType<typeof AuthorizationService.postApiAuthorizationRefreshToken>>;
export type ContactFormServicePostApiContactFormAddContactFormMutationResult = Awaited<ReturnType<typeof ContactFormService.postApiContactFormAddContactForm>>;
export type GroupServicePostApiGroupAddGroupMutationResult = Awaited<ReturnType<typeof GroupService.postApiGroupAddGroup>>;
export type GroupServicePostApiGroupJoinGroupMutationResult = Awaited<ReturnType<typeof GroupService.postApiGroupJoinGroup>>;
export type MessageFilesServicePostApiMessageFilesAddFilesTopicMessageMutationResult = Awaited<ReturnType<typeof MessageFilesService.postApiMessageFilesAddFilesTopicMessage>>;
export type TopicServicePostApiTopicAddTopicMutationResult = Awaited<ReturnType<typeof TopicService.postApiTopicAddTopic>>;
export type UserServicePostApiUserLogoutMutationResult = Awaited<ReturnType<typeof UserService.postApiUserLogout>>;
export type ContactFormServicePutApiContactFormUpdateContactFormMutationResult = Awaited<ReturnType<typeof ContactFormService.putApiContactFormUpdateContactForm>>;
export type GroupServicePutApiGroupLeaveGroupMutationResult = Awaited<ReturnType<typeof GroupService.putApiGroupLeaveGroup>>;
export type GroupServicePutApiGroupChangeRoleMutationResult = Awaited<ReturnType<typeof GroupService.putApiGroupChangeRole>>;
export type GroupServicePutApiGroupRemoveMemberMutationResult = Awaited<ReturnType<typeof GroupService.putApiGroupRemoveMember>>;
export type GroupServicePutApiGroupUpdateGroupNameMutationResult = Awaited<ReturnType<typeof GroupService.putApiGroupUpdateGroupName>>;
export type UserServicePutApiUserUpdateMutationResult = Awaited<ReturnType<typeof UserService.putApiUserUpdate>>;
export type UserServicePutApiUserMakeStaffMutationResult = Awaited<ReturnType<typeof UserService.putApiUserMakeStaff>>;
export type UserServicePutApiUserRemoveStaffMutationResult = Awaited<ReturnType<typeof UserService.putApiUserRemoveStaff>>;
export type GroupServiceDeleteApiGroupDeleteGroupMutationResult = Awaited<ReturnType<typeof GroupService.deleteApiGroupDeleteGroup>>;
export type TopicServiceDeleteApiTopicDeleteTopicMutationResult = Awaited<ReturnType<typeof TopicService.deleteApiTopicDeleteTopic>>;
