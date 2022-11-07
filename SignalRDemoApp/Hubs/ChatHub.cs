using Microsoft.AspNetCore.SignalR;

namespace SignalRDemoApp.Hubs
{
    public class ChatHub: Hub
    {
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("receiveMessage", user, message);
        }
    }
}
