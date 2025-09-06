
// Helper function to set innerText
function setText(id, text) {
    document.getElementById(id).innerText = text;
}

function DatingProblem() {
    let tickets = 3;
    let price = 14.00;


    // Calculate total cost
    let total = tickets * price;

    // Update HTML using helper function
    setText("ticketNum", "Tickets: " + tickets);
    setText("ticketCost", "Cost: $" + price);
    setText("ttCost", "Total: $" + total);
}

// Shopping
function Shopping() {
    // Initial bank balance
    let balance = 235.87;

    // Prices
    let shirt = 35;
    let pants = 75;
    let shoes = 60;
    let jacket = 70;
    let canAddJacket = true;

    let OutfitCost = shirt + pants + shoes; 

    // Calculate remaining balance
    let remaining = balance - OutfitCost;

    //check if you can add a jacket
    if (remaining >= jacket){
        remaining = remaining - jacket;
    }else{
        canAddJacket = false;
    }

    setText("bank", "After purchasing the outfit, my bank account balance is $" + remaining);

    setText("addJacket", "Add Jacket: " + canAddJacket);
    
}

// Pizza Problem
function PizzaProblem() {
    // Calculate total slices
   let pizzas = 4;
   let slicesPerPizza = 8;
   let slicesPerStudent = 2.5;

   let totalSlices = pizzas * slicesPerPizza;
   let studentsFed = Math.floor(totalSlices / slicesPerStudent);
   let slicesLeft = totalSlices % slicesPerStudent;

    // Create output text
   let textBox = "Students: "+ studentsFed + "\nRector: " + slicesLeft

    setText("profPizza", textBox);
}


// Monty's Mega Bar
function MontysMegaBar() {
    let adultPrice = 12.00;
    let childPrice = 6;
    let drinkPrice = 1.50;

    // Monty's MegaBar Receipt
    let adults = 2;
    let children = 1;
    let drinks = 3;

    // Calculate total cost
    adultTolal = adults * adultPrice;
    childTotal = children * childPrice;
    drinkTotal = drinks * drinkPrice;
    let total = adultTolal + childTotal + drinkTotal;

    // Update HTML using helper function
    setText("Monty", "$" + total);
}


// Average Tips
function AverageTips() {
    let week1 = 202.45;
    let week2 = 134.97;
    let week3 = 256.63;
    let week4 = 178.22;
    let total = week1 + week2 + week3 + week4;
    let average = total / 4;

    setText("tips", "Weekly Tip Average: $" + average);
}


// Main function to call all other functions
function main() {
    DatingProblem();
    Shopping();
    PizzaProblem();
    MontysMegaBar();
    AverageTips();
}

// Call the function to execute
main();