// generated with @7nohe/openapi-react-query-codegen@1.3.0 

import { UseQueryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { GroupService, TopicService, UserService } from "../requests/services.gen";
import * as Common from "./common";
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
* @param data The data for the request.
* @param data.search
* @param data.page
* @param data.pageSize
* @returns UserDTOPagedResponseRequestResponse Success
* @throws ApiError
*/
export const useUserServiceGetApiUserGetPageSuspense = <TData = Common.UserServiceGetApiUserGetPageDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ page, pageSize, search }: {
  page?: number;
  pageSize?: number;
  search?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseUserServiceGetApiUserGetPageKeyFn({ page, pageSize, search }, queryKey), queryFn: () => UserService.getApiUserGetPage({ page, pageSize, search }) as TData, ...options });
