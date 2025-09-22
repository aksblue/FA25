// get the elements
const principle_input = document.getElementById("principle_input");
const interest_rate_input = document.getElementById("interest_rate_input");
const time_input = document.getElementById("time_input");
const calculate_btn = document.getElementById("calculate_butn");
const result_value = document.getElementById("result_value");


//function for the button
function calculateInterest() {
    // get the values from inputs and turn them into numbers
    let principle = parseFloat(principle_input.value);
    let rate = parseFloat(interest_rate_input.value);
    let time = parseFloat(time_input.value);

    // check if the values are numbers
    if (isNaN(principle) || isNaN(rate) || isNaN(time)) {
        result_value.textContent = "Please enter valid numbers.";
        return;
    }

    // calculate total and interest
    let total = principle * (1 + (rate / 100) * time);
    let interest = total - principle;

    // prepare sentence with 2 decimals
    result_value.textContent = 
        "With a beginning principal of $" + principle.toFixed(2) +
        " and with a growth rate of " + rate.toFixed(2) +
        "% for " + time.toFixed(2) +
        " years, your total interest will be $" + interest.toFixed(2) +
        " with a grand total of $" + total.toFixed(2) + ".";
}

// call function when button is clicked
calculate_btn.onclick = calculateInterest;
