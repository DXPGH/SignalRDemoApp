using Microsoft.AspNetCore.SignalR;

namespace SignalRDemoApp.Hubs
{
    public class UserCountHub : Hub
    {
        public static int TotalViews { get; set; } = 0;

        public static int TotalUsers { get; set; } = 0;

        public override Task OnConnectedAsync()
        {
            TotalUsers++;
            Clients.All.SendAsync("updateTotalUsers", TotalUsers).GetAwaiter().GetResult();
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            TotalUsers--;
            Clients.All.SendAsync("updateTotalUsers", TotalUsers).GetAwaiter().GetResult();
            return base.OnDisconnectedAsync(exception);
        }

        public async Task<string> NewWindowLoaded(string name)
        {
            TotalViews++;
            await Clients.All.SendAsync("udpateTotalViews", TotalViews);

            return $"Total Views for the Hub are {TotalViews} - {name}";
        }
    }
}
