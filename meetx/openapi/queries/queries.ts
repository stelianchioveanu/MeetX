// generated with @7nohe/openapi-react-query-codegen@1.4.0 

import { UseMutationOptions, UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { AuthorizationService, GroupService, MessageFilesService, MessageService, PrivateConversationService, TopicService, UserService } from "../requests/services.gen";
import { ChangeRoleDTO, GroupAddDTO, JoinGroupDTO, LeaveGroupDTO, LoginDTO, MessageDeleteDTO, RegisterDTO, RemoveMemberDTO, RequestResetDTO, ResetPasswordDTO, TopicAddDTO, TopicDeleteDTO, UserAddDTO, UserUpdateDTO } from "../requests/types.gen";
import * as Common from "./common";
/**
* @param data The data for the request.
* @param data.search
* @param data.page
* @param data.pageSize
* @returns GroupDTOPagedResponseRequestResponse Success
* @throws ApiError
*/
export const useGroupServiceGetApiGroupGetGroups = <TData = Common.GroupServiceGetApiGroupGetGroupsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ page, pageSize, search }: {
  page?: number;
  pageSize?: number;
  search?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseGroupServiceGetApiGroupGetGroupsKeyFn({ page, pageSize, search }, queryKey), queryFn: () => GroupService.getApiGroupGetGroups({ page, pageSize, search }) as TData, ...options });
/**
* @param data The data for the request.
* @param data.id
* @returns GroupLinkResponseRequestResponse Success
* @throws ApiError
*/
export const useGroupServiceGetApiGroupGetInviteLink = <TData = Common.GroupServiceGetApiGroupGetInviteLinkDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ id }: {
  id?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseGroupServiceGetApiGroupGetInviteLinkKeyFn({ id }, queryKey), queryFn: () => GroupService.getApiGroupGetInviteLink({ id }) as TData, ...options });
/**
* @param data The data for the request.
* @param data.search
* @param data.page
* @param data.pageSize
* @param data.groupId
* @returns GroupMemberDTOPagedResponseRequestResponse Success
* @throws ApiError
*/
export const useGroupServiceGetApiGroupGetGroupMembers = <TData = Common.GroupServiceGetApiGroupGetGroupMembersDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ groupId, page, pageSize, search }: {
  groupId?: string;
  page?: number;
  pageSize?: number;
  search?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseGroupServiceGetApiGroupGetGroupMembersKeyFn({ groupId, page, pageSize, search }, queryKey), queryFn: () => GroupService.getApiGroupGetGroupMembers({ groupId, page, pageSize, search }) as TData, ...options });
/**
* @param data The data for the request.
* @param data.groupId
* @returns GroupGetDTORequestResponse Success
* @throws ApiError
*/
export const useGroupServiceGetApiGroupGetGroup = <TData = Common.GroupServiceGetApiGroupGetGroupDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ groupId }: {
  groupId?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseGroupServiceGetApiGroupGetGroupKeyFn({ groupId }, queryKey), queryFn: () => GroupService.getApiGroupGetGroup({ groupId }) as TData, ...options });
/**
* @param data The data for the request.
* @param data.groupId
* @returns GroupDetailsDTORequestResponse Success
* @throws ApiError
*/
export const useGroupServiceGetApiGroupGetGroupDetails = <TData = Common.GroupServiceGetApiGroupGetGroupDetailsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ groupId }: {
  groupId?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseGroupServiceGetApiGroupGetGroupDetailsKeyFn({ groupId }, queryKey), queryFn: () => GroupService.getApiGroupGetGroupDetails({ groupId }) as TData, ...options });
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
export const useMessageServiceGetApiMessageGetTopicMessages = <TData = Common.MessageServiceGetApiMessageGetTopicMessagesDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ convId, groupId, lastMessageId, page, pageSize, search, topicId }: {
  convId?: string;
  groupId?: string;
  lastMessageId?: string;
  page?: number;
  pageSize?: number;
  search?: string;
  topicId?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseMessageServiceGetApiMessageGetTopicMessagesKeyFn({ convId, groupId, lastMessageId, page, pageSize, search, topicId }, queryKey), queryFn: () => MessageService.getApiMessageGetTopicMessages({ convId, groupId, lastMessageId, page, pageSize, search, topicId }) as TData, ...options });
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
export const useMessageServiceGetApiMessageGetPrivateMessages = <TData = Common.MessageServiceGetApiMessageGetPrivateMessagesDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ convId, groupId, lastMessageId, page, pageSize, search, topicId }: {
  convId?: string;
  groupId?: string;
  lastMessageId?: string;
  page?: number;
  pageSize?: number;
  search?: string;
  topicId?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseMessageServiceGetApiMessageGetPrivateMessagesKeyFn({ convId, groupId, lastMessageId, page, pageSize, search, topicId }, queryKey), queryFn: () => MessageService.getApiMessageGetPrivateMessages({ convId, groupId, lastMessageId, page, pageSize, search, topicId }) as TData, ...options });
