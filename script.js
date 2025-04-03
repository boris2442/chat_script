
const form = document.getElementById('chat-form');
const messageInput = document.getElementById('message-input');
const conversation = document.getElementById('conversation');
const toggleTheme = document.getElementById('toggle-theme');

// Charger les messages sauvegardés
const savedMessages = localStorage.getItem('messages');
if (savedMessages) {
    conversation.innerHTML = savedMessages;
}

// Ajouter un écouteur d'événement pour le formulaire
form.addEventListener('submit', function (event) {
    event.preventDefault();

    const message = messageInput.value.trim();
    if (message !== '') {
        const now = new Date();
        const time = now.getHours() + ':' + now.getMinutes().toString().padStart(2, '0');

        // Ajouter le message utilisateur avec un bouton "Supprimer"
        const newMessage = document.createElement('div');
        newMessage.classList.add('talk', 'right');
        newMessage.innerHTML = `
            <p>${message}</p>
            <span class="timestamp">${time}</span>
            <button class="delete-btn">Supprimer</button>
        `;
        conversation.appendChild(newMessage);
        messageInput.value = '';
        conversation.scrollTop = conversation.scrollHeight;

        // Sauvegarder les messages
        localStorage.setItem('messages', conversation.innerHTML);

        // Réponse automatique après un délai
        setTimeout(() => {
            const botMessage = document.createElement('div');
            botMessage.classList.add('talk', 'left');
            botMessage.innerHTML = `
                <p>Merci pour votre message !</p>
                <span class="timestamp">${time}</span>
            `;
            conversation.appendChild(botMessage);
            conversation.scrollTop = conversation.scrollHeight;

            // Sauvegarder les messages
            localStorage.setItem('messages', conversation.innerHTML);
        }, 1000); // Délai de 1 seconde
    }
});

// Ajouter un écouteur d'événement pour supprimer un message
conversation.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete-btn')) {
        const messageToDelete = event.target.parentElement; // Le conteneur du message
        messageToDelete.remove();

        // Mettre à jour les messages sauvegardés dans localStorage
        localStorage.setItem('messages', conversation.innerHTML);
    }
});

// Activer/désactiver le mode sombre
toggleTheme.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});
