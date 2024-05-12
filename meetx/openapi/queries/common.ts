// generated with @7nohe/openapi-react-query-codegen@1.3.0 

import { UseQueryResult } from "@tanstack/react-query";
import { AuthorizationService, GroupService, MessageService, TopicService, UserService } from "../requests/services.gen";
export type GroupServiceGetApiGroupGetGroupsDefaultResponse = Awaited<ReturnType<typeof GroupService.getApiGroupGetGroups>>;
export type GroupServiceGetApiGroupGetGroupsQueryResult<TData = GroupServiceGetApiGroupGetGroupsDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useGroupServiceGetApiGroupGetGroupsKey = "GroupServiceGetApiGroupGetGroups";
export const UseGroupServiceGetApiGroupGetGroupsKeyFn = ({ page, pageSize, search }: {
  page?: number;
  pageSize?: number;
  search?: string;
} = {}, queryKey?: Array<unknown>) => [useGroupServiceGetApiGroupGetGroupsKey, ...(queryKey ?? [{ page, pageSize, search }])];
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
export type MessageServiceGetApiMessageGetMessagesDefaultResponse = Awaited<ReturnType<typeof MessageService.getApiMessageGetMessages>>;
export type MessageServiceGetApiMessageGetMessagesQueryResult<TData = MessageServiceGetApiMessageGetMessagesDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useMessageServiceGetApiMessageGetMessagesKey = "MessageServiceGetApiMessageGetMessages";
export const UseMessageServiceGetApiMessageGetMessagesKeyFn = ({ groupId, page, pageSize, search, topicId }: {
  groupId?: string;
  page?: number;
  pageSize?: number;
  search?: string;
  topicId?: string;
} = {}, queryKey?: Array<unknown>) => [useMessageServiceGetApiMessageGetMessagesKey, ...(queryKey ?? [{ groupId, page, pageSize, search, topicId }])];
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
export type UserServiceGetApiUserGetPageDefaultResponse = Awaited<ReturnType<typeof UserService.getApiUserGetPage>>;
export type UserServiceGetApiUserGetPageQueryResult<TData = UserServiceGetApiUserGetPageDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useUserServiceGetApiUserGetPageKey = "UserServiceGetApiUserGetPage";
export const UseUserServiceGetApiUserGetPageKeyFn = ({ page, pageSize, search }: {
  page?: number;
  pageSize?: number;
  search?: string;
} = {}, queryKey?: Array<unknown>) => [useUserServiceGetApiUserGetPageKey, ...(queryKey ?? [{ page, pageSize, search }])];
export type AuthorizationServicePostApiAuthorizationLoginMutationResult = Awaited<ReturnType<typeof AuthorizationService.postApiAuthorizationLogin>>;
export type AuthorizationServicePostApiAuthorizationRegisterMutationResult = Awaited<ReturnType<typeof AuthorizationService.postApiAuthorizationRegister>>;
export type AuthorizationServicePostApiAuthorizationRequestResetMutationResult = Awaited<ReturnType<typeof AuthorizationService.postApiAuthorizationRequestReset>>;
export type AuthorizationServicePostApiAuthorizationResetPasswordMutationResult = Awaited<ReturnType<typeof AuthorizationService.postApiAuthorizationResetPassword>>;
export type AuthorizationServicePostApiAuthorizationRefreshTokenMutationResult = Awaited<ReturnType<typeof AuthorizationService.postApiAuthorizationRefreshToken>>;
export type GroupServicePostApiGroupAddGroupMutationResult = Awaited<ReturnType<typeof GroupService.postApiGroupAddGroup>>;
export type GroupServicePostApiGroupJoinGroupMutationResult = Awaited<ReturnType<typeof GroupService.postApiGroupJoinGroup>>;
export type TopicServicePostApiTopicAddTopicMutationResult = Awaited<ReturnType<typeof TopicService.postApiTopicAddTopic>>;
export type UserServicePostApiUserAddMutationResult = Awaited<ReturnType<typeof UserService.postApiUserAdd>>;
export type GroupServicePutApiGroupLeaveGroupMutationResult = Awaited<ReturnType<typeof GroupService.putApiGroupLeaveGroup>>;
export type GroupServicePutApiGroupChangeRoleMutationResult = Awaited<ReturnType<typeof GroupService.putApiGroupChangeRole>>;
export type GroupServicePutApiGroupRemoveMemberMutationResult = Awaited<ReturnType<typeof GroupService.putApiGroupRemoveMember>>;
export type UserServicePutApiUserUpdateMutationResult = Awaited<ReturnType<typeof UserService.putApiUserUpdate>>;
export type GroupServiceDeleteApiGroupDeleteGroupMutationResult = Awaited<ReturnType<typeof GroupService.deleteApiGroupDeleteGroup>>;
export type MessageServiceDeleteApiMessageDeleteMessageMutationResult = Awaited<ReturnType<typeof MessageService.deleteApiMessageDeleteMessage>>;
export type TopicServiceDeleteApiTopicDeleteTopicMutationResult = Awaited<ReturnType<typeof TopicService.deleteApiTopicDeleteTopic>>;
