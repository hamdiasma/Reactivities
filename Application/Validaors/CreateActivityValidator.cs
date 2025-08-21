using System;
using Application.Activities.Cammands;
using Application.Activities.DTOs;
using FluentValidation;

namespace Application.Validaors;

public class CreateActivityValidator : BaseActivityValidator<CreateActivity.Command, CreateActivityDto> // services
{
    public CreateActivityValidator() : base(x=>x.ActivityDto)
    {
        
    }
}
