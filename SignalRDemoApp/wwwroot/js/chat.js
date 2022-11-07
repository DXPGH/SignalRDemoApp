var connectionUserCount = new signalR.HubConnectionBuilder().withUrl("/hubs/chathub", signalR.HttpTransportType.WebSockets).build();

document.getElementById("sendButton").disabled = true;

connectionUserCount.on("receiveMessage", function (user, message) {
    var li = document.createElement('li');
    document.getElementById('messagesList').appendChild(li);

    li.textContent = `${user} says ${message}`;
});


document.getElementById('sendButton')
    .addEventListener("click", (event) => {
        var user = document.getElementById('userInput').value;
        var message = document.getElementById('messageInput').value;

        connectionUserCount.invoke("SendMessage", user, message)
            .catch((err) => {
                console.error(err);
            });

        event.preventDefault();
    });

connectionUserCount.start()
    .then(() => {
        document.getElementById("sendButton").disabled = false;
    })
    .catch((err) => {
        console.error(err);
    });


