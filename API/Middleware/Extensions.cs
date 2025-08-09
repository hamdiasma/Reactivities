using System;

namespace API.Extensions
{


    public static class Extensions
    {
        public static IServiceCollection AddCustomServices(this IServiceCollection services)
        {
            // Add custom services here
            // swagger
            services.AddSwaggerGen();

            return services;
        }

    }

}
