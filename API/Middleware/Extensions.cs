using System;
using Application.Activities.Queries;
using Application.Core;
using Application.Interfaces;
using Application.Validaors;
using FluentValidation;
using Infrastructure.Security;

namespace API.Extensions
{
    public static class Extensions
    {
        /// <summary>
        /// Ajoute les services personnalisés à l'application.
        /// </summary>
        public static IServiceCollection AddCustomServices(
            this IServiceCollection services,
            IConfiguration configuration
        )
        {
            // -------------------------
            // 📌 Swagger : Documentation de l'API
            // -------------------------
            // SwaggerGen permet de générer automatiquement une documentation interactive
            // accessible via /swagger en développement.
            services.AddSwaggerGen();

            // -------------------------
            // 📌 CORS : Cross-Origin Resource Sharing
            // -------------------------
            // Configure la politique CORS par défaut pour autoriser uniquement les origines spécifiées
            // dans la configuration (fichier appsettings.json > AllowedOrigins).
            // Cela évite les appels non autorisés depuis des domaines externes.
            services.AddCors(options =>
                options.AddDefaultPolicy(policyBuilder =>
                {
                    policyBuilder
                        .AllowCredentials()
                        .WithOrigins(configuration
                            .GetSection("AllowedOrigins")
                            .Get<string[]>()!) // Liste des origines autorisées
                        .WithMethods("GET", "POST", "PUT", "DELETE") // Méthodes HTTP autorisées
                        .AllowAnyHeader() // Autorise tous les en-têtes
                        .AllowAnyMethod(); // Autorise toutes les méthodes HTTP (sécurité plus faible si activée)
                })
            );
            // ------------------------- signalR -------------------------
            services.AddSignalR();
            // -------------------------    -------------------- 


            services.AddMediatR(x =>
            {
                x.RegisterServicesFromAssemblyContaining<GetActivitiesList.Handler>();
                x.AddOpenBehavior(typeof(ValidationBehavior<,>));
            });
            // services.AddMediatR(x=>x.RegisterServicesFromAssemblyContaining<GetActivityDetails.Query>());
            // automapper
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);

            // validation services
            services.AddValidatorsFromAssemblyContaining<CreateActivityValidator>();
            // -------------------------
            // 📌 TODO : Autres services personnalisés
            // -------------------------
            // Exemple :
            // services.AddScoped<IMyService, MyService>();
            // services.AddSingleton<ICacheService, MemoryCacheService>();
            services.AddScoped<IUserAccessor, UserAccessor>();

           
            return services;
        }
    }
}
