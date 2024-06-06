// This file is auto-generated by @hey-api/openapi-ts

export const $ChangeRoleDTO = {
    type: 'object',
    properties: {
        userId: {
            type: 'string',
            format: 'uuid'
        },
        groupId: {
            type: 'string',
            format: 'uuid'
        },
        role: {
            '$ref': '#/components/schemas/GroupRoleEnum'
        }
    },
    additionalProperties: false
} as const;

export const $ContactFormAddDTO = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            nullable: true
        },
        email: {
            type: 'string',
            nullable: true
        },
        message: {
            type: 'string',
            nullable: true
        }
    },
    additionalProperties: false
} as const;

export const $ContactFormDTO = {
    type: 'object',
    properties: {
        id: {
            type: 'string',
            format: 'uuid'
        },
        name: {
            type: 'string',
            nullable: true
        },
        email: {
            type: 'string',
            nullable: true
        },
        message: {
            type: 'string',
            nullable: true
        },
        date: {
            type: 'string',
            nullable: true
        },
        isChecked: {
            type: 'boolean'
        }
    },
    additionalProperties: false
} as const;

export const $ContactFormDTOPagedResponse = {
    type: 'object',
    properties: {
        page: {
            type: 'integer',
            format: 'int32'
        },
        pageSize: {
            type: 'integer',
            format: 'int32'
        },
        totalCount: {
            type: 'integer',
            format: 'int32'
        },
        data: {
            type: 'array',
            items: {
                '$ref': '#/components/schemas/ContactFormDTO'
            },
            nullable: true
        }
    },
    additionalProperties: false
} as const;

export const $ContactFormDTOPagedResponseRequestResponse = {
    type: 'object',
    properties: {
        response: {
            '$ref': '#/components/schemas/ContactFormDTOPagedResponse'
        },
        errorMessage: {
            '$ref': '#/components/schemas/ErrorMessage'
        }
    },
    additionalProperties: false
} as const;

export const $ContactFormUpdateDTO = {
    type: 'object',
    properties: {
        contactId: {
            type: 'string',
            format: 'uuid'
        },
        check: {
            type: 'boolean'
        }
    },
    additionalProperties: false
} as const;

export const $ErrorCodes = {
    enum: ['Unknown', 'TechnicalError', 'EntityNotFound', 'PhysicalFileNotFound', 'UserAlreadyExists', 'WrongPassword', 'CannotAdd', 'CannotUpdate', 'CannotDelete', 'MailSendFailed', 'TagAlreadyExists', 'WrongTag', 'WrongInputs', 'TokenExpired', 'GroupAlreadyExists', 'NotAnAdmin', 'NotAnAppAdmin', 'NotAMember', 'WrongName', 'WrongEmail', 'WrongIndustry', 'UserNotFound', 'BadCredentials', 'GroupNotFound', 'WrongTitle', 'WrongDescription', 'ConvNotFound', 'TopicNotFound', 'WrongMessage', 'ContactNotFound'],
    type: 'string'
} as const;

export const $ErrorMessage = {
    type: 'object',
    properties: {
        message: {
            type: 'string',
            nullable: true
        },
        code: {
            '$ref': '#/components/schemas/ErrorCodes'
        },
        status: {
            '$ref': '#/components/schemas/HttpStatusCode'
        }
    },
    additionalProperties: false
} as const;

export const $FileGetDTO = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            nullable: true
        },
        path: {
            type: 'string',
            nullable: true
        },
        type: {
            '$ref': '#/components/schemas/FileTypes'
        }
    },
    additionalProperties: false
} as const;

export const $FileTypes = {
    enum: ['File', 'Image'],
    type: 'string'
} as const;

export const $FilesAddedDTO = {
    type: 'object',
    properties: {
        files: {
            type: 'array',
            items: {
                type: 'string',
                format: 'uuid'
            },
            nullable: true
        }
    },
    additionalProperties: false
} as const;

export const $FilesAddedDTORequestResponse = {
    type: 'object',
    properties: {
        response: {
            '$ref': '#/components/schemas/FilesAddedDTO'
        },
        errorMessage: {
            '$ref': '#/components/schemas/ErrorMessage'
        }
    },
    additionalProperties: false
} as const;

