using Microsoft.AspNetCore.Http;
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;
using MobyLabWebProgramming.Core.Enums;
using MobyLabWebProgramming.Core.Errors;
using MobyLabWebProgramming.Core.Responses;
using MobyLabWebProgramming.Infrastructure.Database;
using MobyLabWebProgramming.Infrastructure.Repositories.Interfaces;
using MobyLabWebProgramming.Infrastructure.Services.Interfaces;

namespace MobyLabWebProgramming.Infrastructure.Services.Implementations;

public class FileService : IFileService
{
    private readonly IRepository<WebAppDatabaseContext> _repository;
    private readonly IFileRepository _fileRepository;

    private static string GetConvDirectory(Guid convId) => Path.Join(convId.ToString(), IFileService.ConvFilesDirectory);
    private static string GetTopicDirectory(Guid topicId) => Path.Join(topicId.ToString(), IFileService.TopicFilesDirectory);
    private static string GetEntityDirectory(Guid id) => Path.Join(id.ToString(), IFileService.AvatarDirectory);

    public FileService(IRepository<WebAppDatabaseContext> repository, IFileRepository fileRepository)
    {
        _repository = repository;
        _fileRepository = fileRepository;
    }

    public async Task<ServiceResponse<FilesAddedDTO>> SaveFiles(FilesAddDTO files, bool isTopic, CancellationToken cancellationToken = default)
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
                    Type = FileTypes.Image,
                    TopicId = isTopic ? files.TopicId : null
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
                    Type = FileTypes.File,
                    TopicId = isTopic ? files.TopicId : null
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

    public ServiceResponse<string> SaveAvatar(IFormFile avatar, Guid id)
    {
        if (avatar != null && id != Guid.Empty)
        {
            var fileName = _fileRepository.SaveFile(avatar, GetEntityDirectory(id));
            if (fileName.Result == null)
            {
                return ServiceResponse<string>.FromError(CommonErrors.FileAddError);
            }
            return ServiceResponse<string>.ForSuccess(fileName.Result);
        } else
        {
            return ServiceResponse<string>.FromError(CommonErrors.BadRequets);
        }
    }

}
