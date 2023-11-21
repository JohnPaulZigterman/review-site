const api = "ab09c01749c09f1ff14eb38eff743e1c";
const sharedSecret = "fc4203f7579cc727b223319e6ff76152";
const token = "HFm_85vLcpW_M5ZZPAniiXnJ03S3hCaR";
const apiSignature = "bc4e6cd4bd25a9f70c289f479985e85d";
const albumDisplay = $("#albumDisplay");

$("#searchForm").on("submit", function(event) {
  event.preventDefault();
  const artist = $("#artistInput").val();
  const album = $("#albumInput").val();
  const url = `https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${api}&artist=${artist}&album=${album}&format=json`;

  albumDisplay.empty();
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const album = data.album;
      const albumName = album.name;
      const albumArtist = album.artist;
      const albumImage = album.image[3]["#text"];
      const albumWiki = album.wiki;
      const albumPublished = albumWiki.published;
      const albumSummary = albumWiki.summary;
      const albumContent = albumWiki.content;
      const albumListeners = album.listeners;
      const albumPlaycount = album.playcount;

      albumDisplay.append(`
        <h1>${albumName}</h1>
        <h2>${albumArtist}</h2>
        <img src="${albumImage}" alt="${albumName} by ${albumArtist}">
        <p>Published: ${albumPublished}</p>
        <p>Summary: ${albumSummary}</p>
        <p>Content: ${albumContent}</p>
        <p>Listeners: ${albumListeners}</p>
        <p>Playcount: ${albumPlaycount}</p>
      `);
    })
    .catch(error => {
      console.log(error);
    });
});

