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

export const $ErrorCodes = {
    enum: ['Unknown', 'TechnicalError', 'EntityNotFound', 'PhysicalFileNotFound', 'UserAlreadyExists', 'WrongPassword', 'CannotAdd', 'CannotUpdate', 'CannotDelete', 'MailSendFailed', 'TagAlreadyExists', 'WrongTag', 'WrongInputs', 'TokenExpired', 'GroupAlreadyExists', 'NotAnAdmin', 'NotAMember'],
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

export const $GroupGetDTO = {
    type: 'object',
    properties: {
        group: {
            '$ref': '#/components/schemas/GroupDTO'
        },
        groupRole: {
            '$ref': '#/components/schemas/GroupRoleEnum'
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
        groupRole: {
            '$ref': '#/components/schemas/GroupRoleEnum'
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

export const $GroupRoleEnum = {
    enum: ['Admin', 'Member'],
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

export const $TopicAddDTO = {
    type: 'object',
    properties: {
        groupId: {
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
            format: 'date-time'
        },
        user: {
            '$ref': '#/components/schemas/UserDTO'
        },
        numberAnswers: {
            type: 'integer',
            format: 'int32'
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

export const $UserAddDTO = {
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
        role: {
            '$ref': '#/components/schemas/UserRoleEnum'
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
        role: {
            '$ref': '#/components/schemas/UserRoleEnum'
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
    enum: ['Admin', 'Personnel', 'Client'],
    type: 'string'
} as const;

export const $UserUpdateDTO = {
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
        password: {
            type: 'string',
            nullable: true
        }
    },
    additionalProperties: false
} as const;