export const $GroupAddDTO = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            nullable: true
        }
    },
    additionalProperties: false
} as const;

export const $GroupDTO = {
    type: 'object',
    properties: {
        id: {
            type: 'string',
            format: 'uuid'
        },
        name: {
            type: 'string',
            nullable: true
        },
        numberMembers: {
            type: 'integer',
            format: 'int32'
        },
        shortName: {
            type: 'string',
            nullable: true
        },
        color: {
            type: 'string',
            nullable: true
        },
        isPublic: {
            type: 'boolean'
        }
    },
    additionalProperties: false
} as const;

export const $GroupDTOPagedResponse = {
    type: 'object',
    properties: {
        page: {
            type: 'integer',
            format: 'int32'
        },
        pageSize: {
            type: 'integer',
            format: 'int32'
        },
        totalCount: {
            type: 'integer',
            format: 'int32'
        },
        data: {
            type: 'array',
            items: {
                '$ref': '#/components/schemas/GroupDTO'
            },
            nullable: true
        }
    },
    additionalProperties: false
} as const;

export const $GroupDTOPagedResponseRequestResponse = {
    type: 'object',
    properties: {
        response: {
            '$ref': '#/components/schemas/GroupDTOPagedResponse'
        },
        errorMessage: {
            '$ref': '#/components/schemas/ErrorMessage'
        }
    },
    additionalProperties: false
} as const;

export const $GroupDetailsDTO = {
    type: 'object',
    properties: {
        group: {
            '$ref': '#/components/schemas/GroupDTO'
        },
        isMember: {
            type: 'boolean'
        }
    },
    additionalProperties: false
} as const;

export const $GroupDetailsDTORequestResponse = {
    type: 'object',
    properties: {
        response: {
            '$ref': '#/components/schemas/GroupDetailsDTO'
        },
        errorMessage: {
            '$ref': '#/components/schemas/ErrorMessage'
        }
    },
    additionalProperties: false
} as const;

export const $GroupGetDTO = {
    type: 'object',
    properties: {
        group: {
            '$ref': '#/components/schemas/GroupDTO'
        },
        groupRole: {
            '$ref': '#/components/schemas/GroupRoleEnum'
        },
        userRole: {
            '$ref': '#/components/schemas/UserRoleEnum'
        }
    },
    additionalProperties: false
} as const;

export const $GroupGetDTORequestResponse = {
    type: 'object',
    properties: {
        response: {
            '$ref': '#/components/schemas/GroupGetDTO'
        },
        errorMessage: {
            '$ref': '#/components/schemas/ErrorMessage'
        }
    },
    additionalProperties: false
} as const;

export const $GroupLinkResponse = {
    type: 'object',
    properties: {
        link: {
            type: 'string',
            nullable: true
        }
    },
    additionalProperties: false
} as const;

export const $GroupLinkResponseRequestResponse = {
    type: 'object',
    properties: {
        response: {
            '$ref': '#/components/schemas/GroupLinkResponse'
        },
        errorMessage: {
            '$ref': '#/components/schemas/ErrorMessage'
        }
    },
    additionalProperties: false
} as const;

export const $GroupMemberDTO = {
    type: 'object',
    properties: {
        user: {
            '$ref': '#/components/schemas/UserDTO'
        },
        isAdmin: {
            type: 'boolean'
        },
        isMember: {
            type: 'boolean'
        }
    },
    additionalProperties: false
} as const;

export const $GroupMemberDTOPagedResponse = {
    type: 'object',
    properties: {
        page: {
            type: 'integer',
            format: 'int32'
        },
        pageSize: {
            type: 'integer',
            format: 'int32'
        },
        totalCount: {
            type: 'integer',
            format: 'int32'
        },
        data: {
            type: 'array',
            items: {
                '$ref': '#/components/schemas/GroupMemberDTO'
            },
            nullable: true
        }
    },
    additionalProperties: false
} as const;

export const $GroupMemberDTOPagedResponseRequestResponse = {
    type: 'object',
    properties: {
        response: {
            '$ref': '#/components/schemas/GroupMemberDTOPagedResponse'
        },
        errorMessage: {
            '$ref': '#/components/schemas/ErrorMessage'
        }
    },
    additionalProperties: false
} as const;