/**
* @param data The data for the request.
* @param data.search
* @param data.page
* @param data.pageSize
* @returns PrivateConversationDTOPagedResponseRequestResponse Success
* @throws ApiError
*/
export const usePrivateConversationServiceGetApiPrivateConversationGetPrivateConversations = <TData = Common.PrivateConversationServiceGetApiPrivateConversationGetPrivateConversationsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ page, pageSize, search }: {
  page?: number;
  pageSize?: number;
  search?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UsePrivateConversationServiceGetApiPrivateConversationGetPrivateConversationsKeyFn({ page, pageSize, search }, queryKey), queryFn: () => PrivateConversationService.getApiPrivateConversationGetPrivateConversations({ page, pageSize, search }) as TData, ...options });
/**
* @param data The data for the request.
* @param data.convId
* @returns PrivateConversationDTORequestResponse Success
* @throws ApiError
*/
export const usePrivateConversationServiceGetApiPrivateConversationGetPrivateConversation = <TData = Common.PrivateConversationServiceGetApiPrivateConversationGetPrivateConversationDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ convId }: {
  convId?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UsePrivateConversationServiceGetApiPrivateConversationGetPrivateConversationKeyFn({ convId }, queryKey), queryFn: () => PrivateConversationService.getApiPrivateConversationGetPrivateConversation({ convId }) as TData, ...options });
/**
* @param data The data for the request.
* @param data.groupId
* @param data.topicId
* @returns TopicDTORequestResponse Success
* @throws ApiError
*/
export const useTopicServiceGetApiTopicGetTopic = <TData = Common.TopicServiceGetApiTopicGetTopicDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ groupId, topicId }: {
  groupId?: string;
  topicId?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseTopicServiceGetApiTopicGetTopicKeyFn({ groupId, topicId }, queryKey), queryFn: () => TopicService.getApiTopicGetTopic({ groupId, topicId }) as TData, ...options });
/**
* @param data The data for the request.
* @param data.search
* @param data.page
* @param data.pageSize
* @param data.groupId
* @returns TopicDTOPagedResponseRequestResponse Success
* @throws ApiError
*/
export const useTopicServiceGetApiTopicGetTopics = <TData = Common.TopicServiceGetApiTopicGetTopicsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ groupId, page, pageSize, search }: {
  groupId?: string;
  page?: number;
  pageSize?: number;
  search?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseTopicServiceGetApiTopicGetTopicsKeyFn({ groupId, page, pageSize, search }, queryKey), queryFn: () => TopicService.getApiTopicGetTopics({ groupId, page, pageSize, search }) as TData, ...options });
/**
* @param data The data for the request.
* @param data.search
* @param data.page
* @param data.pageSize
* @param data.groupId
* @returns TopicDTOPagedResponseRequestResponse Success
* @throws ApiError
*/
export const useTopicServiceGetApiTopicGetMyTopics = <TData = Common.TopicServiceGetApiTopicGetMyTopicsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ groupId, page, pageSize, search }: {
  groupId?: string;
  page?: number;
  pageSize?: number;
  search?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseTopicServiceGetApiTopicGetMyTopicsKeyFn({ groupId, page, pageSize, search }, queryKey), queryFn: () => TopicService.getApiTopicGetMyTopics({ groupId, page, pageSize, search }) as TData, ...options });
/**
* @param data The data for the request.
* @param data.search
* @param data.page
* @param data.pageSize
* @param data.groupId
* @returns TopicDTOPagedResponseRequestResponse Success
* @throws ApiError
*/
export const useTopicServiceGetApiTopicGetRecentTopics = <TData = Common.TopicServiceGetApiTopicGetRecentTopicsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ groupId, page, pageSize, search }: {
  groupId?: string;
  page?: number;
  pageSize?: number;
  search?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseTopicServiceGetApiTopicGetRecentTopicsKeyFn({ groupId, page, pageSize, search }, queryKey), queryFn: () => TopicService.getApiTopicGetRecentTopics({ groupId, page, pageSize, search }) as TData, ...options });
/**
* @param data The data for the request.
* @param data.id
* @returns UserDTORequestResponse Success
* @throws ApiError
*/
export const useUserServiceGetApiUserGetByIdById = <TData = Common.UserServiceGetApiUserGetByIdByIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ id }: {
  id: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseUserServiceGetApiUserGetByIdByIdKeyFn({ id }, queryKey), queryFn: () => UserService.getApiUserGetByIdById({ id }) as TData, ...options });
