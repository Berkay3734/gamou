let deckOfCards = [['S','ZA'],['S','2'],['S','3'],['S','4'],['S','5'],['S','6'],['S','7'],['S','8'],['S','9'],['S','A10'],['S','J'],['S','Q'],['S','YK'],['H','ZA'],['H','2'],['H','3'],['H','4'],['H','5'],['H','6'],['H','7'],['H','8'],['H','9'],['H','A10'],['H','J'],['H','Q'],['H','YK'],['C','ZA'],['C','2'],['C','3'],['C','4'],['C','5'],['C','6'],['C','7'],['C','8'],['C','9'],['C','A10'],['C','J'],['C','Q'],['C','YK'],['BD','ZA'],['BD','2'],['BD','3'],['BD','4'],['BD','5'],['BD','6'],['BD','7'],['BD','8'],['BD','9'],['BD','A10'],['BD','J'],['BD','Q'],['BD','YK']]
let playerHand = [];
let esimineli = [];
let esiminsirasi = 0;
let playerCards = document.querySelectorAll('.player-card');
let computer1Cards = document.querySelector('.computer1-hand')
let computer2Cards = document.querySelector('.computer2-hand')
let computer3Cards = document.querySelector('.computer3-hand')
let groundHand = []
let groundCards = document.querySelectorAll('.ground-card')
let groundCardIndex = 0
let playTurnIndex = 0
let playerDroppedCard;
let comp1DroppedCard;
let comp2DroppedCard;
let comp3DroppedCard;
let droppedCards = []
let playerResult = 0
let comp1Result = 0
let comp2Result = 0
let comp3Result = 0
let playerCardIndex = 0
let playerCardIndex1 = 0
let playerResultScreen = document.querySelector('.player-result-container')
let comp1ResultScreen = document.querySelector('.comp1-result-container')
let comp2ResultScreen = document.querySelector('.comp2-result-container')
let comp3ResultScreen = document.querySelector('.comp3-result-container')
let resultScreen = document.querySelector('.total-result-screen')
let resultScreenPlayer = document.querySelector('.total-player p')
let resultScreenComp1 = document.querySelector('.total-comp1 p')
let resultScreenComp2 = document.querySelector('.total-comp2 p')
let resultScreenComp3 = document.querySelector('.total-comp3 p')
let playAgainBtn = document.querySelector('#again-btn')
const cardRegex = /(?<=\/)(.*?)(?=\.svg)/
function dealCards(gelenel) {   	
    playerHand = gelenel;
    let playerCardIndex = 0;	
	
	while(document.querySelectorAll('.player-card').length > 0){
        document.querySelectorAll('.player-card')[0].parentNode.removeChild(document.querySelectorAll('.player-card')[0]);
	}
	while(document.getElementsByClassName('computer1-card').length > 0){
        document.getElementsByClassName('computer1-card')[0].parentNode.removeChild(document.getElementsByClassName('computer1-card')[0]);
	}
	while(document.getElementsByClassName('computer2-card').length > 0){
        document.getElementsByClassName('computer2-card')[0].parentNode.removeChild(document.getElementsByClassName('computer2-card')[0]);
	}
	while(document.getElementsByClassName('computer3-card').length > 0){
        document.getElementsByClassName('computer3-card')[0].parentNode.removeChild(document.getElementsByClassName('computer3-card')[0]);
	}
	for (let i = 0; i < 13; i++) {
		const computer1ca = document.createElement("div");
		computer1ca.className = "computer1-card";
		document.querySelector('.computer1-hand').appendChild(computer1ca);
		const computer2ca = document.createElement("div");
		computer2ca.className = "computer2-card";
		document.querySelector('.computer2-hand').appendChild(computer2ca);
		const computer3ca = document.createElement("div");
		computer3ca.className = "computer3-card";
		document.querySelector('.computer3-hand').appendChild(computer3ca);
		const node = document.createElement("div");
		node.className = "player-card";
		node.style.background = `url(img/Cards/${playerHand[playerCardIndex][0]}${playerHand[playerCardIndex][1]}.svg)`;
        node.style.backgroundSize = "90px 120px";		
        node.addEventListener('click', playerDropCard);
		document.querySelector('.player-hand').appendChild(node);
		playerCardIndex++
	}	
	computer2Cards =  document.querySelector('.computer2-hand');
	playerCards = document.querySelectorAll('.player-card');
	playerCards.forEach(card => {		
		card.style.filter = "brightness(0.5)";
		card.removeEventListener('click', playerDropCard);
	})
}
function playerDropCard1(event) {
	//playerCards = document.querySelectorAll('.computer2-card');
	computer3Cards =  document.querySelectorAll('.computer3-card');
    let cardMatched = cardRegex.exec(event.target.style.background).toString()
	cardMatched = cardMatched.slice((cardMatched.lastIndexOf("/")+1))
	esplayerDroppedCard = esimineli.filter(card => card.join("") == cardMatched)[0]	
	esimineli.splice(esimineli.findIndex(card => card == playerDroppedCard), 1)
	//event.target.remove()
	socket.emit("yereat",{kart:esplayerDroppedCard,sandalye:esiminsirasi});
	//cardToGround(playerDroppedCard,sandalyem);
	computer3Cards.forEach(card => {		
		card.style.filter = "brightness(0.5)";
		card.removeEventListener('click', playerDropCard1);
	})
}
function playerDropCard(event) {
	playerCards = document.querySelectorAll('.player-card');
	computer2Cards =  document.querySelectorAll('.computer2-card');
    let cardMatched = cardRegex.exec(event.target.style.background).toString()
	cardMatched = cardMatched.slice((cardMatched.lastIndexOf("/")+1))
	playerDroppedCard = playerHand.filter(card => card.join("") == cardMatched)[0]	
	playerHand.splice(playerHand.findIndex(card => card == playerDroppedCard), 1)
	event.target.remove()
	socket.emit("yereat",{kart:playerDroppedCard,sandalye:sandalyem});
	//cardToGround(playerDroppedCard,sandalyem);
	playerCards.forEach(card => {		
		card.style.filter = "brightness(0.5)";
		card.removeEventListener('click', playerDropCard);
	})
}
function cardToGround(dropped,dropper,yereatilanlar) {
    let cardForResult = [...dropped,dropper]
    droppedCards.push(cardForResult)
    groundHand.push(dropped);
    groundCards[yereatilanlar.length-1].style.background = `url(img/Cards/${dropped[0]}${dropped[1]}.svg)`;
    groundCards[yereatilanlar.length-1].style.backgroundSize = "90px 120px";
}
function playableCards(koz,ilkelmi) {
	playerCards = document.querySelectorAll('.player-card');
    let playableType = [];
	if(groundHand.length>0){
		playableType=groundHand[0][0];
	}
	let playableTpeInHand = playerHand.filter(card => card[0] === playableType).sort()
    let checkGroundSpades = groundHand.filter(card => card[0] === koz)
	if(ilkelmi==1){
		for(let k = 0; k < playerCards.length; k++) {
			playerCards[k].style.filter = 'none'
			playerCards[k].addEventListener('click', playerDropCard)
		}
	}
    else if(playableTpeInHand.length != 0) {
	
		if(checkGroundSpades.length === 0) {
		//eğer yerde koz yok ise 
			let groundHighestCard = groundHand.filter(card => card[0] === playableType).sort()
			groundHighestCard = groundHighestCard[groundHighestCard.length-1]
			let playableTypeCardsBiggerThanGround = playableTpeInHand.filter(card => card[1] > groundHighestCard[1])
			if(playableTypeCardsBiggerThanGround.length != 0) {
			console.log("eğer yerdeki kağıttan daha büyük kapıt varsa ver");
				for(let j = 0; j < playableTypeCardsBiggerThanGround.length; j++) {
					for(let k = 0; k < playerCards.length; k++) {
						let cardMatched1 = cardRegex.exec(playerCards[k].style.background)[0].slice(6)
						let checkCard = playableTypeCardsBiggerThanGround[j].join("")
						if(cardMatched1 == checkCard) {
							playerCards[k].style.filter = 'none'
							playerCards[k].addEventListener('click', playerDropCard)
						}
					}
				}
			}
			else {
			console.log("eğer yerdeki kağıttan daha büyük kapıt yoksa yerdekiyle aynı tip kağıtları ver");
				for(let j = 0; j < playableTpeInHand.length; j++) {
					for(let k = 0; k < playerCards.length; k++) {
						let cardMatched1 = cardRegex.exec(playerCards[k].style.background)[0].slice(6)
						let checkCard = playableTpeInHand[j].join("")
						if(cardMatched1 == checkCard) {
							playerCards[k].style.filter = 'none'
							playerCards[k].addEventListener('click', playerDropCard)
						}
					}
				}
			}
		}
		else {
			for(let j = 0; j < playableTpeInHand.length; j++) {
				for(let k = 0; k < playerCards.length; k++) {
					let cardMatched1 = cardRegex.exec(playerCards[k].style.background)[0].slice(6)
					let checkCard = playableTpeInHand[j].join("")
					if(cardMatched1 == checkCard) {
						playerCards[k].style.filter = 'none'
						playerCards[k].addEventListener('click', playerDropCard)
					}
				}
			}
		}
	}
	else {
		let playableSpadeInHand = playerHand.filter(card => card[0] === koz).sort()
		if(playableSpadeInHand.length != 0) {
			if(checkGroundSpades.length != 0) {
				let groundHighestSpade = groundHand.filter(card => card[0] === koz).sort()
				groundHighestSpade = groundHighestSpade[groundHighestSpade.length-1]
				let playableSpadeBiggerThanGround = playableSpadeInHand.filter(card => card[1] > groundHighestSpade[1])
				if(playableSpadeBiggerThanGround.length != 0) {
					for(let j = 0; j < playableSpadeBiggerThanGround.length; j++) {
						for(let k = 0; k < playerCards.length; k++) {
							let cardMatched1 = cardRegex.exec(playerCards[k].style.background)[0].slice(6)
							let checkCard = playableSpadeBiggerThanGround[j].join("")
							if(cardMatched1 == checkCard) {
								playerCards[k].style.filter = 'none'
								playerCards[k].addEventListener('click', playerDropCard)
							}
						}
					}
				}
			}
			else {
				for(let j = 0; j < playableSpadeInHand.length; j++) {
					for(let k = 0; k < playerCards.length; k++) {
						let cardMatched1 = cardRegex.exec(playerCards[k].style.background)[0].slice(6)
						let checkCard = playableSpadeInHand[j].join("")
						if(cardMatched1 == checkCard) {
							playerCards[k].style.filter = 'none'
							playerCards[k].addEventListener('click', playerDropCard)
						}
					}
				}
			}
		}
		else {
			playerCards.forEach(card => card.style.filter = 'none')
			playerCards.forEach(card => card.addEventListener('click', playerDropCard))
		}
	}
}
function playableCardses(koz,el,sira) {
	computer3Cards = document.querySelectorAll('.computer3-card');
	let playableType = [];
	if(groundHand.length>0){
		playableType=groundHand[0][0];
	}
	esimineli=el;
	let playableTpeInHand = esimineli.filter(card => card[0] === playableType).sort()
	let checkGroundSpades = groundHand.filter(card => card[0] === koz)
	if(playableTpeInHand.length != 0) {
		if(checkGroundSpades.length === 0) {
			let groundHighestCard = groundHand.filter(card => card[0] === playableType).sort()
			groundHighestCard = groundHighestCard[groundHighestCard.length-1]
			let playableTypeCardsBiggerThanGround = playableTpeInHand.filter(card => card[1] > groundHighestCard[1])
			if(playableTypeCardsBiggerThanGround.length != 0) {
				for(let j = 0; j < playableTypeCardsBiggerThanGround.length; j++) {
					for(let k = 0; k < computer3Cards.length; k++) {
						let cardMatched1 = cardRegex.exec(computer3Cards[k].style.background)[0].slice(6)
						let checkCard = playableTypeCardsBiggerThanGround[j].join("")
						if(cardMatched1 == checkCard) {
							computer3Cards[k].style.filter = 'none'
							computer3Cards[k].addEventListener('click', playerDropCard1)
						}
					}
				}
			}
			else {
				for(let j = 0; j < playableTpeInHand.length; j++) {
					for(let k = 0; k < computer3Cards.length; k++) {
						let cardMatched1 = cardRegex.exec(computer3Cards[k].style.background)[0].slice(6)
						let checkCard = playableTpeInHand[j].join("")
						if(cardMatched1 == checkCard) {
							computer3Cards[k].style.filter = 'none'
							computer3Cards[k].addEventListener('click', playerDropCard1)
						}
					}
				}
			}
		}
		else {
			for(let j = 0; j < playableTpeInHand.length; j++) {
				for(let k = 0; k < computer3Cards.length; k++) {
					let cardMatched1 = cardRegex.exec(computer3Cards[k].style.background)[0].slice(6)
					let checkCard = playableTpeInHand[j].join("")
					if(cardMatched1 == checkCard) {
						computer3Cards[k].style.filter = 'none'
						computer3Cards[k].addEventListener('click', playerDropCard1)
					}
				}
			}
		}
	}
	else {
		let playableSpadeInHand = esimineli.filter(card => card[0] === koz).sort()
		if(playableSpadeInHand.length != 0) {
			if(checkGroundSpades.length != 0) {
				let groundHighestSpade = groundHand.filter(card => card[0] === koz).sort()
				groundHighestSpade = groundHighestSpade[groundHighestSpade.length-1]
				let playableSpadeBiggerThanGround = playableSpadeInHand.filter(card => card[1] > groundHighestSpade[1])
				if(playableSpadeBiggerThanGround.length != 0) {
					for(let j = 0; j < playableSpadeBiggerThanGround.length; j++) {
						for(let k = 0; k < computer3Cards.length; k++) {
							let cardMatched1 = cardRegex.exec(computer3Cards[k].style.background)[0].slice(6)
							let checkCard = playableSpadeBiggerThanGround[j].join("")
							if(cardMatched1 == checkCard) {
								computer3Cards[k].style.filter = 'none'
								computer3Cards[k].addEventListener('click', playerDropCard1)
							}
						}
					}
				}
			}
			else {
				for(let j = 0; j < playableSpadeInHand.length; j++) {
					for(let k = 0; k < computer3Cards.length; k++) {
						let cardMatched1 = cardRegex.exec(computer3Cards[k].style.background)[0].slice(6)
						let checkCard = playableSpadeInHand[j].join("")
						if(cardMatched1 == checkCard) {
							computer3Cards[k].style.filter = 'none'
							computer3Cards[k].addEventListener('click', playerDropCard1)
						}
					}
				}
			}
		}
		else {
			computer3Cards.forEach(card => card.style.filter = 'none')
			computer3Cards.forEach(card => card.addEventListener('click', playerDropCard1))
		}
	}
}					