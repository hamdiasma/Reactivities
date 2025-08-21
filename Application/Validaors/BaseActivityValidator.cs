using System;
using Application.Activities.DTOs;
using FluentValidation;

namespace Application.Validaors;

public class BaseActivityValidator<T, TDto> : AbstractValidator<T> where TDto : BaseActivityDto
{
    public BaseActivityValidator (Func<T, TDto> selector){
        RuleFor(x => selector(x).Title).NotEmpty().WithMessage("Title is required")
        .MaximumLength(100).WithMessage("Title has max length {}");
        RuleFor(x => selector(x).Description).NotEmpty().WithMessage("Description is required");
        RuleFor(x => selector(x).Date)
        .NotEmpty().WithMessage("Date is required")
        .GreaterThan(DateTime.UtcNow).WithMessage("Date must be in the fiture");
        RuleFor(x => selector(x).City)
        .NotEmpty().WithMessage("City is required");
        RuleFor(x => selector(x).Venue)
        .NotEmpty().WithMessage("Venue is required");
        RuleFor(x => selector(x).Category)
        .NotEmpty().WithMessage("Category is required");
        RuleFor(x => selector(x).Langitude)
       .NotEmpty().WithMessage("Langitude is required")
       .InclusiveBetween(-180, 180).WithMessage("Langitude must be between -180 and 180");
       RuleFor(x => selector(x).Latitude)
       .NotEmpty().WithMessage("Langitude is required")
       .InclusiveBetween(-90, 90).WithMessage("Latitude must be between -90 and 90");
    }

}
