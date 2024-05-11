// This file is auto-generated by @hey-api/openapi-ts

export type ChangeRoleDTO = {
    userId?: string;
    groupId?: string;
    role?: GroupRoleEnum;
};

export type ErrorCodes = 'Unknown' | 'TechnicalError' | 'EntityNotFound' | 'PhysicalFileNotFound' | 'UserAlreadyExists' | 'WrongPassword' | 'CannotAdd' | 'CannotUpdate' | 'CannotDelete' | 'MailSendFailed' | 'TagAlreadyExists' | 'WrongTag' | 'WrongInputs' | 'TokenExpired' | 'GroupAlreadyExists' | 'NotAnAdmin' | 'NotAMember';

export type ErrorMessage = {
    message?: string | null;
    code?: ErrorCodes;
    status?: HttpStatusCode;
};

export type GroupAddDTO = {
    name?: string | null;
};

export type GroupDTO = {
    id?: string;
    name?: string | null;
    numberMembers?: number;
    shortName?: string | null;
    color?: string | null;
};

export type GroupDTOPagedResponse = {
    page?: number;
    pageSize?: number;
    totalCount?: number;
    data?: Array<GroupDTO> | null;
};

export type GroupDTOPagedResponseRequestResponse = {
    response?: GroupDTOPagedResponse;
    errorMessage?: ErrorMessage;
};

export type GroupGetDTO = {
    group?: GroupDTO;
    groupRole?: GroupRoleEnum;
};

export type GroupGetDTORequestResponse = {
    response?: GroupGetDTO;
    errorMessage?: ErrorMessage;
};

export type GroupLinkResponse = {
    link?: string | null;
};

export type GroupLinkResponseRequestResponse = {
    response?: GroupLinkResponse;
    errorMessage?: ErrorMessage;
};

export type GroupMemberDTO = {
    id?: string;
    name?: string | null;
    email?: string | null;
    groupRole?: GroupRoleEnum;
};

export type GroupMemberDTOPagedResponse = {
    page?: number;
    pageSize?: number;
    totalCount?: number;
    data?: Array<GroupMemberDTO> | null;
};

export type GroupMemberDTOPagedResponseRequestResponse = {
    response?: GroupMemberDTOPagedResponse;
    errorMessage?: ErrorMessage;
};

export type GroupRoleEnum = 'Admin' | 'Member';

export type HttpStatusCode = 'Continue' | 'SwitchingProtocols' | 'Processing' | 'EarlyHints' | 'OK' | 'Created' | 'Accepted' | 'NonAuthoritativeInformation' | 'NoContent' | 'ResetContent' | 'PartialContent' | 'MultiStatus' | 'AlreadyReported' | 'IMUsed' | 'MultipleChoices' | 'MovedPermanently' | 'Found' | 'SeeOther' | 'NotModified' | 'UseProxy' | 'Unused' | 'TemporaryRedirect' | 'PermanentRedirect' | 'BadRequest' | 'Unauthorized' | 'PaymentRequired' | 'Forbidden' | 'NotFound' | 'MethodNotAllowed' | 'NotAcceptable' | 'ProxyAuthenticationRequired' | 'RequestTimeout' | 'Conflict' | 'Gone' | 'LengthRequired' | 'PreconditionFailed' | 'RequestEntityTooLarge' | 'RequestUriTooLong' | 'UnsupportedMediaType' | 'RequestedRangeNotSatisfiable' | 'ExpectationFailed' | 'MisdirectedRequest' | 'UnprocessableEntity' | 'Locked' | 'FailedDependency' | 'UpgradeRequired' | 'PreconditionRequired' | 'TooManyRequests' | 'RequestHeaderFieldsTooLarge' | 'UnavailableForLegalReasons' | 'InternalServerError' | 'NotImplemented' | 'BadGateway' | 'ServiceUnavailable' | 'GatewayTimeout' | 'HttpVersionNotSupported' | 'VariantAlsoNegotiates' | 'InsufficientStorage' | 'LoopDetected' | 'NotExtended' | 'NetworkAuthenticationRequired';

export type JoinGroupDTO = {
    groupId?: string;
    token?: string | null;
};

export type LeaveGroupDTO = {
    groupId?: string;
};

export type LoginDTO = {
    email?: string | null;
    password?: string | null;
};

