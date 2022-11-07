using Microsoft.AspNetCore.SignalR;

namespace SignalRDemoApp.Hubs
{
    public class DeathlyHallowsHub: Hub
    {
        public Dictionary<string, int> GetRaceStatus()
        {
            return SD.DeathlyHallowRace;
        }
    }
}
