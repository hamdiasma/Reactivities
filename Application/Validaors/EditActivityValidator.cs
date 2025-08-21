using System;
using Application.Activities.Cammands;
using Application.Activities.DTOs;

namespace Application.Validaors;

public class EditActivityValidator : BaseActivityValidator<EditActivity.Command, EditActivityDto>
{
    public EditActivityValidator() : base(x=>x.ActivityDto){}
}