export type LoginResponseDTO = {
    token?: string | null;
    user?: UserDTO;
};

export type LoginResponseDTORequestResponse = {
    response?: LoginResponseDTO;
    errorMessage?: ErrorMessage;
};

export type RefreshResponseDTO = {
    token?: string | null;
};

export type RefreshResponseDTORequestResponse = {
    response?: RefreshResponseDTO;
    errorMessage?: ErrorMessage;
};

export type RegisterDTO = {
    name?: string | null;
    email?: string | null;
    password?: string | null;
};

export type RemoveMemberDTO = {
    userId?: string;
    groupId?: string;
};

export type RequestResetDTO = {
    email?: string | null;
};

export type RequestResponse = {
    readonly response?: string | null;
    errorMessage?: ErrorMessage;
};

export type ResetPasswordDTO = {
    token?: string | null;
    id?: string;
    password?: string | null;
};

export type TopicAddDTO = {
    groupId?: string;
    title?: string | null;
    description?: string | null;
};

export type TopicDTO = {
    id?: string;
    title?: string | null;
    description?: string | null;
    createdDate?: string;
    user?: UserDTO;
    numberAnswers?: number;
};

export type TopicDTOPagedResponse = {
    page?: number;
    pageSize?: number;
    totalCount?: number;
    data?: Array<TopicDTO> | null;
};

export type TopicDTOPagedResponseRequestResponse = {
    response?: TopicDTOPagedResponse;
    errorMessage?: ErrorMessage;
};

export type TopicDTORequestResponse = {
    response?: TopicDTO;
    errorMessage?: ErrorMessage;
};

export type TopicDeleteDTO = {
    groupId?: string;
    topicId?: string;
};

export type UserAddDTO = {
    name?: string | null;
    email?: string | null;
    password?: string | null;
    role?: UserRoleEnum;
};

export type UserDTO = {
    id?: string;
    name?: string | null;
    email?: string | null;
    role?: UserRoleEnum;
};

export type UserDTOPagedResponse = {
    page?: number;
    pageSize?: number;
    totalCount?: number;
    data?: Array<UserDTO> | null;
};

export type UserDTOPagedResponseRequestResponse = {
    response?: UserDTOPagedResponse;
    errorMessage?: ErrorMessage;
};

export type UserDTORequestResponse = {
    response?: UserDTO;
    errorMessage?: ErrorMessage;
};

export type UserRoleEnum = 'Admin' | 'Personnel' | 'Client';

export type UserUpdateDTO = {
    id?: string;
    name?: string | null;
    password?: string | null;
};

export type PostApiAuthorizationLoginData = {
    requestBody?: LoginDTO;
};

export type PostApiAuthorizationLoginResponse = LoginResponseDTORequestResponse;

export type PostApiAuthorizationRegisterData = {
    requestBody?: RegisterDTO;
};

export type PostApiAuthorizationRegisterResponse = RequestResponse;

export type PostApiAuthorizationRequestResetData = {
    requestBody?: RequestResetDTO;
};

export type PostApiAuthorizationRequestResetResponse = RequestResponse;

export type PostApiAuthorizationResetPasswordData = {
    requestBody?: ResetPasswordDTO;
};

export type PostApiAuthorizationResetPasswordResponse = RequestResponse;

export type PostApiAuthorizationRefreshTokenResponse = RefreshResponseDTORequestResponse;

export type PostApiGroupAddGroupData = {
    requestBody?: GroupAddDTO;
};

export type PostApiGroupAddGroupResponse = RequestResponse;

export type GetApiGroupGetGroupsData = {
    page?: number;
    pageSize?: number;
    search?: string;
};

export type GetApiGroupGetGroupsResponse = GroupDTOPagedResponseRequestResponse;

export type GetApiGroupGetInviteLinkData = {
    id?: string;
};

export type GetApiGroupGetInviteLinkResponse = GroupLinkResponseRequestResponse;

export type PostApiGroupJoinGroupData = {
    requestBody?: JoinGroupDTO;
};

export type PostApiGroupJoinGroupResponse = RequestResponse;

export type PutApiGroupLeaveGroupData = {
    requestBody?: LeaveGroupDTO;
};

export type PutApiGroupLeaveGroupResponse = RequestResponse;

