const jvBody = document.getElementById("jeux");
const siteBody = document.getElementById("sites");
const jeuxJSON = new Request("dataGames.json");

async function main(){
    const response = await fetch(jeuxJSON);
    const allGames = await response.json();

    createGenre(allGames.GenreVideoGames, jvBody);
    showGames(allGames.VideoGames, jvBody);

    createGenre(allGames.GenreWebsite, siteBody);
    showGames(allGames.Website, siteBody);
}

function showGames(games, body){
    var allProjet = document.createElement('div');
    allProjet.className = "all-p";
    for(var g of games){
        var game = createGames(g);
        allProjet.appendChild(game);
    }
    body.appendChild(allProjet);
}


function createGames(game){
    var div = document.createElement('a');
    div.className = "project";
    div.href = game.link;

    div.appendChild(createImage(game));
    div.appendChild(createAllTextHide(game));
    div.appendChild(createTitle(game));  
    return div;
}

/**
 * create the image of the project
 * @param {game parameters} game 
 * @returns img object
 */
function createImage(game){
    var img = document.createElement("img");
    img.src = game.image;
    return img;
}

/**
 * create the text hidden of the project
 * @param {game parameters} game 
 * @returns div object
 */
function createAllTextHide(game){
    var div = document.createElement('div');
    div.className = "hide";

    var nodeString = document.createTextNode(game.short) 
    div.appendChild(nodeString);
    div.appendChild(document.createElement('br'));
    div.appendChild(document.createElement('br'));
    nodeString = document.createTextNode(game.description);

    //div.appendChild(nodeString);
    createDescription(div, game.description);
    div.appendChild(document.createElement('br'));

    nodeString = document.createTextNode(game.date);
    div.appendChild(nodeString);
    return div
}

function createDescription(node, description){
    for(var d in description){
        var nodeString = document.createTextNode(description[d]);
        node.appendChild(nodeString);
        node.appendChild(document.createElement('br'));
    }
}

/**
 * create the title of the project
 * @param {game parameters} game 
 * @returns p object
 */
function createTitle(game){
    var p = document.createElement("p");
    if(game.medal){
        const i = document.createElement('i');
        i.className = "fa-solid fa-medal";
        p.appendChild(i);
        p.appendChild(document.createTextNode(" "))
    }
    p.appendChild(document.createTextNode(game.name))
    return p;
}

/**
 * create and add the genres 
 * @param {the genres of the json} genres 
 */
function createGenre(genres,body){
    var div = document.createElement('div');
    div.className = "genres";
    for(var g in genres){
        var p = document.createElement('p');
        p.textContent = genres[g];
        div.appendChild(p);
    }
    body.appendChild(div);  
}

main();