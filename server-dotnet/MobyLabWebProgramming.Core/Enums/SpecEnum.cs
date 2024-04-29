using Ardalis.SmartEnum;
using Ardalis.SmartEnum.SystemTextJson;
using System.Text.Json.Serialization;

namespace MobyLabWebProgramming.Core.Enums;

[JsonConverter(typeof(SmartEnumNameConverter<SpecEnum, string>))]
public sealed class SpecEnum : SmartEnum<SpecEnum, string>
{
    public static readonly SpecEnum ByUserId = new(nameof(ByUserId), "ByUserId");
    public static readonly SpecEnum ByTokenId = new(nameof(ByTokenId), "ByTokenId");
    public static readonly SpecEnum ByGroupId = new(nameof(ByGroupId), "ByGroupId");

    private SpecEnum(string name, string value) : base(name, value)
    {
    }
}
