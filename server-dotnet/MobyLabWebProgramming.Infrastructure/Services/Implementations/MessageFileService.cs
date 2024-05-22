using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;
using MobyLabWebProgramming.Core.Enums;
using MobyLabWebProgramming.Core.Errors;
using MobyLabWebProgramming.Core.Responses;
using MobyLabWebProgramming.Infrastructure.Database;
using MobyLabWebProgramming.Infrastructure.Repositories.Interfaces;
using MobyLabWebProgramming.Infrastructure.Services.Interfaces;

namespace MobyLabWebProgramming.Infrastructure.Services.Implementations;

public class MessageFileService : IMessageFileService
{
    private readonly IRepository<WebAppDatabaseContext> _repository;
    private readonly IFileRepository _fileRepository;

    private static string GetConvDirectory(Guid convId) => Path.Join(convId.ToString(), IMessageFileService.ConvFilesDirectory);
    private static string GetTopicDirectory(Guid topicId) => Path.Join(topicId.ToString(), IMessageFileService.TopicFilesDirectory);

    public MessageFileService(IRepository<WebAppDatabaseContext> repository, IFileRepository fileRepository)
    {
        _repository = repository;
        _fileRepository = fileRepository;
    }

    public async Task<ServiceResponse<FilesAddedDTO>> SaveFilesMessageTopic(MessageFilesAddDTO files, UserDTO requestingUser, CancellationToken cancellationToken = default)
    {
        var filesList = new List<Guid>();

        if (files.Images != null)
        {
            foreach (var image in files.Images)
            {
                var fileName = _fileRepository.SaveFile(image, files.TopicId != Guid.Empty ? GetTopicDirectory(files.TopicId) : GetConvDirectory(files.PrivateConversationId));

                if (fileName.Result == null)
                {
                    return ServiceResponse<FilesAddedDTO>.FromError(CommonErrors.FileAddError);
                }

                var newFile = new FileEntity
                {
                    Name = image.FileName,
                    Path = fileName.Result,
                    Type = FileTypes.Image
                };

                var addedFile = await _repository.AddAsync(newFile);

                if (addedFile == null)
                {
                    return ServiceResponse<FilesAddedDTO>.FromError(CommonErrors.FileAddError);
                }

                filesList.Add(addedFile.Id);
            }
        }
        if (files.Files != null)
        {
            foreach (var file in files.Files)
            {
                var fileName = _fileRepository.SaveFile(file, files.TopicId != Guid.Empty ? GetTopicDirectory(files.TopicId) : GetConvDirectory(files.PrivateConversationId));

                if (fileName.Result == null)
                {
                    return ServiceResponse<FilesAddedDTO>.FromError(CommonErrors.FileAddError);
                }

                var newFile = new FileEntity
                {
                    Name = file.FileName,
                    Path = fileName.Result,
                    Type = FileTypes.File
                };

                var addedFile = await _repository.AddAsync(newFile);

                if (addedFile == null)
                {
                    return ServiceResponse<FilesAddedDTO>.FromError(CommonErrors.FileAddError);
                }

                filesList.Add(addedFile.Id);
            }
        }
        return ServiceResponse<FilesAddedDTO>.ForSuccess(new FilesAddedDTO { Files = filesList });
    }

    /*public async Task<ServiceResponse<FileDTO>> GetFileDownload(Guid id, CancellationToken cancellationToken = default) // If not successful respond with the error.
    {
        var userFile = await _repository.GetAsync<UserFile>(id, cancellationToken); // First get the file entity from the database to find the location on the filesystem.

        return userFile != null ?
            _fileRepository.GetFile(Path.Join(GetFileDirectory(userFile.UserId), userFile.Path), userFile.Name) :
            ServiceResponse<FileDTO>.FromError(new(HttpStatusCode.NotFound, "File entry not found!", ErrorCodes.EntityNotFound));
    }*/
}
