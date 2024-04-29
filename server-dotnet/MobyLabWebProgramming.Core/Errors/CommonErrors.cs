using System.Net;

namespace MobyLabWebProgramming.Core.Errors;


public static class CommonErrors
{
    public static ErrorMessage UserNotFound => new(HttpStatusCode.NotFound, "User doesn't exist!", ErrorCodes.EntityNotFound);
    public static ErrorMessage FileNotFound => new(HttpStatusCode.NotFound, "File not found on disk!", ErrorCodes.PhysicalFileNotFound);
    public static ErrorMessage TechnicalSupport => new(HttpStatusCode.InternalServerError, "An unknown error occurred, contact the technical support!", ErrorCodes.TechnicalError);
    public static ErrorMessage UserAlreadyExists => new(HttpStatusCode.Conflict, "User already exists!", ErrorCodes.UserAlreadyExists);
    public static ErrorMessage GroupNotFound => new(HttpStatusCode.NotFound, "Group doesn't exist!", ErrorCodes.EntityNotFound);
    public static ErrorMessage NotAnAdmin => new(HttpStatusCode.Unauthorized, "You are not the group admin!", ErrorCodes.NotAnAdmin);
    public static ErrorMessage TokenExpired => new(HttpStatusCode.Forbidden, "Your token is expired!", ErrorCodes.TokenExpired);
    public static ErrorMessage UserAlreadyInGroup => new(HttpStatusCode.Conflict, "User is already in group!", ErrorCodes.UserAlreadyExists);
    public static ErrorMessage NotCreator => new(HttpStatusCode.Unauthorized, "You can't modify the the group's creator rights!", ErrorCodes.CannotUpdate);
    public static ErrorMessage NotMember => new(HttpStatusCode.Unauthorized, "Your are not part of the group!", ErrorCodes.NotAMember);
    public static ErrorMessage TopicNotFound => new(HttpStatusCode.NotFound, "Topic doesn't exist!", ErrorCodes.EntityNotFound);

}
