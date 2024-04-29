using Ardalis.SmartEnum;
using Ardalis.SmartEnum.SystemTextJson;
using System.Text.Json.Serialization;

namespace MobyLabWebProgramming.Core.Enums;

[JsonConverter(typeof(SmartEnumNameConverter<RegexEnum, string>))]
public sealed class RegexEnum : SmartEnum<RegexEnum, string>
{
    public static readonly RegexEnum EmailRegex = new(nameof(EmailRegex), @"^[^@\s]+@[^@\s]+\.[^@\s]+$");
    public static readonly RegexEnum PasswordRegex = new(nameof(PasswordRegex), @"^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$");

    private RegexEnum(string name, string value) : base(name, value)
    {
    }
}
