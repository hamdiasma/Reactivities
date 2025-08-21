using System;
using Application.Activities.Cammands;
using FluentValidation;

namespace Application.Validaors;

public class CreateActivityValidator : AbstractValidator<CreateActivity.Command> // services
{
    public CreateActivityValidator()
    {
        RuleFor(x => x.ActivityDto.Title).NotEmpty().WithMessage("Title is required")
        .MaximumLength(100).WithMessage("Title has max length {}");
        RuleFor(x => x.ActivityDto.Description).NotEmpty().WithMessage("Description is required");
        RuleFor(x => x.ActivityDto.Date)
        .NotEmpty().WithMessage("Date is required")
        .GreaterThan(DateTime.UtcNow).WithMessage("Date must be in the fiture");
        RuleFor(x => x.ActivityDto.City)
        .NotEmpty().WithMessage("City is required");
        RuleFor(x => x.ActivityDto.Venue)
        .NotEmpty().WithMessage("Venue is required");
        RuleFor(x => x.ActivityDto.Category)
        .NotEmpty().WithMessage("Category is required");
        RuleFor(x => x.ActivityDto.Langitude)
       .NotEmpty().WithMessage("Langitude is required")
       .InclusiveBetween(-180, 180).WithMessage("Langitude must be between -180 and 180");
       RuleFor(x => x.ActivityDto.Latitude)
       .NotEmpty().WithMessage("Langitude is required")
       .InclusiveBetween(-90, 90).WithMessage("Latitude must be between -90 and 90");
    }
}
