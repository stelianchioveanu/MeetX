using MobyLabWebProgramming.Core.Responses;
using System.Net;
using System.Net.NetworkInformation;

namespace MobyLabWebProgramming.Core.Errors;


public static class CommonErrors
{
    public static ErrorMessage UserNotFound => new(HttpStatusCode.NotFound, "User doesn't exist!", ErrorCodes.UserNotFound);
    public static ErrorMessage ContactNotFound => new(HttpStatusCode.NotFound, "The message doesn't exist!", ErrorCodes.ContactNotFound);
    public static ErrorMessage FileNotFound => new(HttpStatusCode.NotFound, "File not found on disk!", ErrorCodes.PhysicalFileNotFound);
    public static ErrorMessage GroupNotFound => new(HttpStatusCode.NotFound, "Group doesn't exist!", ErrorCodes.GroupNotFound);
    public static ErrorMessage TopicNotFound => new(HttpStatusCode.NotFound, "Topic doesn't exist!", ErrorCodes.TopicNotFound);
    public static ErrorMessage ConvNotFound => new(HttpStatusCode.NotFound, "Conversation doesn't exist!", ErrorCodes.ConvNotFound);


    public static ErrorMessage BadCredentials => new(HttpStatusCode.BadRequest, "Invalid email or password!", ErrorCodes.BadCredentials);
    public static ErrorMessage BadRequets => new(HttpStatusCode.BadRequest, "You need to fill every field!", ErrorCodes.WrongInputs);
    public static ErrorMessage BadMessage => new(HttpStatusCode.BadRequest, "The message should have at least one character other than space or some files!", ErrorCodes.WrongMessage);
    public static ErrorMessage BadName => new(HttpStatusCode.BadRequest, "The name should have at least two characters other than space!", ErrorCodes.WrongName);
    public static ErrorMessage BadPosition => new(HttpStatusCode.BadRequest, "The position should have at least one character other than space!", ErrorCodes.WrongPosition);
    public static ErrorMessage BadTitle => new(HttpStatusCode.BadRequest, "The title should have at least one character other than space!", ErrorCodes.WrongTitle);
    public static ErrorMessage BadDescription => new(HttpStatusCode.BadRequest, "The description should have at least one character other than space!", ErrorCodes.WrongDescription);
    public static ErrorMessage BadPassword => new(HttpStatusCode.BadRequest, "Password must include an uppercase letter, a lowercase letter, a number, and a special character.", ErrorCodes.WrongPassword);
    public static ErrorMessage BadEmail => new(HttpStatusCode.BadRequest, "Email is not valid!", ErrorCodes.WrongEmail);
    public static ErrorMessage BadIndustry => new(HttpStatusCode.BadRequest, "You have to choose an industry!", ErrorCodes.WrongIndustry);


    public static ErrorMessage TechnicalSupport => new(HttpStatusCode.InternalServerError, "An unknown error occurred, contact the technical support!", ErrorCodes.TechnicalError);
    public static ErrorMessage FileAddError => new(HttpStatusCode.InternalServerError, "Save file failed!", ErrorCodes.CannotAdd);


    public static ErrorMessage UserAlreadyExists => new(HttpStatusCode.Conflict, "User already exists!", ErrorCodes.UserAlreadyExists);
    public static ErrorMessage GroupAlreadyExists => new(HttpStatusCode.Conflict, "A group made by you with the same name already exists!", ErrorCodes.GroupAlreadyExists);
    public static ErrorMessage UserAlreadyInGroup => new(HttpStatusCode.Conflict, "User is already in group!", ErrorCodes.UserAlreadyExists);


    public static ErrorMessage NotAnAdmin => new(HttpStatusCode.Forbidden, "You are not the group admin!", ErrorCodes.NotAnAdmin);
    public static ErrorMessage NotFromStaff => new(HttpStatusCode.Forbidden, "You are not the part of the staff!", ErrorCodes.NotFromStaff);
    public static ErrorMessage NotAnAppAdmin => new(HttpStatusCode.Forbidden, "You are not the app admin!", ErrorCodes.NotAnAppAdmin);
    public static ErrorMessage ChangeMyRole => new(HttpStatusCode.Forbidden, "You can't change your role!", ErrorCodes.CannotUpdate);
    public static ErrorMessage NotMember => new(HttpStatusCode.Forbidden, "Your are not part of the group!", ErrorCodes.NotAMember);
    public static ErrorMessage NotCreator => new(HttpStatusCode.Forbidden, "You can't modify the the group's creator rights!", ErrorCodes.CannotUpdate);


    public static ErrorMessage CannotLeavePublicGroup => new(HttpStatusCode.Forbidden, "You can't leave a public group!", ErrorCodes.CannotUpdate);
    public static ErrorMessage CannotDeletePublicGroup => new(HttpStatusCode.Forbidden, "You can't remove a public group!", ErrorCodes.CannotDelete);
    public static ErrorMessage CannotChangePublicRoles => new(HttpStatusCode.Forbidden, "You can't change user's roles in a public group!", ErrorCodes.CannotUpdate);
    

    public static ErrorMessage ResetTokenExpired => new(HttpStatusCode.Forbidden, "Token expired!", ErrorCodes.TokenExpired);
    public static ErrorMessage RefreshTokenExpired => new(HttpStatusCode.Unauthorized, "Refresh token expired!", ErrorCodes.TokenExpired);
    public static ErrorMessage TokenExpired => new(HttpStatusCode.Forbidden, "Your token is expired!", ErrorCodes.TokenExpired);
}
