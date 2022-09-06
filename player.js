
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

   let details=document.createElement('div');
   details.classList.add('details');

   let name=document.createElement('p');
   name.classList.add('name');
   name.innerHTML=player.playerName.toUpperCase();
   details.appendChild(name);

   let team=document.createElement('p');
   team.classList.add('team');
   team.innerHTML=player.from;
   details.appendChild(team);
   
   let description=document.createElement('p');
   description.classList.add('description');
   description.innerHTML=player.description.toUpperCase();
   details.appendChild(description);

   let price=document.createElement('p');
   price.classList.add('price');
   price.innerHTML=player.price.toUpperCase();
   details.appendChild(price);

   let playing=document.createElement('p');
   playing.classList.add('playing');
   playing.innerHTML=`${isPlaying(player.isPlaying).toUpperCase()}`;
   details.appendChild(playing);

   document.querySelector('.player-details').appendChild(details);


}
createplayer();


function isPlaying(status){

    if(status==true||status=='true'){
        return 'Playing'
    }
    else{
        return 'On Bench'
    }
  }


  function search(){
    document.querySelector(".search-icon").addEventListener('click',function(e){
        let name=document.querySelector(".search-input").value.toUpperCase();
        
        let found=playerDetails(name);
       
        if(found.length==2){
            document.querySelector(".search-input").value='';
            location.href=`./player.html?id=${found[0]}&${found[1]}`
        }
        else{
            document.querySelector(".search-input").value='';
            document.querySelector(".search-input").placeholder='enter valid name'
        }
    })
  }
  search();

  function playerDetails(name){
    let players=JSON.parse(localStorage.getItem('players'));
    let found;
    let teamArr=Object.keys(players);
    let result=[];

    for(a of teamArr){
        for(let b of players[a]){

            if(b.playerName.toUpperCase()==name){
                found=b;
                break;
            }
            if(found){
                break;
            }
        }
    }
    if(found){
        let teams=JSON.parse(localStorage.getItem('teams'));
        let foundteam=teams.find(function(item){
            return found.from.toUpperCase()==item.key.toUpperCase()
        });
        result.push(foundteam.id);
        result.push(found.id);
    }
    return result;

  }

  function bodyEvent(){

    document.querySelector('body').addEventListener('click',function(e){
  
     
     
     if(e.target.classList[0]!='search-icon'&&e.target.classList[0]!='search-input'){
      document.querySelector('.search-input').value='';
      document.querySelector('.search-input').placeholder="enter player's name";
     }
  
    })
  }
  bodyEvent();

  document.querySelector(".ipl-logo").addEventListener('click',function(e){
    location.href='./index.html'
  })