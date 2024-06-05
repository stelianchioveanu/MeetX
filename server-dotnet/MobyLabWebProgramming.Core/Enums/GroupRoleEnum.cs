using Ardalis.SmartEnum;
using Ardalis.SmartEnum.SystemTextJson;
using System.Text.Json.Serialization;

namespace MobyLabWebProgramming.Core.Enums;

[JsonConverter(typeof(SmartEnumNameConverter<GroupRoleEnum, string>))]
public sealed class GroupRoleEnum : SmartEnum<GroupRoleEnum, string>
{
    public static readonly GroupRoleEnum Admin = new(nameof(Admin), "Admin");
    public static readonly GroupRoleEnum Staff = new(nameof(Staff), "Staff");
    public static readonly GroupRoleEnum Member = new(nameof(Member), "Member");
    public static readonly GroupRoleEnum NotMember = new(nameof(NotMember), "Not a Member");

    private GroupRoleEnum(string name, string value) : base(name, value)
    {
    }
}
