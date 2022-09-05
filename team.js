let teamId=location.href.split('=')[1];

let team=JSON.parse(localStorage.getItem('teams')).find(function(item){
    return item.id==teamId
})
let playerObj={};

let players=JSON.parse(localStorage.getItem('players'));
let teamKey=`${team.key.toLowerCase()}Players`;

function teamDetails(team)
{


   let teamname=document.createElement('p');
   teamname.innerHTML=team.teamName;
   document.querySelector('.team-details').appendChild(teamname);

   let bats=document.createElement('p');
   bats.innerHTML=`top Batsman: ${team.topBatsman}`;
   document.querySelector('.team-details').appendChild(bats);
   let bowler=document.createElement('p');
   bowler.innerHTML=`top Batsman: ${team.topBowler}`;
   document.querySelector('.team-details').appendChild(bowler);
   let total=document.createElement('p');
   total.innerHTML=`Total Players: ${players[teamKey].length}`;
   document.querySelector('.team-details').appendChild(total);
   let won=document.createElement('p');
   won.innerHTML=`Championship Won: ${team.noOfWins}`;
   document.querySelector('.team-details').appendChild(won);
   
}
teamDetails(team)




 
function allPlayer(){
    emptyPlayers();
       
    let allPlayers=players[teamKey];
    console.log(allPlayers);
    
    for(let item of allPlayers){
        console.log(1)
        let player=document.createElement('div');
        player.classList.add('player');
        player.addEventListener('click',function(e){

        let teamId=location.href.split('=')[1];
            location.href=`./player.html?id=${teamId}&${item.id}`
        })
        let playerLogo=document.createElement('div');
        playerLogo.classList.add('imgurl');
        let img=document.createElement('img');
        img.src=item.imgUrl;
        playerLogo.appendChild(img);
        player.appendChild(playerLogo);

        let name=document.createElement('p');
        name.classList.add('player-name');
        name.innerHTML=`${item.playerName}`;
        player.appendChild(name);

        let role=document.createElement('p');
        role.classList.add('role');
        role.innerHTML=`Role: ${item.description}`;
        player.appendChild(role);

        let price=document.createElement('p');
        price.classList.add('price');
        price.innerHTML=`Price: ${item.price}`;
        player.appendChild(price);

        let status=document.createElement('p');
        status.classList.add('status');
        status.innerHTML=`Playing Status: ${isPlaying(item.isPlaying)}`;
        player.appendChild(status);

        

        document.querySelector('.player-wrapper').appendChild(player)



    }
  }
  allPlayer();
  
  
  
  function isPlaying(status){
    if(status==true||status=='true'){
        return 'playing'
    }
    else{
        return 'not playing'
    }
  }

  function emptyPlayers(){
    let allTeam=document.querySelector('.player-wrapper');
    let length=allTeam.children.length;
    for(let a=0;a<length;a++){
        allTeam.children[0].remove();
    }
    
  }

  function createPlayerButtuon(){

    document.querySelector('.create-player').addEventListener('click',
    function(e){
        
        let pop =document.querySelector('.create-player .pop-up');
        if(e.target.classList[0]!='demo'&&e.target.classList[0]!='pop-up'&&e.target.classList[0]!='player-details'){
        
        if(pop.classList[1]=='hide'){
            pop.classList.remove('hide')
        }
        else{
            pop.classList.add('hide')
            emptyForm();
        }
    }
      
    })
  }
  createPlayerButtuon();

  function emptyForm(){
    let inputs=document.querySelectorAll('.player-details input');
    
    for(let i=0;i<inputs.length;i++){
        inputs[i].value='';
        inputs[i].placeholder='';

    }
    let obj={};
    playerObj={...obj};
  }


  function createPlayer(){
    let form=document.querySelector('.player-details');
    form.addEventListener('change',function(e){
        
        playerObj[e.target.name]=e.target.value;
        console.log(playerObj);
        

    })


  }
  createPlayer();

  function onSumbit(){
    document.querySelector(".player-details #submit").addEventListener('click',
    function(e){
    

       if(isvalidate())
             
       {   
           ++team.totalPlayer;
           console.log(team.totalPlayer)
           

          
           

           let obj={
            id: players[teamKey].length,
            playerName:playerObj.playerName,
            description: playerObj.description,
            from:team.key.toUpperCase(),
            imgUrl: playerObj.imgUrl,
            isPlaying:playerObj.isPlaying,
            price:playerObj.price,
            
          }
           players[teamKey].push(obj);
           localStorage.setItem('players',JSON.stringify(players));
           console.log(players);
           document.querySelector(".team-details p:nth-child(4)").innerHTML=`Total Players: ${players[teamKey].length}`
           
           
           playerObj={...{}};
           allPlayer();
           emptyForm();
           document.querySelector('.create-player .pop-up').classList.add('hide')



       } 
    })
  }
  onSumbit();

  function isvalidate(){
    let inputs=document.querySelectorAll('.player-details input');
    if(Object.keys(playerObj).length==5){
        return true
    }
    else{
        if(playerObj.playerName==''||playerObj.playerName==undefined)
        {
            document.querySelector('#player-name').placeholder='this is mandetory'
        }
        
        if(playerObj.description==''||playerObj.description==undefined)
        {
            document.querySelector('#description').placeholder='this is mandetory'
        }
        if(playerObj.price==''||playerObj.price==undefined)
        {
            document.querySelector('#price').placeholder='this is mandetory'
        }
        if(playerObj.isPlaying==''||playerObj.isPlaying==undefined)
        {
            document.querySelector('#isPlaying').placeholder='this is mandetory'
        }
        if(playerObj.imgUrl==''||playerObj.imgUrl==undefined)
        {
            document.querySelector('#imgUrl').placeholder='this is mandetory'
        }
        return false

    }
  }

  function search(){
    document.querySelector(".search-icon").addEventListener('click',function(e){
        let name=document.querySelector(".search-input").value.toUpperCase();
        
        console.log(name)
        let found;
        for(let a of players[teamKey]){
            if(a.playerName.toUpperCase()==name){
                
                found=a;
                break;
            }
        }
        console.log(found)
        if(found){
            document.querySelector(".search-input").value='';
            location.href=`./player.html?id=${teamId}&${found.id}`
        }
        else{
            document.querySelector(".search-input").value='';
            document.querySelector(".search-input").placeholder='enter valid name'
        }
    })
  }
  search();

  function bodyEvent(){

    document.querySelector('body').addEventListener('click',function(e){
  
     
     if(e.target.classList[0]!='pop-up'&&e.target.classList[0]!='player-details'&&e.target.classList[0]!='demo'&&e.target.classList[0]!='create-player'){
      document.querySelector('.create-player .pop-up').classList.add('hide');
      emptyForm();
  
     }
    console.log(e.target.classList[0])
     if(e.target.classList[0]!='search-icon'&&e.target.classList[0]!='search-input'){
      document.querySelector('.search-input').value='';
      document.querySelector('.search-input').placeholder='enter team name or key';
     }
  
    })
  }
  bodyEvent();