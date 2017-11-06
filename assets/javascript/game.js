var characters= {
	luke:{ 
		health:100,
		baseAttack:10,
		currentAttack:10,
		counterAttack:15
	},
	obi:{ 
		health:120,
		baseAttack:8,
		currentAttack:8,
		counterAttack:12
	},
	maul:{ 
		health:150,
		baseAttack:6,
		currentAttack:6,
		counterAttack:10
	},
	sidious:{ 
		health:200,
		baseAttack:3,
		currentAttack:3,
		counterAttack:8
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
updateHealth();
$('#attack').on('click', function(){
	if(gameOver===false){
		characters[currentEnemy]['health']-=characters[playerChar]['currentAttack'];
		characters[playerChar]['health']-=characters[currentEnemy]['counterAttack'];
		$('#firstLine').text('You attacked '+nameConverter[currentEnemy]+' for '+characters[playerChar]['currentAttack']+' damage.');
		$('#secondLine').text(nameConverter[currentEnemy]+' attacked you back for ' + characters[currentEnemy]['counterAttack']+' damage.');
		characters[playerChar]['currentAttack']+=characters[playerChar]['baseAttack'];
		updateHealth();
		if(characters[playerChar]['health']<=0){
			$('#firstLine').text('You have been defeated!');
			$('#restart').show();
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