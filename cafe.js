// initialize some variables
let i = 0
    ,temp
    ,drinkItems = [] //Create an empty array that we will use to store all the Drink objects created.
    ,foodItems = [] //Create an empty array that we will use to store all the Food objects created.
    ,gratuity
    ;


function buildForm(formType){
    
    let theForm = '<div class="row"><div class="col"><strong>Item</strong></div><div class="col"><strong>Price</strong></div><div class="col"><strong>Quantity</strong></div><div class="col"><strong>Total</strong></div></div><hr />'
    ,i = 0
    ,j = 0
    ,temp = []
    ;
    
    switch(formType){
            
        case "drinks":
            //alert("drink up");
            temp = JSON.parse(sessionStorage.getItem("drinkItems"));//Get the array of drinkItems objects from sessionStorage and assign it to the array 'temp'
        //console.log(temp);
        break;
        
        case "food":
            //alert("eat up");
            temp = JSON.parse(sessionStorage.getItem("foodItems"));//Get the array of foodItems objects from sessionStorage and assign it to the array 'temp'
        //console.log(temp);
        break;
            
    }
    
    //console.log(temp);
        
    // loop through and build the form elements
    document.getElementById(formType + "ModalBody").innerHTML = "";
    temp.forEach(function(p) {
        theForm += '<div class="row"><div class="col-4"><strong>' + p.description + '</strong></div><div class="col-3">$<input type="text" name="' + formType + 'Price' + i + '" id="' + formType + 'Price' + i + '" readonly="true" value="' + p.price + '" size="5" class="currency" /></div><div class="col-2"><select name="' + formType + 'Quantity' + i + '" id="' + formType + 'Quantity' + i + '" onchange="updateGrandTotal();">';
        for(j = 0; j <= 10; j++){
            if(j == p.quantity){
                theForm += '<option value="' + j + '" selected>' + j + '</option>'; 
            }else{
                theForm += '<option value="' + j + '">' + j + '</option>';
            }
        }
        theForm += '</select></div><div class="col-3">$<input type="text" name="' + formType + 'Total' + i + '" id="' + formType + 'Total' + i + '" readonly="true" size="5" class="currency" /></div></div>';
        //document.getElementById(formType + "ModalBody").innerHTML += theForm;
        i++;
    });
    //console.log(theForm);
    document.getElementById(formType + "ModalBody").innerHTML = theForm;
}

//Below we create the constructor function that will be used to create all Drink objects.
function Drink (index, description, price, quantity) {
    this.index = index;
    this.description = description;
    this.price = price;
    this.quantity = quantity;
}

//Below we create the constructor function that will be used to create all Food objects.
function Food (index, description, price, quantity) {
    this.index = index,
    this.description = description;
    this.price = price;
    this.quantity = quantity;
}

/* 
When the page loads, we check to see whether it is the first time we are loading this page or not. If it is the first time we are loading the page, we initialize the values we want to store in sessionStorage. If it is not the first time we are loading the page, then we can assume that we already have some information about drinkItems and foodItems objects stored in SessionStorage. We use this information in sessionStorage to update information about each drinkItem and fooditem object as we update on our HTML page. 
*/
function initialize() {
    //console.log(sessionStorage.getItem("initialized"));
    
    // uncomment the next line if you want to re-initialize
    // sessionStorage.setItem("initialized", null);
    
    if (sessionStorage.getItem("initialized") === "null") {
        console.log("initialize!!");
        // initialize our drink items
        sessionStorage.setItem("drinkItems", null);
        i = 0;
        drinkItems.push(new Drink(i, "Bottled Water", "2.00", 0)); i++;
        drinkItems.push(new Drink(i, "Coffee", "1.25", 0)); i++;
        drinkItems.push(new Drink(i, "Iced Tea", "1.75", 0)); i++;
        drinkItems.push(new Drink(i, "Lemonade", "1.50", 0)); i++;
        drinkItems.push(new Drink(i, "Soda", "3.75", 0)); i++;
        sessionStorage.setItem("drinkItems", JSON.stringify(drinkItems));
        
        // initialize our food items
        sessionStorage.setItem("foodItems", null);
        i = 0;
        foodItems.push(new Food(i, "Dessert", "7.95", 0)); i++;
        foodItems.push(new Food(i, "Pasta", "15.95", 0)); i++;
        foodItems.push(new Food(i, "Pizza", "21.95", 0)); i++;
        foodItems.push(new Food(i, "Salad", "11.95", 0)); i++;
        foodItems.push(new Food(i, "Sandwich", "14.95", 0)); i++;
        foodItems.push(new Food(i, "Soup", "12.95", 0)); i++;
        sessionStorage.setItem("foodItems", JSON.stringify(foodItems));
        sessionStorage.setItem("gratuity", 0);
        sessionStorage.setItem("initialized", true);
    }
    
    //build the drinks form
    buildForm("drinks");

    //build the food form
    buildForm("food");
    
    //update the gratuity value
    document.getElementById("gratuity").value = sessionStorage.getItem("gratuity");
    
    // update the totals
    updateGrandTotal();
        
}

function newCheck(){
    sessionStorage.setItem("initialized", null);
    initialize();
}

