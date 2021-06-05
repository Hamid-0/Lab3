
// This function is called when any of the tab is clicked
// It is adapted from https://www.w3schools.com/howto/howto_js_tabs.asp
var restriction;
var organic = false;
function openInfo(evt, tabName) {

	// Get all elements with class="tabcontent" and hide them
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}

	// Get all elements with class="tablinks" and remove the class "active"
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}

	// Show the current tab, and add an "active" class to the button that opened the tab
	document.getElementById(tabName).style.display = "block";
	evt.currentTarget.className += " active";
	if (tabName == 'Products') {

	document.getElementById("start").innnerHTML=
   	"New Button Text using innerHTML";		
			


	}
	if (tabName == 'Client') {
		document.getElementById("start").textContent ='Start Over';
		document.getElementById("chose").disabled = true;
		document.getElementById("dietSelect").selectedIndex = 0;
		document.getElementById("org").checked = false;
		total = 0;

	}
	
	function hide() {
		  var x = document.getElementById("start");

	    x.style.display = "none";

}
}
function organicCheck() {
  var x = document.getElementById("org").checked;
	organic = x;
	

}

	
// generate a checkbox list from a list of products
// it makes each product name as the label for the checkbos

function populateListProductChoices(slct1, slct2) {
	
    var s1 = document.getElementById(slct1);
	var s2 = document.getElementById(slct2);
	
	if (s1.value != "option") {
		document.getElementById("chose").disabled = false;
	} else {
		document.getElementById("chose").disabled = true;
		
	}


	// s2 represents the <div> in the Products tab, which shows the product list, so we first set it empty
    s2.innerHTML = "";
		
	// obtain a reduced list of products based on restrictions
	restriction = s1.value
    var optionArray = restrictListProducts(products, restriction,organic);

	// for each item in the array, create a checkbox element, each containing information such as:
	// <input type="checkbox" name="product" value="Bread">
	// <label for="Bread">Bread/label><br>
		
	for (i = 0; i < optionArray.length; i++) {
		price = formatter.format(optionArray[i].price);
		productName = optionArray[i].name;
		namePrice = productName + "  " + price;

		// create the checkbox and add in HTML DOM
		var checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.name = "product";
		checkbox.value = productName;
		s2.appendChild(checkbox);
		
		// create a label for the checkbox, and also add in HTML DOM
		var label = document.createElement('label')
		label.htmlFor = namePrice;
		label.appendChild(document.createTextNode(namePrice));
		s2.appendChild(label);
		
		// create a breakline node and add in HTML DOM
		s2.appendChild(document.createElement("br"));    
	}
}

	
// This function is called when the "Add selected items to cart" button in clicked
// The purpose is to build the HTML to be displayed (a Paragraph) 
// We build a paragraph to contain the list of selected items, and the total price


function selectedItems() {
	document.getElementById("continue").disabled = false;

	
	var ele = document.getElementsByName("product");
	var chosenProducts = [];
	
	var c = document.getElementById('displayCart');
	c.innerHTML = "";
	
	// build list of selected item

	var para = document.createElement("h2");
	para.appendChild(document.createElement("hr"));
	var optionArray = restrictListProducts(products, restriction, organic);
	for (i = 0; i < ele.length; i++) {
		price = formatter.format(optionArray[i].price);
		productName = optionArray[i].name;
		namePrice = productName + "  " + price;
		if (ele[i].checked) {
			para.appendChild(document.createTextNode(namePrice));
			para.appendChild(document.createElement("br"));
			para.appendChild(document.createElement("br"));
			chosenProducts.push(ele[i].value);
		}
	}
	    
		
			para.appendChild(document.createElement("hr"));

	// add paragraph and total price
	c.appendChild(para);
	
c.appendChild(document.createTextNode("Total:  " + formatter.format(getTotalPrice(chosenProducts))));		
}