/**
* @param data The data for the request.
* @param data.search
* @param data.page
* @param data.pageSize
* @returns UserDTOPagedResponseRequestResponse Success
* @throws ApiError
*/
export const useUserServiceGetApiUserGetPage = <TData = Common.UserServiceGetApiUserGetPageDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ page, pageSize, search }: {
  page?: number;
  pageSize?: number;
  search?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseUserServiceGetApiUserGetPageKeyFn({ page, pageSize, search }, queryKey), queryFn: () => UserService.getApiUserGetPage({ page, pageSize, search }) as TData, ...options });
/**
* @param data The data for the request.
* @param data.requestBody
* @returns LoginResponseDTORequestResponse Success
* @throws ApiError
*/
export const useAuthorizationServicePostApiAuthorizationLogin = <TData = Common.AuthorizationServicePostApiAuthorizationLoginMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody?: LoginDTO;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody?: LoginDTO;
}, TContext>({ mutationFn: ({ requestBody }) => AuthorizationService.postApiAuthorizationLogin({ requestBody }) as unknown as Promise<TData>, ...options });
/**
* @param data The data for the request.
* @param data.requestBody
* @returns RequestResponse Success
* @throws ApiError
*/
export const useAuthorizationServicePostApiAuthorizationRegister = <TData = Common.AuthorizationServicePostApiAuthorizationRegisterMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody?: RegisterDTO;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody?: RegisterDTO;
}, TContext>({ mutationFn: ({ requestBody }) => AuthorizationService.postApiAuthorizationRegister({ requestBody }) as unknown as Promise<TData>, ...options });
/**
* @param data The data for the request.
* @param data.requestBody
* @returns RequestResponse Success
* @throws ApiError
*/
export const useAuthorizationServicePostApiAuthorizationRequestReset = <TData = Common.AuthorizationServicePostApiAuthorizationRequestResetMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody?: RequestResetDTO;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody?: RequestResetDTO;
}, TContext>({ mutationFn: ({ requestBody }) => AuthorizationService.postApiAuthorizationRequestReset({ requestBody }) as unknown as Promise<TData>, ...options });
/**
* @param data The data for the request.
* @param data.requestBody
* @returns RequestResponse Success
* @throws ApiError
*/
export const useAuthorizationServicePostApiAuthorizationResetPassword = <TData = Common.AuthorizationServicePostApiAuthorizationResetPasswordMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody?: ResetPasswordDTO;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody?: ResetPasswordDTO;
}, TContext>({ mutationFn: ({ requestBody }) => AuthorizationService.postApiAuthorizationResetPassword({ requestBody }) as unknown as Promise<TData>, ...options });
/**
* @returns RefreshResponseDTORequestResponse Success
* @throws ApiError
*/
export const useAuthorizationServicePostApiAuthorizationRefreshToken = <TData = Common.AuthorizationServicePostApiAuthorizationRefreshTokenMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, void, TContext>, "mutationFn">) => useMutation<TData, TError, void, TContext>({ mutationFn: () => AuthorizationService.postApiAuthorizationRefreshToken() as unknown as Promise<TData>, ...options });
/**
* @param data The data for the request.
* @param data.requestBody
* @returns RequestResponse Success
* @throws ApiError
*/
export const useGroupServicePostApiGroupAddGroup = <TData = Common.GroupServicePostApiGroupAddGroupMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody?: GroupAddDTO;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody?: GroupAddDTO;
}, TContext>({ mutationFn: ({ requestBody }) => GroupService.postApiGroupAddGroup({ requestBody }) as unknown as Promise<TData>, ...options });
/**
* @param data The data for the request.
* @param data.requestBody
* @returns RequestResponse Success
* @throws ApiError
*/
export const useGroupServicePostApiGroupJoinGroup = <TData = Common.GroupServicePostApiGroupJoinGroupMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody?: JoinGroupDTO;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody?: JoinGroupDTO;
}, TContext>({ mutationFn: ({ requestBody }) => GroupService.postApiGroupJoinGroup({ requestBody }) as unknown as Promise<TData>, ...options });
/**
* @param data The data for the request.
* @param data.formData
* @returns FilesAddedDTORequestResponse Success
* @throws ApiError
*/
export const useMessageFilesServicePostApiMessageFilesAddFilesTopicMessage = <TData = Common.MessageFilesServicePostApiMessageFilesAddFilesTopicMessageMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  formData?: { Images?: (Blob | File)[]; Files?: (Blob | File)[]; TopicId?: string; PrivateConversationId?: string; };
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  formData?: { Images?: (Blob | File)[]; Files?: (Blob | File)[]; TopicId?: string; PrivateConversationId?: string; };
}, TContext>({ mutationFn: ({ formData }) => MessageFilesService.postApiMessageFilesAddFilesTopicMessage({ formData }) as unknown as Promise<TData>, ...options });
/**
* @param data The data for the request.
* @param data.requestBody
* @returns RequestResponse Success
* @throws ApiError
*/
export const useTopicServicePostApiTopicAddTopic = <TData = Common.TopicServicePostApiTopicAddTopicMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody?: TopicAddDTO;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody?: TopicAddDTO;
}, TContext>({ mutationFn: ({ requestBody }) => TopicService.postApiTopicAddTopic({ requestBody }) as unknown as Promise<TData>, ...options });
/**
* @param data The data for the request.
* @param data.requestBody
* @returns RequestResponse Success
* @throws ApiError
*/
export const useUserServicePostApiUserAdd = <TData = Common.UserServicePostApiUserAddMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody?: UserAddDTO;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody?: UserAddDTO;
}, TContext>({ mutationFn: ({ requestBody }) => UserService.postApiUserAdd({ requestBody }) as unknown as Promise<TData>, ...options });
/**
* @param data The data for the request.
* @param data.requestBody
* @returns RequestResponse Success
* @throws ApiError
*/
export const useGroupServicePutApiGroupLeaveGroup = <TData = Common.GroupServicePutApiGroupLeaveGroupMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody?: LeaveGroupDTO;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody?: LeaveGroupDTO;
}, TContext>({ mutationFn: ({ requestBody }) => GroupService.putApiGroupLeaveGroup({ requestBody }) as unknown as Promise<TData>, ...options });
/**
* @param data The data for the request.
* @param data.requestBody
* @returns RequestResponse Success
* @throws ApiError
*/
export const useGroupServicePutApiGroupChangeRole = <TData = Common.GroupServicePutApiGroupChangeRoleMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody?: ChangeRoleDTO;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody?: ChangeRoleDTO;
}, TContext>({ mutationFn: ({ requestBody }) => GroupService.putApiGroupChangeRole({ requestBody }) as unknown as Promise<TData>, ...options });
/**
* @param data The data for the request.
* @param data.requestBody
* @returns RequestResponse Success
* @throws ApiError
*/
export const useGroupServicePutApiGroupRemoveMember = <TData = Common.GroupServicePutApiGroupRemoveMemberMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody?: RemoveMemberDTO;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody?: RemoveMemberDTO;
}, TContext>({ mutationFn: ({ requestBody }) => GroupService.putApiGroupRemoveMember({ requestBody }) as unknown as Promise<TData>, ...options });
/**
* @param data The data for the request.
* @param data.requestBody
* @returns RequestResponse Success
* @throws ApiError
*/
export const useUserServicePutApiUserUpdate = <TData = Common.UserServicePutApiUserUpdateMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody?: UserUpdateDTO;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody?: UserUpdateDTO;
}, TContext>({ mutationFn: ({ requestBody }) => UserService.putApiUserUpdate({ requestBody }) as unknown as Promise<TData>, ...options });
/**
* @param data The data for the request.
* @param data.requestBody
* @returns RequestResponse Success
* @throws ApiError
*/
export const useGroupServiceDeleteApiGroupDeleteGroup = <TData = Common.GroupServiceDeleteApiGroupDeleteGroupMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody?: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody?: string;
}, TContext>({ mutationFn: ({ requestBody }) => GroupService.deleteApiGroupDeleteGroup({ requestBody }) as unknown as Promise<TData>, ...options });
/**
* @param data The data for the request.
* @param data.requestBody
* @returns RequestResponse Success
* @throws ApiError
*/
export const useMessageServiceDeleteApiMessageDeleteMessage = <TData = Common.MessageServiceDeleteApiMessageDeleteMessageMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody?: MessageDeleteDTO;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody?: MessageDeleteDTO;
}, TContext>({ mutationFn: ({ requestBody }) => MessageService.deleteApiMessageDeleteMessage({ requestBody }) as unknown as Promise<TData>, ...options });
/**
* @param data The data for the request.
* @param data.requestBody
* @returns RequestResponse Success
* @throws ApiError
*/
export const useTopicServiceDeleteApiTopicDeleteTopic = <TData = Common.TopicServiceDeleteApiTopicDeleteTopicMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody?: TopicDeleteDTO;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody?: TopicDeleteDTO;
}, TContext>({ mutationFn: ({ requestBody }) => TopicService.deleteApiTopicDeleteTopic({ requestBody }) as unknown as Promise<TData>, ...options });
