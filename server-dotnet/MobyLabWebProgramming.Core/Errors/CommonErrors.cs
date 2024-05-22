using System.Net;

namespace MobyLabWebProgramming.Core.Errors;


public static class CommonErrors
{
    public static ErrorMessage UserNotFound => new(HttpStatusCode.NotFound, "User doesn't exist!", ErrorCodes.EntityNotFound);
    public static ErrorMessage BadCredentials => new(HttpStatusCode.NotFound, "Invalid email or password!", ErrorCodes.WrongInputs);
    public static ErrorMessage FileNotFound => new(HttpStatusCode.NotFound, "File not found on disk!", ErrorCodes.PhysicalFileNotFound);
    public static ErrorMessage TechnicalSupport => new(HttpStatusCode.InternalServerError, "An unknown error occurred, contact the technical support!", ErrorCodes.TechnicalError);
    public static ErrorMessage UserAlreadyExists => new(HttpStatusCode.Conflict, "User already exists!", ErrorCodes.UserAlreadyExists);
    public static ErrorMessage GroupNotFound => new(HttpStatusCode.NotFound, "Group doesn't exist!", ErrorCodes.EntityNotFound);
    public static ErrorMessage NotAnAdmin => new(HttpStatusCode.Unauthorized, "You are not the group admin!", ErrorCodes.NotAnAdmin);
    public static ErrorMessage TokenExpired => new(HttpStatusCode.Forbidden, "Your token is expired!", ErrorCodes.TokenExpired);
    public static ErrorMessage UserAlreadyInGroup => new(HttpStatusCode.Conflict, "User is already in group!", ErrorCodes.UserAlreadyExists);
    public static ErrorMessage NotCreator => new(HttpStatusCode.Unauthorized, "You can't modify the the group's creator rights!", ErrorCodes.CannotUpdate);
    public static ErrorMessage NotMember => new(HttpStatusCode.Unauthorized, "Your are not part of the group!", ErrorCodes.NotAMember);
    public static ErrorMessage NotMessageCreator => new(HttpStatusCode.Unauthorized, "Your are not the message's creator!", ErrorCodes.CannotDelete);
    public static ErrorMessage TopicNotFound => new(HttpStatusCode.NotFound, "Topic doesn't exist!", ErrorCodes.EntityNotFound);
    public static ErrorMessage ConvNotFound => new(HttpStatusCode.NotFound, "Conversation doesn't exist!", ErrorCodes.EntityNotFound);
    public static ErrorMessage MessageNotFound => new(HttpStatusCode.NotFound, "Message doesn't exist!", ErrorCodes.EntityNotFound);
    public static ErrorMessage BadRequets => new(HttpStatusCode.BadRequest, "You need to fill every field!", ErrorCodes.WrongInputs);
    public static ErrorMessage BadGroupName => new(HttpStatusCode.BadRequest, "The name should have at least two different characters other than space!", ErrorCodes.WrongInputs);
    public static ErrorMessage BadInput => new(HttpStatusCode.BadRequest, "The fields should have at least one character other than space!", ErrorCodes.WrongInputs);
    public static ErrorMessage FileAddError => new(HttpStatusCode.InternalServerError, "Save file failed!", ErrorCodes.CannotAdd);
}
