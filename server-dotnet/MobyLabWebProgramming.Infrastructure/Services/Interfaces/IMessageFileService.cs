using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Responses;

namespace MobyLabWebProgramming.Infrastructure.Services.Interfaces;

/// <summary>
/// This service is a simple service to demonstrate how to work with files.
/// </summary>
public interface IMessageFileService
{
    public const string TopicFilesDirectory = "Topics";
    public const string ConvFilesDirectory = "Users";

    /// <summary>
    /// GetUserFiles gets the user files as pages from the database.
    /// </summary>
    /*public Task<ServiceResponse<PagedResponse<UserFileDTO>>> GetUserFiles(PaginationSearchQueryParams pagination, CancellationToken cancellationToken = default);*/
    /// <summary>
    /// SaveFile saves a file on the file storage and also saves the path to the database for a requesting user.
    /// </summary>
    public Task<ServiceResponse<FilesAddedDTO>> SaveFilesMessageTopic(MessageFilesAddDTO file, UserDTO requestingUser, CancellationToken cancellationToken = default);
    /// <summary>
    /// GetFileDownload gets a file stream for a given file found by the id in the database.
    /// </summary>
    /*public Task<ServiceResponse<FileDTO>> GetFileDownload(Guid id, CancellationToken cancellationToken = default);*/
}