function updateGrandTotal(){
    let backgroundColor = "white"
        ,drinkItems = JSON.parse(sessionStorage.getItem("drinkItems"))
        ,drinkTotal = 0
        ,foodItems = JSON.parse(sessionStorage.getItem("foodItems"))
        ,foodTotal = 0
        ,grandTotal = 0
        ,gratuity
        ,i = 0
        ,quantity
        ,runningTotal = ""
        ,total = 0
        ;
    
    // loop through drink items and total
    i = 0;
    total = 0;
    runningTotal += '<div class="row"><div class="col-12"><h5 style="margin-bottom: -15px;">Drinks</h5></div></div><hr />';
    runningTotal += '<div class="row" style="background-color: lightgray; margin-bottom: -15px; margin-top: -15px;"><div class="col-6"><strong>Item</strong></div><div class="col-2 currency"><strong>Price</strong></div><div class="col-1 currency"><strong>#</strong></div><div class="col-3 currency"><strong>Total</strong></div></div><hr style="margin-bottom: 0px;" />';
    drinkItems.forEach(function(p) {
        // get the quantity
        quantity = document.getElementById("drinksQuantity" + i).value;
        // update the quantity in the array
        drinkItems[i].quantity = quantity;
        // calculate the total
        total = p.price * quantity;
        // update the item total
        document.getElementById("drinksTotal" + i).value = total.toFixed(2);
        // update the drinkTotal
        drinkTotal += total;
        // set the background color
        backgroundColor = i % 2 == 0 ? "white" : "lightyellow";
        // update the running total section
        runningTotal += '<div class="row" style="background-color: ' + backgroundColor  + '"><div class="col-6"><strong>' + p.description + '</strong></div><div class="col-2 currency">$' + p.price + '</div><div class="col-1 currency">' + p.quantity + '</div><div class="col-3 currency">$' + total.toFixed(2) + '</div></div>';
        i = i + 1;
    });
    // update the array in storage
    sessionStorage.setItem("drinkItems", JSON.stringify(drinkItems));
    
    // update grandTotal
    grandTotal += drinkTotal;
    // update the running total section
    runningTotal += '<div class="row" style="background-color: lightblue;"><div class="col-6"><strong>Drink Total</strong></div><div class="col-2"></div><div class="col-1 currency"></div><div class="col-3 currency">$' + drinkTotal.toFixed(2) + '</div></div><br />';
    
    // loop through food items and total
    i = 0;
    total = 0;
    runningTotal += '<div class="row"><div class="col-12"><h5 style="margin-bottom: -15px;">Food</h5></div></div><hr />';
    runningTotal += '<div class="row" style="background-color: lightgray; margin-bottom: -15px; margin-top: -15px;"><div class="col-6"><strong>Item</strong></div><div class="col-2 currency"><strong>Price</strong></div><div class="col-1 currency"><strong>#</strong></div><div class="col-3 currency"><strong>Total</strong></div></div><hr style="margin-bottom: 0px;" />';
    foodItems.forEach(function(p) {
        // get the quantity
        quantity = document.getElementById("foodQuantity" + i).value;
        // update the quantity in the array
        foodItems[i].quantity = quantity;
        // calculate the total
        total = p.price * quantity;
        // update the item total
        document.getElementById("foodTotal" + i).value = total.toFixed(2);
        // update the foodTotal
        foodTotal += total;
        // set the background color
        backgroundColor = i % 2 == 0 ? "white" : "lightyellow";
        // update the running total section
        runningTotal += '<div class="row" style="background-color: ' + backgroundColor  + '"><div class="col-6"><strong>' + p.description + '</strong></div><div class="col-2 currency">$' + p.price + '</div><div class="col-1 currency">' + p.quantity + '</div><div class="col-3 currency">$' + total.toFixed(2) + '</div></div>';
        i = i + 1;
    });
    // update the array in storage
    sessionStorage.setItem("foodItems", JSON.stringify(foodItems));
    // update grandTotal
    grandTotal += foodTotal;
    // update the running total section
    runningTotal += '<div class="row" style="background-color: lightblue;"><div class="col-6"><strong>Food Total</strong></div><div class="col-2"></div><div class="col-1"></div><div class="col-3 currency">$' + foodTotal.toFixed(2) + '</div></div><br />';
    
    //add gratuity
    gratuity = parseInt(document.getElementById("gratuity").value);
    sessionStorage.setItem("gratuity", gratuity);
    grandTotal += gratuity;
    
    runningTotal += '<div class="row"><div class="col-12"><h5 style="margin-bottom: -15px;">Gratuity</h5></div></div><hr />';
    runningTotal += '<div class="row" style="background-color: lightblue; margin-bottom: -15px; margin-top: -15px;"><div class="col-6"><strong>Gratuity</strong></div><div class="col-2 currency"></div><div class="col-1 currency"></div><div class="col-3 currency">$' + gratuity.toFixed(2) + '</div></div><hr />';
    
    // grand total row
    runningTotal += '<div class="row"><div class="col-12"><h5 style="margin-bottom: -15px;">Grand Total</h5></div></div><hr />';
    runningTotal += '<div class="row" style="background-color: lightblue; margin-bottom: -15px; margin-top: -15px;"><div class="col-6"><strong>Grand Total</strong></div><div class="col-2 currency"></div><div class="col-1 currency"></div><div class="col-3 currency">$' + grandTotal.toFixed(2) + '</div></div><hr />';
    
    document.getElementById("runningTotal").innerHTML = runningTotal;
    document.getElementById("grandTotal").value = grandTotal.toFixed(2);
    
}