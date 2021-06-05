 	
// Array of products, each product is an object with different fieldset
// A set of ingredients should be added to products		 

var products = [
	{
		name: "Broccoli NON-GMO",
		LactoseIntolerant: true,
		NutAllergy: true,
		price: 23.20,
		organic : true
	},
	{
		name: "Broccoli",
		LactoseIntolerant: true,
		NutAllergy: true,
		price: 13.21,
		organic : false
	},
	{
		name: "Bread",
		LactoseIntolerant: true,
		NutAllergy: true,
		price: 2.35,
		organic : false
	},
	{
		name: "Salmon NON-GMO",
		LactoseIntolerant: true,
		NutAllergy: true,
		price: 15.00,
		organic : true
	},
	{
		name: "Salmon",
		LactoseIntolerant: true,
		NutAllergy: true,
		price: 10.00,
		organic : false
	},
	{
		name: "Peanuts",
		LactoseIntolerant: true,
		NutAllergy: false,
		price: 10.00,
		organic : false
	},
	{
		name: "Cucumbers NON-GMO",
		LactoseIntolerant: true,
		NutAllergy: true,
		price: 8.50,
		organic : true
	},
	{
		name: "Cucumbers",
		LactoseIntolerant: true,
		NutAllergy: true,
		price: 9.85,
		organic : false
	},
	{
		name: "Milk",
		LactoseIntolerant: false,
		NutAllergy: true,
		price: 6.65,
		organic : false
	},
	{
		name: "Cheese",
		LactoseIntolerant: false,
		NutAllergy: true,
		price: 11.25,
		organic : false
	},
	{
		name: "Peanut M&Ms",
		LactoseIntolerant: true,
		NutAllergy: false,
		price: 5.25,
		organic : false
	},
	{
		name: "Frozen Pizza",
		LactoseIntolerant: false,
		NutAllergy: true,
		price: 9.65,
		organic : false
	},
	{
		name: "Crackers",
		LactoseIntolerant: true,
		NutAllergy: true,
		price: 5.25,
		organic : false
	},
	{
		name: "Lays Chips",
		LactoseIntolerant: true,
		NutAllergy: true,
		price: 3.75,
		organic : false
	}





	
];
	


// given restrictions provided, make a reduced list of products
// prices should be included in this list, as well as a sort based on price

function restrictListProducts(prods, restriction,organic) {
	prods.sort((a, b) => (a.price > b.price) ? 1 : -1)

	let product_names = [];
	if (!organic) {
		
	
		for (let i = 0; i < prods.length; i += 1) {
			priceName = prods[i].name + "  " + formatter.format(prods[i].price); 
			if ((restriction == "LactoseIntolerant") && (prods[i].LactoseIntolerant == true) && (prods[i].organic == false)){
				
				product_names.push(prods[i]);
				

			}
			else if ((restriction == "NutAllergy") && prods[i].NutAllergy == true && prods[i].organic == false){
				product_names.push(prods[i]);
				

			}
			else if ((restriction == "None" ) && (prods[i].organic == false)){
				product_names.push(prods[i]);
				
			} else if (restriction == "Lactose Intolerance/Sensitivity and Nut Allergy" && prods[i].NutAllergy == true
				&& prods[i].LactoseIntolerant == true && prods[i].organic == false) {
				product_names.push(prods[i]);

			}
			
			}
		} else {
			for (let i = 0; i < prods.length; i += 1) {
			priceName = prods[i].name + "  " + formatter.format(prods[i].price); 
			if ((restriction == "LactoseIntolerant") && (prods[i].LactoseIntolerant == true) ){
				
				product_names.push(prods[i]);
				

			}
			else if ((restriction == "NutAllergy") && (prods[i].NutAllergy == true )){
				product_names.push(prods[i]);
				

			}
			else if (restriction == "None"){
				product_names.push(prods[i]);
				

			} else if (restriction == "Lactose Intolerance/Sensitivity and Nut Allergy" && prods[i].NutAllergy == true
				&& prods[i].LactoseIntolerant == true) {
				product_names.push(prods[i]);

			}
			
			}
		
	}
	return product_names;
}

// Calculate the total price of items, with received parameter being a list of products
function getTotalPrice(chosenProducts) {
	totalPrice = 0;
	for (let i=0; i<products.length; i+=1) {
		if (chosenProducts.indexOf(products[i].name) > -1){
			totalPrice += products[i].price;
		}
	}
	return totalPrice;
}

var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});