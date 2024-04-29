using Ardalis.SmartEnum;
using Ardalis.SmartEnum.SystemTextJson;
using System.Text.Json.Serialization;

namespace MobyLabWebProgramming.Core.Enums;

[JsonConverter(typeof(SmartEnumNameConverter<RegexEnum, string>))]
public sealed class TokenTypeEnum : SmartEnum<TokenTypeEnum, string>
{
    public static readonly TokenTypeEnum Auth = new(nameof(Auth), "Auth");
    public static readonly TokenTypeEnum Refresh = new(nameof(Refresh), "Refresh");

    private TokenTypeEnum(string name, string value) : base(name, value)
    {
    }
}
