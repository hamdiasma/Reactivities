using System;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace API.Middleware;

public class ExceptionMiddleware : IMiddleware
{
    public async Task InvokeAsync(HttpContext context,  RequestDelegate next)
    {
        try
        {
            await next(context);
        }
        catch (ValidationException ex)
        {
            await HandleValidationException(context, ex);
        }
       catch (Exception ex)
       {

            Console.WriteLine(ex);
       }
    }

    private static async Task HandleValidationException(HttpContext context, ValidationException ex)
    {
        var validationErrors = new Dictionary<string, string[]>();

        if (ex.Errors is not null)
        {
            foreach (var error in ex.Errors)
            {
                var propertyName = error.PropertyName;
                if (validationErrors.TryGetValue(propertyName, out var existingerrors))
                {
                    validationErrors[propertyName] = [.. existingerrors, error.ErrorMessage];
                }
                else
                {
                    validationErrors[propertyName] = [error.ErrorMessage];
                }
            }
        }

        context.Response.StatusCode = StatusCodes.Status400BadRequest;
        var validationProblemsDetails = new ValidationProblemDetails(validationErrors)
        {
            Status = StatusCodes.Status400BadRequest,
            Type = "ValidationFailure",
            Title = "Validation error",
            Detail = "One or more valdation error has accured"
        };

        await context.Response.WriteAsJsonAsync(validationProblemsDetails);

    }
}