export type PutApiGroupChangeRoleData = {
    requestBody?: ChangeRoleDTO;
};

export type PutApiGroupChangeRoleResponse = RequestResponse;

export type GetApiGroupGetGroupMembersData = {
    groupId?: string;
    page?: number;
    pageSize?: number;
    search?: string;
};

export type GetApiGroupGetGroupMembersResponse = GroupMemberDTOPagedResponseRequestResponse;

export type GetApiGroupGetGroupData = {
    groupId?: string;
};

export type GetApiGroupGetGroupResponse = GroupGetDTORequestResponse;

export type PutApiGroupRemoveMemberData = {
    requestBody?: RemoveMemberDTO;
};

export type PutApiGroupRemoveMemberResponse = RequestResponse;

export type DeleteApiGroupDeleteGroupData = {
    requestBody?: string;
};

export type DeleteApiGroupDeleteGroupResponse = RequestResponse;

export type PostApiTopicAddTopicData = {
    requestBody?: TopicAddDTO;
};

export type PostApiTopicAddTopicResponse = RequestResponse;

export type GetApiTopicGetTopicData = {
    groupId?: string;
    topicId?: string;
};

export type GetApiTopicGetTopicResponse = TopicDTORequestResponse;

export type GetApiTopicGetTopicsData = {
    groupId?: string;
    page?: number;
    pageSize?: number;
    search?: string;
};

export type GetApiTopicGetTopicsResponse = TopicDTOPagedResponseRequestResponse;

export type GetApiTopicGetMyTopicsData = {
    groupId?: string;
    page?: number;
    pageSize?: number;
    search?: string;
};

export type GetApiTopicGetMyTopicsResponse = TopicDTOPagedResponseRequestResponse;

export type GetApiTopicGetRecentTopicsData = {
    groupId?: string;
    page?: number;
    pageSize?: number;
    search?: string;
};

export type GetApiTopicGetRecentTopicsResponse = TopicDTOPagedResponseRequestResponse;

export type DeleteApiTopicDeleteTopicData = {
    requestBody?: TopicDeleteDTO;
};

export type DeleteApiTopicDeleteTopicResponse = RequestResponse;

export type GetApiUserGetByIdByIdData = {
    id: string;
};

export type GetApiUserGetByIdByIdResponse = UserDTORequestResponse;

export type GetApiUserGetPageData = {
    page?: number;
    pageSize?: number;
    search?: string;
};

export type GetApiUserGetPageResponse = UserDTOPagedResponseRequestResponse;

export type PostApiUserAddData = {
    requestBody?: UserAddDTO;
};

export type PostApiUserAddResponse = RequestResponse;

export type PutApiUserUpdateData = {
    requestBody?: UserUpdateDTO;
};

export type PutApiUserUpdateResponse = RequestResponse;

