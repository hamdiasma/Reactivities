import { useLocalObservable } from "mobx-react-lite"
import { HubConnection, HubConnectionBuilder, HubConnectionState } from "@microsoft/signalr";
import { useEffect, useRef } from "react";
import { runInAction } from "mobx";

// Hook personnalisé qui gère la connexion SignalR pour les commentaires
export const useComments = (activityId?: string) => {
    const created = useRef(false);
    // On crée un "store local" observable avec MobX
    const commentStore = useLocalObservable(() => ({
        // Liste des commentaires (initialement vide)
        comments: [] as ChatComment[],

        // Référence vers la connexion SignalR (initialement nulle)
        hubConnection: null as HubConnection | null,

        // Méthode pour initialiser et démarrer la connexion SignalR
        createHubConnection(activityId?: string) {
            // Si aucun activityId n’est fourni, on sort (pas de connexion possible)
            if (!activityId) return;
            // Création d’une nouvelle connexion SignalR
            this.hubConnection = new HubConnectionBuilder()
                // L’URL du hub inclut l’ID de l’activité en query string
                .withUrl(`${import.meta.env.VITE_COMMENT_URL}?activityId=${activityId}`, {
                    withCredentials: true, // inclut les cookies/credentials
                })
                .withAutomaticReconnect() // permet de se reconnecter automatiquement si la connexion est perdue
                // .configureLogging(LogLevel.Information) // optionnel : activer les logs
                .build();

            // On démarre la connexion
            this.hubConnection.start()
                .catch(error => console.log('Erreur lors de la connexion : ', error));

            // Gestion des événements de SignalR
            // this.hubConnection.onreconnected(() => console.log('Reconnecté au serveur'));
            // this.hubConnection.onclose(() => console.log('Connexion fermée'));

            this.hubConnection.on('LoadComments', (comments: ChatComment[]) => {
                // On reçoit la liste initiale des commentaires
                runInAction(() => {
                    this.comments = comments;
                })

            });
            // recive comment
            this.hubConnection.on('ReceiveComment', (comment: ChatComment) => {
                // On reçoit un nouveau commentaire
                runInAction(() => {
                    this.comments.unshift(comment);
                })
            });
            // update comment

            this.hubConnection.on('UpdateComment', (editComment: ChatComment) => {
                runInAction(() => {
                    this.comments = this.comments.map(c => c.id === editComment.id ? editComment : c)
                })
            })

            this.hubConnection.on('DeleteUserComment', (deletedComment?: string) => {
                console.log({deletedComment});
                  if (!deletedComment) return;
                runInAction(() => {
                    this.comments = this.comments.filter(c => c.id !== deletedComment)
                })
            })


        },

        // Méthode pour arrêter la connexion proprement
        stopHubConnection() {
            // On vérifie que la connexion est encore active
            if (this.hubConnection?.state === HubConnectionState.Connected) {
                this.hubConnection.stop()
                    .catch(error => console.log('Erreur lors de l’arrêt de la connexion : ', error));
            }
        },
    }))

    useEffect(() => {
        if (activityId && !created.current) {
            commentStore.createHubConnection(activityId);
            created.current = true;
        }
        return () => {
            commentStore.stopHubConnection();
            commentStore.comments = [];
        }
    }, [activityId, commentStore])

    return { commentStore }
}
