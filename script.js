function getAndDisplayData()
{
    fetch("https://servers-frontend.fivem.net/api/servers/single/wz7652/", { cache: "no-cache" })
    .then(response => response.json())
    .then(data => 
    {
        let playerList = document.getElementById("playerList");
        let onlinePlayers = document.getElementById("onlinePlayers");

        let playersData = data.Data.players;
        onlinePlayers.innerHTML = `Online Players: ${playersData.length}`;
        playerList.innerHTML = "";

        playersData.forEach(player => 
        {
            let row = document.createElement("tr");
            let nick = document.createElement("td");
            let discord = document.createElement("td");
            let license = document.createElement("td");
            let licenseText = document.createElement("p");
            let discordLink = document.createElement("a");
            license.appendChild(licenseText);
            discord.appendChild(discordLink);

            nick.innerText = player.name;
            let playerLicense = player.identifiers.find(id => id.startsWith("license:")).substr(8);
            licenseText.innerText = playerLicense;
            licenseText.onclick = function()
            {
                navigator.clipboard.writeText(playerLicense);
                $('#copyTooltip').fadeIn('slow', function()
                {
                    $('#copyTooltip').delay(500).fadeOut('slow');
                });
            }
            let discordID = player.identifiers.find(id => id.startsWith("discord:"));
            discordLink.innerText = discordID ? discordID.substr(8) : "Not Linked";
            if (discordID && discordID != "Not Linked")
            {
                discordLink.setAttribute("href", `https://discord.id/?prefill=${discordID.substr(8)}`);
                discordLink.setAttribute("target", "blank");
            }

            row.appendChild(nick);
            row.appendChild(discord);
            row.appendChild(license);
            playerList.appendChild(row);
        });
    }).catch(error => console.log(error));
}

$('#copyTooltip').hide();
getAndDisplayData()
setInterval(getAndDisplayData, 10000);