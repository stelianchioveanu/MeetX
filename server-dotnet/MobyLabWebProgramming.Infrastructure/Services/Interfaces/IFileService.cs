using Microsoft.AspNetCore.Http;
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Responses;

namespace MobyLabWebProgramming.Infrastructure.Services.Interfaces;

/// <summary>
/// This service is a simple service to demonstrate how to work with files.
/// </summary>
public interface IFileService
{
    public const string TopicFilesDirectory = "Topics";
    public const string ConvFilesDirectory = "Users";
    public const string AvatarDirectory = "Avatar";

    /// <summary>
    /// GetUserFiles gets the user files as pages from the database.
    /// </summary>
    /*public Task<ServiceResponse<PagedResponse<UserFileDTO>>> GetUserFiles(PaginationSearchQueryParams pagination, CancellationToken cancellationToken = default);*/
    /// <summary>
    /// SaveFile saves a file on the file storage and also saves the path to the database for a requesting user.
    /// </summary>
    public Task<ServiceResponse<FilesAddedDTO>> SaveFiles(FilesAddDTO file, bool isTopic, CancellationToken cancellationToken = default);
    public ServiceResponse<string> SaveAvatar(IFormFile avatar, Guid id);
    /// <summary>
    /// GetFileDownload gets a file stream for a given file found by the id in the database.
    /// </summary>
    /*public Task<ServiceResponse<FileDTO>> GetFileDownload(Guid id, CancellationToken cancellationToken = default);*/
}
