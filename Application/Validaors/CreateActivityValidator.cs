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

    }

}
