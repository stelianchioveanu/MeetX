using Ardalis.SmartEnum;
using Ardalis.SmartEnum.SystemTextJson;
using System.Text.Json.Serialization;

namespace MobyLabWebProgramming.Core.Enums;

[JsonConverter(typeof(SmartEnumNameConverter<FileTypes, string>))]
public sealed class FileTypes : SmartEnum<FileTypes, string>
{
    public static readonly FileTypes File = new(nameof(File), "File");
    public static readonly FileTypes Image = new(nameof(Image), "Image");

    private FileTypes(string name, string value) : base(name, value)
    {
    }
}
