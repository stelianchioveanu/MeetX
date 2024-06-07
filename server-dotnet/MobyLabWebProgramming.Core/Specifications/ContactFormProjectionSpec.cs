using System.Globalization;
using System.Linq.Expressions;
using Ardalis.Specification;
using Microsoft.EntityFrameworkCore;
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;
using MobyLabWebProgramming.Core.Enums;

namespace MobyLabWebProgramming.Core.Specifications;

public sealed class ContactFormProjectionSpec : BaseSpec<ContactFormProjectionSpec, ContactForms, ContactFormDTO>
{
    /// <summary>
    /// This is the projection/mapping expression to be used by the base class to get UserDTO object from the database.
    /// </summary>
    protected override Expression<Func<ContactForms, ContactFormDTO>> Spec => e => new()
    {
        Id = e.Id,
        Name = e.Name,
        Email = e.Email,
        Message = e.Message,
        Date = DateTime.Parse(e.CreatedAt.ToUniversalTime().ToString(), null, DateTimeStyles.RoundtripKind).ToString(),
        IsChecked = e.isChecked
    };

    public ContactFormProjectionSpec(bool orderByCreatedAt = true) : base(orderByCreatedAt)
    {
    }

    public ContactFormProjectionSpec()
    {
        Query.OrderByDescending(e => e.CreatedAt);
    }
}
