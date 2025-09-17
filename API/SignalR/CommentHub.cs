using System;
using Application.Activities.Cammands;
using Application.Activities.Commands;
using Application.Activities.Queries;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR;

// Hub SignalR pour gérer les commentaires en temps réel sur les activités
public class CommentHub(IMediator mediator) : Hub
{
    // Gère la réception d’un commentaire d’un client et sa diffusion au groupe
    public async Task SendComment(AddComment.Cammand command)
    {
        // Envoie la commande du commentaire à MediatR pour traitement et sauvegarde
        var comment = await mediator.Send(command);

        // Diffuse le nouveau commentaire à tous les clients du groupe lié à l’activité
        await Clients.Group(command.ActivityId).SendAsync("ReceiveComment", comment.Value);
    }

    public async Task EditComment(EditComment.Cammand command)
    {
        // Update the comment via MediatR
        var comment = await mediator.Send(command);

        // Broadcast the updated comment to all clients in the activity group
        await Clients.Group(command.ActivityId).SendAsync("UpdateComment", comment.Value);
    }

    public async Task DeleteComment(DeleteComment.Command command)
    {
        // Update the comment via MediatR
        var comment = await mediator.Send(command);

        // Broadcast the updated comment to all clients in the activity group
        await Clients.Group(command.ActivityId).SendAsync("DeleteUserComment", comment.Value);
    }
    // Méthode appelée automatiquement lorsqu’un client se connecte au hub
    public override async Task OnConnectedAsync()
    {
        // Récupère le contexte HTTP pour accéder aux paramètres de la requête
        var httpContext = Context.GetHttpContext();
        // Récupère l’activityId depuis la query string
        var activityId = httpContext?.Request.Query["activityId"];

        // Si aucun activityId n’est fourni, déclenche une erreur côté client
        if (string.IsNullOrEmpty(activityId))
            throw new HubException("Vous devez fournir un activityId");

        // Ajoute la connexion du client dans un groupe SignalR basé sur l’activityId
        await Groups.AddToGroupAsync(Context.ConnectionId, activityId!);

        // Récupère tous les commentaires de l’activité via MediatR
        var result = await mediator.Send(new GetComments.Query
        {
            ActivityId = activityId!
        });

        // Envoie uniquement au client nouvellement connecté la liste des commentaires
        await Clients.Caller.SendAsync("LoadComments", result.Value);
    }
}
