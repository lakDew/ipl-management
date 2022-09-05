
let teamId=location.href.split('=')[1].split('&')[0];
let playerId=Number(location.href.split('=')[1].split('&')[1]);

let allTeam=JSON.parse(localStorage.getItem('teams'));
let team =allTeam.find(function(item){
  return item.id==teamId;
})

let teamKey=`${team.key.toLowerCase()}Players`;

let allPlayer=JSON.parse(localStorage.getItem('players'))[teamKey];
console.log(allPlayer)

let player=allPlayer.find(function(item){
    return item.id==playerId;
})

function createplayer(){
   let photo= document.createElement('div');
   photo.classList.add('photo');
   let img =document.createElement('img');
   img.src=player.imgUrl;
   photo.appendChild(img);
   document.querySelector('.player-details').appendChild(photo);

   let name=document.createElement('p');
   name.classList.add('name');
   name.innerHTML=player.playerName.toUpperCase();
   document.querySelector('.player-details').appendChild(name);

   let team=document.createElement('p');
   team.classList.add('team');
   team.innerHTML=player.from;
   document.querySelector('.player-details').appendChild(team);
   
   let description=document.createElement('p');
   description.classList.add('description');
   description.innerHTML=player.description.toUpperCase();
   document.querySelector('.player-details').appendChild(description);

   let price=document.createElement('p');
   price.classList.add('price');
   price.innerHTML=player.price.toUpperCase();
   document.querySelector('.player-details').appendChild(price);


}
createplayer();