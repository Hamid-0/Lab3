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


        document.getElementById("start").style.display = "block";


    }
    if (tabName == 'Client') {
        hide();
        document.getElementById("chose").disabled = true;
        document.getElementById("org").checked = false;
        document.getElementById("cbNone").checked = false;
        document.getElementById("cbLactoseIntolerant").checked = false;
        document.getElementById("cbNutAllergy").checked = false;
        document.getElementById("cbNutAllergy").disabled = false;
        document.getElementById("cbLactoseIntolerant").disabled = false;
        document.getElementById("cbNone").disabled = false;

        total = 0;
        container.innerHTML = '';


    }


}

function hide() {
    var x = document.getElementById("start");

    x.style.display = "none";

}

function organicCheck() {
    var x = document.getElementById("org").checked;
    organic = x;


}


// generate a checkbox list from a list of products
// it makes each product name as the label for the checkbos

function populateListProductChoices(slct1, slct2) {
    container.innerHTML = '';
    var s1 = document.getElementById(slct1);
    var s2 = document.getElementById(slct2);
    bNext = document.getElementById("chose");

    if (s1.value != "option") {
        document.getElementById("chose").disabled = false;
    } else {
        document.getElementById("chose").disabled = true;

    }
    var cbNone = document.getElementById("cbNone");
    var cbLactoseIntolerant = document.getElementById("cbLactoseIntolerant");
    var cbNutAllergy = document.getElementById("cbNutAllergy");



    if (cbNone.checked) {
        cbLactoseIntolerant.disabled = true;
        cbNutAllergy.disabled = true;
    } else {
        cbLactoseIntolerant.disabled = false;
        cbNutAllergy.disabled = false;
    }
    if (cbNutAllergy.checked || cbLactoseIntolerant.checked) {
        cbNone.disabled = true;
    } else {
        cbNone.disabled = false;
    }

    if (cbNone.checked || cbLactoseIntolerant.checked || cbNutAllergy.checked) {
        bNext.disabled = false;
    } else {
        bNext.disabled = true;
    }

    // s2 represents the <div> in the Products tab, which shows the product list, so we first set it empty
    s2.innerHTML = "";

    // obtain a reduced list of products based on restrictions
    if (cbLactoseIntolerant.checked && cbNutAllergy.checked) {
        restriction = "Lactose Intolerance/Sensitivity and Nut Allergy"
    } else {
        restriction = s1.value;
    }
    var optionArray = restrictListProducts(products, restriction, organic);

    // for each item in the array, create a checkbox element, each containing information such as:
    // <input type="checkbox" name="product" value="Bread">
    // <label for="Bread">Bread/label><br>
    container.style.setProperty('--grid-rows', optionArray.length / 3);
    container.style.setProperty('--grid-cols', 3);
    for (i = 0; i < optionArray.length; i++) {
        price = formatter.format(optionArray[i].price);
        productName = optionArray[i].name;
        namePrice = productName + "  " + price;

        // create the checkbox and add in HTML DOM
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "product";
        checkbox.className = "item";
        checkbox.value = productName;
        var productImage = document.createElement('img');
        productImage.src = optionArray[i].image;
        // create a label for the checkbox, and also add in HTML DOM
        var label = document.createElement('label')
        label.htmlFor = namePrice;
        label.appendChild(productImage);
        label.appendChild(document.createElement("br"));
        label.appendChild(document.createTextNode(namePrice));


        let cell = document.createElement("div");
        cell.appendChild(label);
        cell.appendChild(checkbox);

        container.appendChild(cell).className = "grid-item";


    }
}


//https://stackoverflow.com/questions/57550082/creating-a-16x16-grid-using-javascript

var container = document.getElementById("container");


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