export const $GroupMemberDTORequestResponse = {
    type: 'object',
    properties: {
        response: {
            '$ref': '#/components/schemas/GroupMemberDTO'
        },
        errorMessage: {
            '$ref': '#/components/schemas/ErrorMessage'
        }
    },
    additionalProperties: false
} as const;

export const $GroupNameUpdateDTO = {
    type: 'object',
    properties: {
        groupId: {
            type: 'string',
            format: 'uuid'
        },
        name: {
            type: 'string',
            nullable: true
        }
    },
    additionalProperties: false
} as const;

export const $GroupRoleEnum = {
    enum: ['Admin', 'Staff', 'Member', 'NotMember'],
    type: 'string'
} as const;

export const $HttpStatusCode = {
    enum: ['Continue', 'SwitchingProtocols', 'Processing', 'EarlyHints', 'OK', 'Created', 'Accepted', 'NonAuthoritativeInformation', 'NoContent', 'ResetContent', 'PartialContent', 'MultiStatus', 'AlreadyReported', 'IMUsed', 'MultipleChoices', 'MovedPermanently', 'Found', 'SeeOther', 'NotModified', 'UseProxy', 'Unused', 'TemporaryRedirect', 'PermanentRedirect', 'BadRequest', 'Unauthorized', 'PaymentRequired', 'Forbidden', 'NotFound', 'MethodNotAllowed', 'NotAcceptable', 'ProxyAuthenticationRequired', 'RequestTimeout', 'Conflict', 'Gone', 'LengthRequired', 'PreconditionFailed', 'RequestEntityTooLarge', 'RequestUriTooLong', 'UnsupportedMediaType', 'RequestedRangeNotSatisfiable', 'ExpectationFailed', 'MisdirectedRequest', 'UnprocessableEntity', 'Locked', 'FailedDependency', 'UpgradeRequired', 'PreconditionRequired', 'TooManyRequests', 'RequestHeaderFieldsTooLarge', 'UnavailableForLegalReasons', 'InternalServerError', 'NotImplemented', 'BadGateway', 'ServiceUnavailable', 'GatewayTimeout', 'HttpVersionNotSupported', 'VariantAlsoNegotiates', 'InsufficientStorage', 'LoopDetected', 'NotExtended', 'NetworkAuthenticationRequired'],
    type: 'string'
} as const;

export const $JoinGroupDTO = {
    type: 'object',
    properties: {
        groupId: {
            type: 'string',
            format: 'uuid'
        },
        token: {
            type: 'string',
            nullable: true
        }
    },
    additionalProperties: false
} as const;

export const $LeaveGroupDTO = {
    type: 'object',
    properties: {
        groupId: {
            type: 'string',
            format: 'uuid'
        }
    },
    additionalProperties: false
} as const;

export const $LoginDTO = {
    type: 'object',
    properties: {
        email: {
            type: 'string',
            nullable: true
        },
        password: {
            type: 'string',
            nullable: true
        }
    },
    additionalProperties: false
} as const;

export const $LoginResponseDTO = {
    type: 'object',
    properties: {
        token: {
            type: 'string',
            nullable: true
        },
        user: {
            '$ref': '#/components/schemas/UserDTO'
        }
    },
    additionalProperties: false
} as const;

export const $LoginResponseDTORequestResponse = {
    type: 'object',
    properties: {
        response: {
            '$ref': '#/components/schemas/LoginResponseDTO'
        },
        errorMessage: {
            '$ref': '#/components/schemas/ErrorMessage'
        }
    },
    additionalProperties: false
} as const;

export const $MessageDTO = {
    type: 'object',
    properties: {
        id: {
            type: 'string',
            format: 'uuid'
        },
        text: {
            type: 'string',
            nullable: true
        },
        createdDate: {
            type: 'string',
            nullable: true
        },
        groupId: {
            type: 'string',
            format: 'uuid'
        },
        topicId: {
            type: 'string',
            format: 'uuid'
        },
        convId: {
            type: 'string',
            format: 'uuid'
        },
        user: {
            '$ref': '#/components/schemas/GroupMemberDTO'
        },
        files: {
            type: 'array',
            items: {
                '$ref': '#/components/schemas/FileGetDTO'
            },
            nullable: true
        }
    },
    additionalProperties: false
} as const;

