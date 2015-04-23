
var i;
var value;
var appleArray = [];
var orangeArray = [];
var bananaArray = [];
var grapeArray = [];
var pearArray = [];
// var price = randomNumber(1,4)

var Apple = {
	name: "Apple",
	price: randomNumber(1,5),
	quantity: 0,
	avgPrice: avgPrice( appleArray )
	}

var Orange = {
	name: "Orange",
	price: randomNumber(1,5),
	quantity: orangeArray.length,
	avgPrice: avgPrice( orangeArray )
	}

var Banana = {
	name: "Banana",
	price: randomNumber(1,5),
	quantity: bananaArray.length,
	avgPrice: avgPrice( bananaArray )
	}
var Pear = {
	name: "Pear",
	price: randomNumber(1,5),
	quantity: pearArray.length,
	avgPrice: avgPrice( pearArray )
	}


var User = {
	cash: 50
}

function randomNumber(min, max) {
	return Math.floor(Math.random() * (1 + max - min) + min);
}

function avgPrice(array) {
	value = 0;

	for (i = 0; i < array.length; i++){
		value+=array[i];
	}
	if (array.length > 1){
		value /= array.length;
	}
	value = (Math.round(value * 100) /100);
	return value;
}

function priceChange(object) {
	
		value = ( randomNumber(-25, 25) / 100);
		object.price = value + object.price;

			if (object.price > 9.99) {
				return object.price = 9.99;
			} else if ( object.price < 0.5 ) {
				return object.price = 0.5;
			} else {
				return (Math.round(object.price * 100) /100);
			};
}

// Buy Function
function buttonClicker(object, array, countId, averagePriceId) {
		User.cash = User.cash - object.price;
		if (User.cash > 0 ) {
			array.push(object.price);
			User.cash = (Math.round(User.cash * 100) / 100);
			$("#totalCash").html("<p>How much money you have: $" + User.cash + "</p>");
			object.quantity++;
			$(countId).html("<p>Quantity:" + object.quantity + "</p>" ); // use .html()
			$(averagePriceId).html("<p>Average Price: $" + avgPrice(array) + "</p>");
		} else {
			User.cash = User.cash + object.price;
			alert("You don't have the money to buy that!");
		}
}

// Sell Function
function sellClicker(object, array, countId, averagePriceId) {
		User.cash = User.cash + object.price;
		if (object.quantity > 0  ) {
			array.pop(object.price);
			User.cash = (Math.round(User.cash * 100) / 100);
			$("#totalCash").html("<p>How much money you have: $" + User.cash + "</p>");
			object.quantity--;
			$(countId).html("<p>Quantity:" + object.quantity + "</p>" ); // use .html()
			$(averagePriceId).html("<p>Average Price: $" + avgPrice(array) + "</p>");
		} else {
			User.cash = User.cash - object.price;
			$(averagePriceId).html("<p>Average Price: $0</p>");
			alert("You can't sell something you don't have!");
		}
}

$(document).ready(function(){


	// Inital Prices
	$("#openButton").on("click", function(){
		$("#applePrice").html("<p>$" + Apple.price + "</p>");
		$("#orangePrice").html("<p>$" + Orange.price + "</p>");
		$("#bananaPrice").html("<p>$" + Banana.price + "</p>");
		$("#pearPrice").html("<p>$" + Pear.price + "</p>");
	
	// Changing Price Display
		
		setInterval(function() {
			$("#applePrice").html("<p>$" + priceChange(Apple ) + "</p>");
			$("#orangePrice").html("<p>$" + priceChange(Orange ) + "</p>");
			$("#bananaPrice").html("<p>$" + priceChange(Banana ) + "</p>");
			$("#pearPrice").html("<p>$" + priceChange(Pear ) + "</p>");
		},15000);
	});

	// Buy things
	$("#appleButton").on('click', function() {
		buttonClicker (Apple, appleArray, "#appleCount", "#avgApplePrice");
	});

	$("#orangeButton").on('click', function() {
		buttonClicker (Orange, orangeArray, "#orangeCount", "#avgOrangePrice");
	});

	$("#bananaButton").on('click', function() {
		buttonClicker (Banana, bananaArray, "#bananaCount", "#avgBananaPrice");
	});

	$("#pearButton").on('click', function() {
		buttonClicker (Pear, pearArray, "#pearCount", "#avgPearsPrice");
	});

	// Sell things
	$("#sellApple").on('click', function(){
		sellClicker (Apple, appleArray, "#appleCount", "#avgApplePrice");
	});

	$("#sellOrange").on('click', function() {
		sellClicker (Orange, orangeArray, "#orangeCount", "#avgOrangePrice");
	});

	$("#sellBanana").on('click', function() {
		sellClicker (Banana, bananaArray, "#bananaCount", "#avgBananaPrice");
	});

	$("#sellPear").on('click', function() {
		sellClicker (Pear, pearArray, "#pearCount", "#avgPearsPrice");
	});


	// Display Cash
	$("#totalCash").html("<p>How much money you have: $" + User.cash + "</p>");
	console.log(User.cash);
});



