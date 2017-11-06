var characters= {
	luke:{ 
		health:80,
		baseAttack:10,
		currentAttack:10,
		counterAttack:3
	},
	obi:{ 
		health:100,
		baseAttack:9,
		currentAttack:9,
		counterAttack:19
	},
	maul:{ 
		health:120,
		baseAttack:6,
		currentAttack:6,
		counterAttack:20
	},
	sidious:{ 
		health:220,
		baseAttack:3,
		currentAttack:3,
		counterAttack:2
	}
}
var nameConverter = {
	luke:'Luke Skywalker',
	maul:'Darth Maul',
	obi:'Obi-Wan Kenobi',
	sidious:'Darth Sidious'
}
var playerChar='';
var currentEnemy='';
var gameOver=false;
var enemiesDefeated=0;
function updateHealth(){
	$('#obiHealth').text(characters['obi']['health']);
	$('#lukeHealth').text(characters['luke']['health']);
	$('#sidiousHealth').text(characters['sidious']['health']);
	$('#maulHealth').text(characters['maul']['health']);
}
$('.charSelect').on('click', function(){
	if(playerChar===''){
		$('#playerChar').html(this);
		$('.enemies').html($('.protagonist'));
		playerChar=this.value;
	}
	else if(currentEnemy==='' && this.value!==playerChar){
		$('#currentEnemy').html(this)
		currentEnemy=this.value;
		$('#firstLine').empty();
		$('#secondLine').empty();
	}
});
$('#attack').on('click', function(){
	if(gameOver===false){
		characters[currentEnemy]['health']-=characters[playerChar]['currentAttack'];
		characters[playerChar]['health']-=characters[currentEnemy]['counterAttack'];
		$('#firstLine').text('You attacked '+nameConverter[currentEnemy]+' for '+characters[playerChar]['currentAttack']+' damage.');
		$('#secondLine').text(nameConverter[currentEnemy]+' attacked you back for ' + characters[currentEnemy]['counterAttack']+' damage.');
		characters[playerChar]['currentAttack']+=characters[playerChar]['baseAttack'];
		updateHealth();
		if(characters[playerChar]['health']<=0){
			if(enemiesDefeated===2 && characters[currentEnemy]['health']<=0){
				$('#firstLine').text('You have won a pyrrhic victory...');
				$('#secondLine').text('Odin will surely welcome you in Valhalla');
				$('#restart').show();
			}
			else{
				$('#firstLine').text('You have been defeated!');
				$('#secondLine').empty();
				$('#restart').show();
			}
			gameOver=true;
		}
		else if(characters[currentEnemy]['health']<=0){
			$('#currentEnemy').empty();
			enemiesDefeated++;
			if(enemiesDefeated<3){
				$('#firstLine').text('You defeated '+nameConverter[currentEnemy]+'!');	
				$('#secondLine').text('Select another adversary to continue');
				currentEnemy='';
				console.log($('.protagonist').text().replace(/ /g,''));
			}
			else{
				$('#firstLine').text('You have defeated all comers! You Win!')
				$('#secondLine').empty();
				$('#restart').show();
				gameOver=true;
			}
		}
	}
});
$('#restart').on('click',function(){
	location.reload();
});
updateHealth();