export const $MessageDTOPagedResponse = {
    type: 'object',
    properties: {
        page: {
            type: 'integer',
            format: 'int32'
        },
        pageSize: {
            type: 'integer',
            format: 'int32'
        },
        totalCount: {
            type: 'integer',
            format: 'int32'
        },
        data: {
            type: 'array',
            items: {
                '$ref': '#/components/schemas/MessageDTO'
            },
            nullable: true
        }
    },
    additionalProperties: false
} as const;

export const $MessageDTOPagedResponseRequestResponse = {
    type: 'object',
    properties: {
        response: {
            '$ref': '#/components/schemas/MessageDTOPagedResponse'
        },
        errorMessage: {
            '$ref': '#/components/schemas/ErrorMessage'
        }
    },
    additionalProperties: false
} as const;

export const $PrivateConversationDTO = {
    type: 'object',
    properties: {
        id: {
            type: 'string',
            format: 'uuid'
        },
        user1: {
            '$ref': '#/components/schemas/UserDTO'
        },
        user2: {
            '$ref': '#/components/schemas/UserDTO'
        }
    },
    additionalProperties: false
} as const;

export const $PrivateConversationDTOPagedResponse = {
    type: 'object',
    properties: {
        page: {
            type: 'integer',
            format: 'int32'
        },
        pageSize: {
            type: 'integer',
            format: 'int32'
        },
        totalCount: {
            type: 'integer',
            format: 'int32'
        },
        data: {
            type: 'array',
            items: {
                '$ref': '#/components/schemas/PrivateConversationDTO'
            },
            nullable: true
        }
    },
    additionalProperties: false
} as const;

export const $PrivateConversationDTOPagedResponseRequestResponse = {
    type: 'object',
    properties: {
        response: {
            '$ref': '#/components/schemas/PrivateConversationDTOPagedResponse'
        },
        errorMessage: {
            '$ref': '#/components/schemas/ErrorMessage'
        }
    },
    additionalProperties: false
} as const;

export const $PrivateConversationDTORequestResponse = {
    type: 'object',
    properties: {
        response: {
            '$ref': '#/components/schemas/PrivateConversationDTO'
        },
        errorMessage: {
            '$ref': '#/components/schemas/ErrorMessage'
        }
    },
    additionalProperties: false
} as const;

export const $RefreshResponseDTO = {
    type: 'object',
    properties: {
        token: {
            type: 'string',
            nullable: true
        }
    },
    additionalProperties: false
} as const;

export const $RefreshResponseDTORequestResponse = {
    type: 'object',
    properties: {
        response: {
            '$ref': '#/components/schemas/RefreshResponseDTO'
        },
        errorMessage: {
            '$ref': '#/components/schemas/ErrorMessage'
        }
    },
    additionalProperties: false
} as const;

export const $RegisterDTO = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            nullable: true
        },
        email: {
            type: 'string',
            nullable: true
        },
        password: {
            type: 'string',
            nullable: true
        },
        groupId: {
            type: 'string',
            format: 'uuid'
        }
    },
    additionalProperties: false
} as const;

export const $RemoveMemberDTO = {
    type: 'object',
    properties: {
        userId: {
            type: 'string',
            format: 'uuid'
        },
        groupId: {
            type: 'string',
            format: 'uuid'
        }
    },
    additionalProperties: false
} as const;

export const $RequestResetDTO = {
    type: 'object',
    properties: {
        email: {
            type: 'string',
            nullable: true
        }
    },
    additionalProperties: false
} as const;

export const $RequestResponse = {
    type: 'object',
    properties: {
        response: {
            type: 'string',
            nullable: true,
            readOnly: true
        },
        errorMessage: {
            '$ref': '#/components/schemas/ErrorMessage'
        }
    },
    additionalProperties: false
} as const;

