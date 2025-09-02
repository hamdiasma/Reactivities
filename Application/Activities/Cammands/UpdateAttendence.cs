using System;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence.Application;

namespace Application.Activities.Cammands;

// Cette classe représente la commande qui gère la mise à jour 
// de la participation (attendence) d’un utilisateur à une activité.
public class UpdateAttendence
{
    // Command = objet qui contient les données nécessaires pour exécuter l’action
    public class Command : IRequest<Result<Unit>>
    {
        // L’ID de l’activité sur laquelle on veut mettre à jour la participation
        public required string Id { get; set; }
    }

    // Handler = logique qui s’exécute quand la commande est appelée
    // - IUserAccessor permet de récupérer l’utilisateur connecté
    // - AppDbContext permet d’accéder à la base de données
    public class Handler(IUserAccessor userAccessor, AppDbContext dbContext) : IRequestHandler<Command, Result<Unit>>
    {
        private readonly IUserAccessor _userAccessor = userAccessor;
        private readonly AppDbContext _dbContext = dbContext;

        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            // On récupère l’activité (avec ses participants et leurs infos utilisateurs)
            var activity = await _dbContext.Activities
                .Include(x => x.Attendees)           // Inclure les participants
                .ThenInclude(x => x.User)            // Inclure aussi les infos User liées
                .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

            // Si l’activité n’existe pas → erreur
            if (activity == null)
            {
                return Result<Unit>.Failure("Activity not found", 404);
            }

            // On récupère l’utilisateur actuellement connecté
            var user = await _userAccessor.GetUserAsync();

            // Vérifier si l’utilisateur participe déjà à l’activité
            var attendance = activity.Attendees.FirstOrDefault(x => x.UserId == user.Id);

            // Vérifier si l’utilisateur est l’hôte de l’activité
            var isHost = activity.Attendees.Any(x => x.IsHost && x.UserId == user.Id);

            // Cas 1 : l’utilisateur est déjà inscrit
            if (attendance != null)
            {
                if (isHost)
                    // Si c’est l’hôte, il peut annuler ou réactiver l’activité
                    activity.IsCancelled = !activity.IsCancelled;
                else
                    // Si ce n’est pas l’hôte, il peut quitter l’activité
                    activity.Attendees.Remove(attendance);
            }
            else
            {
                // Cas 2 : l’utilisateur n’est pas encore inscrit → on l’ajoute
                activity.Attendees.Add(new Domain.ActivityAttendee
                {
                    UserId = user.Id,
                    ActivityId = activity.Id,
                    IsHost = false // par défaut il n’est pas hôte
                });
            }

            // Sauvegarde en base de données
            var result = await _dbContext.SaveChangesAsync(cancellationToken) > 0;

            // Retourner le résultat : succès ou échec
            return result
                ? Result<Unit>.Success(Unit.Value)
                : Result<Unit>.Failure("Problem updating the activity", 400);
        }
    }
}
