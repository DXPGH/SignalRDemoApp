// create connection
var connectionUserCount = new signalR.HubConnectionBuilder().withUrl("/hubs/userCount", signalR.HttpTransportType.WebSockets).build();

// connect to the methods that hub invokes
connectionUserCount.on("udpateTotalViews", value => {
    var newCountSpan = document.getElementById("totalViewsCounter");
    newCountSpan.innerText = value.toString();
});

connectionUserCount.on("updateTotalUsers", value => {
    var newCountSpan = document.getElementById("totalUsersCounter");
    newCountSpan.innerText = value.toString();
});


// invoke hub methods i.e send notification to the hub
function newWindowLoadedOnClient() {
    // connectionUserCount.send("NewWindowLoaded");
    connectionUserCount.send("NewWindowLoaded", "Sai kiran"); //.then(value => console.log(value));
}
// start connection
function fulfilled() {
    console.log("Connection to the Hub Successful");
    newWindowLoadedOnClient();
}

function rejected() {
    console.log("Connection to the Hub Failed");
}

connectionUserCount.start().then(fulfilled, rejected);