export const $ResetPasswordDTO = {
    type: 'object',
    properties: {
        token: {
            type: 'string',
            nullable: true
        },
        id: {
            type: 'string',
            format: 'uuid'
        },
        password: {
            type: 'string',
            nullable: true
        }
    },
    additionalProperties: false
} as const;

export const $TopicDTO = {
    type: 'object',
    properties: {
        id: {
            type: 'string',
            format: 'uuid'
        },
        title: {
            type: 'string',
            nullable: true
        },
        description: {
            type: 'string',
            nullable: true
        },
        createdDate: {
            type: 'string',
            nullable: true
        },
        user: {
            '$ref': '#/components/schemas/GroupMemberDTO'
        },
        numberAnswers: {
            type: 'integer',
            format: 'int32'
        },
        files: {
            type: 'array',
            items: {
                '$ref': '#/components/schemas/FileGetDTO'
            },
            nullable: true
        }
    },
    additionalProperties: false
} as const;

export const $TopicDTOPagedResponse = {
    type: 'object',
    properties: {
        page: {
            type: 'integer',
            format: 'int32'
        },
        pageSize: {
            type: 'integer',
            format: 'int32'
        },
        totalCount: {
            type: 'integer',
            format: 'int32'
        },
        data: {
            type: 'array',
            items: {
                '$ref': '#/components/schemas/TopicDTO'
            },
            nullable: true
        }
    },
    additionalProperties: false
} as const;

export const $TopicDTOPagedResponseRequestResponse = {
    type: 'object',
    properties: {
        response: {
            '$ref': '#/components/schemas/TopicDTOPagedResponse'
        },
        errorMessage: {
            '$ref': '#/components/schemas/ErrorMessage'
        }
    },
    additionalProperties: false
} as const;

export const $TopicDTORequestResponse = {
    type: 'object',
    properties: {
        response: {
            '$ref': '#/components/schemas/TopicDTO'
        },
        errorMessage: {
            '$ref': '#/components/schemas/ErrorMessage'
        }
    },
    additionalProperties: false
} as const;

export const $TopicDeleteDTO = {
    type: 'object',
    properties: {
        groupId: {
            type: 'string',
            format: 'uuid'
        },
        topicId: {
            type: 'string',
            format: 'uuid'
        }
    },
    additionalProperties: false
} as const;

export const $UserDTO = {
    type: 'object',
    properties: {
        id: {
            type: 'string',
            format: 'uuid'
        },
        name: {
            type: 'string',
            nullable: true
        },
        email: {
            type: 'string',
            nullable: true
        },
        registeredDate: {
            type: 'string',
            nullable: true
        },
        role: {
            '$ref': '#/components/schemas/UserRoleEnum'
        },
        shortName: {
            type: 'string',
            nullable: true
        },
        color: {
            type: 'string',
            nullable: true
        },
        avatarPath: {
            type: 'string',
            nullable: true
        },
        status: {
            type: 'boolean'
        }
    },
    additionalProperties: false
} as const;

export const $UserDTOPagedResponse = {
    type: 'object',
    properties: {
        page: {
            type: 'integer',
            format: 'int32'
        },
        pageSize: {
            type: 'integer',
            format: 'int32'
        },
        totalCount: {
            type: 'integer',
            format: 'int32'
        },
        data: {
            type: 'array',
            items: {
                '$ref': '#/components/schemas/UserDTO'
            },
            nullable: true
        }
    },
    additionalProperties: false
} as const;

export const $UserDTOPagedResponseRequestResponse = {
    type: 'object',
    properties: {
        response: {
            '$ref': '#/components/schemas/UserDTOPagedResponse'
        },
        errorMessage: {
            '$ref': '#/components/schemas/ErrorMessage'
        }
    },
    additionalProperties: false
} as const;

export const $UserDTORequestResponse = {
    type: 'object',
    properties: {
        response: {
            '$ref': '#/components/schemas/UserDTO'
        },
        errorMessage: {
            '$ref': '#/components/schemas/ErrorMessage'
        }
    },
    additionalProperties: false
} as const;

export const $UserRoleEnum = {
    enum: ['Admin', 'Staff', 'Client'],
    type: 'string'
} as const;