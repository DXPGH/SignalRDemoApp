var cloakSpan = document.getElementById('cloakCounter');
var wandSpan = document.getElementById('wandCounter');
var stoneSpan = document.getElementById('stoneCounter');

var connectionUserCount = new signalR.HubConnectionBuilder().withUrl("/hubs/deathlyhallows", signalR.HttpTransportType.WebSockets).build();

connectionUserCount.on("updateDeathlyHallowCount", (cloak, stone, wand) => {
    cloakSpan.innerText = cloak;
    stoneSpan.innerText = stone;
    wandSpan.innerText = wand;
});

function fulfilled() {
    connectionUserCount.invoke("GetRaceStatus").then((raceCounter) => {
        cloakSpan.innerText = raceCounter.cloak.toString();
        stoneSpan.innerText = raceCounter.stone.toString();
        wandSpan.innerText = raceCounter.wand.toString();
    });

    console.log('Connection to the Deathly Hallows Hub was successful');
}

function rejected() {
    console.log('Connection to the Deathly Hallows Hub was failed');
}

// start
connectionUserCount.start().then(fulfilled, rejected);