export type $OpenApiTs = {
    '/api/Authorization/Login': {
        post: {
            req: {
                requestBody?: LoginDTO;
            };
            res: {
                /**
                 * Success
                 */
                200: LoginResponseDTORequestResponse;
            };
        };
    };
    '/api/Authorization/Register': {
        post: {
            req: {
                requestBody?: RegisterDTO;
            };
            res: {
                /**
                 * Success
                 */
                200: RequestResponse;
            };
        };
    };
    '/api/Authorization/RequestReset': {
        post: {
            req: {
                requestBody?: RequestResetDTO;
            };
            res: {
                /**
                 * Success
                 */
                200: RequestResponse;
            };
        };
    };
    '/api/Authorization/ResetPassword': {
        post: {
            req: {
                requestBody?: ResetPasswordDTO;
            };
            res: {
                /**
                 * Success
                 */
                200: RequestResponse;
            };
        };
    };
    '/api/Authorization/RefreshToken': {
        post: {
            res: {
                /**
                 * Success
                 */
                200: RefreshResponseDTORequestResponse;
            };
        };
    };
    '/api/Group/AddGroup': {
        post: {
            req: {
                requestBody?: GroupAddDTO;
            };
            res: {
                /**
                 * Success
                 */
                200: RequestResponse;
            };
        };
    };
    '/api/Group/GetGroups': {
        get: {
            req: {
                page?: number;
                pageSize?: number;
                search?: string;
            };
            res: {
                /**
                 * Success
                 */
                200: GroupDTOPagedResponseRequestResponse;
            };
        };
    };
    '/api/Group/GetInviteLink': {
        get: {
            req: {
                id?: string;
            };
            res: {
                /**
                 * Success
                 */
                200: GroupLinkResponseRequestResponse;
            };
        };
    };
    '/api/Group/JoinGroup': {
        post: {
            req: {
                requestBody?: JoinGroupDTO;
            };
            res: {
                /**
                 * Success
                 */
                200: RequestResponse;
            };
        };
    };
    '/api/Group/LeaveGroup': {
        put: {
            req: {
                requestBody?: LeaveGroupDTO;
            };
            res: {
                /**
                 * Success
                 */
                200: RequestResponse;
            };
        };
    };
    '/api/Group/ChangeRole': {
        put: {
            req: {
                requestBody?: ChangeRoleDTO;
            };
            res: {
                /**
                 * Success
                 */
                200: RequestResponse;
            };
        };
    };
    '/api/Group/GetGroupMembers': {
        get: {
            req: {
                groupId?: string;
                page?: number;
                pageSize?: number;
                search?: string;
            };
            res: {
                /**
                 * Success
                 */
                200: GroupMemberDTOPagedResponseRequestResponse;
            };
        };
    };
    '/api/Group/GetGroup': {
        get: {
            req: {
                groupId?: string;
            };
            res: {
                /**
                 * Success
                 */
                200: GroupGetDTORequestResponse;
            };
        };
    };
    '/api/Group/RemoveMember': {
        put: {
            req: {
                requestBody?: RemoveMemberDTO;
            };
            res: {
                /**
                 * Success
                 */
                200: RequestResponse;
            };
        };
    };
    '/api/Group/DeleteGroup': {
        delete: {
            req: {
                requestBody?: string;
            };
            res: {
                /**
                 * Success
                 */
                200: RequestResponse;
            };
        };
    };
    '/api/Topic/AddTopic': {
        post: {
            req: {
                requestBody?: TopicAddDTO;
            };
            res: {
                /**
                 * Success
                 */
                200: RequestResponse;
            };
        };
    };
    '/api/Topic/GetTopic': {
        get: {
            req: {
                groupId?: string;
                topicId?: string;
            };
            res: {
                /**
                 * Success
                 */
                200: TopicDTORequestResponse;
            };
        };
    };
    '/api/Topic/GetTopics': {
        get: {
            req: {
                groupId?: string;
                page?: number;
                pageSize?: number;
                search?: string;
            };
            res: {
                /**
                 * Success
                 */
                200: TopicDTOPagedResponseRequestResponse;
            };
        };
    };
    '/api/Topic/GetMyTopics': {
        get: {
            req: {
                groupId?: string;
                page?: number;
                pageSize?: number;
                search?: string;
            };
            res: {
                /**
                 * Success
                 */
                200: TopicDTOPagedResponseRequestResponse;
            };
        };
    };
    '/api/Topic/GetRecentTopics': {
        get: {
            req: {
                groupId?: string;
                page?: number;
                pageSize?: number;
                search?: string;
            };
            res: {
                /**
                 * Success
                 */
                200: TopicDTOPagedResponseRequestResponse;
            };
        };
    };
    '/api/Topic/DeleteTopic': {
        delete: {
            req: {
                requestBody?: TopicDeleteDTO;
            };
            res: {
                /**
                 * Success
                 */
                200: RequestResponse;
            };
        };
    };
    '/api/User/GetById/{id}': {
        get: {
            req: {
                id: string;
            };
            res: {
                /**
                 * Success
                 */
                200: UserDTORequestResponse;
            };
        };
    };
    '/api/User/GetPage': {
        get: {
            req: {
                page?: number;
                pageSize?: number;
                search?: string;
            };
            res: {
                /**
                 * Success
                 */
                200: UserDTOPagedResponseRequestResponse;
            };
        };
    };
    '/api/User/Add': {
        post: {
            req: {
                requestBody?: UserAddDTO;
            };
            res: {
                /**
                 * Success
                 */
                200: RequestResponse;
            };
        };
    };
    '/api/User/Update': {
        put: {
            req: {
                requestBody?: UserUpdateDTO;
            };
            res: {
                /**
                 * Success
                 */
                200: RequestResponse;
            };
        };
    };
};