/* Basic Info Section */

// Focus in the first input element of the form, in this case, 'Name' is the first input to be filled out.
$('#name').focus();

// Hide and show the 'Other Title' input field when the 'other' option is selected for Job Title.
$('#other-title').hide();
$('#title').on('change', () => {
    const $titleSelected = $('#title').val();
    if ($titleSelected === 'other') {
        $('#other-title').show();
    } else {
        $('#other-title').hide();
    }
});

/* T-Shirt Info */

//Initially hides the Color label and Select Menu until a T-shirt design is selected.
$('#colors-js-puns').hide();

//Hides the 'Select Theme' option when the user clicks to select the design.
$('#design').on('focus', () => {
    $('#design option:first-child').hide();
});

//Disable color selection when the design is not definited. 
$('#color option').hide();
$('#color').append('<option value="default" disabled selected>Please select a T-shirt theme</option>');

//This event listener sets the color options for the t-shirt based on the t-shirt's design selected.
$('#design').on('change', () => {
    //It shows the color options to the t-shirt design selected.
    $('#colors-js-puns').show()
    // Remove the default 'placeholder' for color options when the a design option is selected.
    $('#color option[value="default"]').remove();
    // Hold the value of the design selected.
    const $designSelected = $('#design').val();
    // Hide and Show t-shirt color options based on the design selected.
    if ($designSelected === 'js puns') {
        $('#color option').hide();
        $('#color option:nth-child(-n+3)').show();
        $("#color").val($("#color option:first").val());
    } else {
        $('#color option').hide();
        $('#color option:nth-child(n+4)').show();
        $("#color").val($("#color option:nth-child(n+4)").val());
    }
});

/* Register for Activities */

//hold the total cost of all selected activities.
let totalCost = 0;
//Creates an element in the DOM to display the total cost.
$('.activities').append('<span class="totalPrice"></span>');

//This event listener add (when checked) and subtract (when unchecked) the price of the activity to the total cost.
$('.activities').on('change', (e) => {
    //It holds the input element.
    let input = e.target;
    //It holds the text content of it.
    let inputText = input.parentNode.textContent;
    //It finds the spot where the cost value is placed in the text content.
    let priceIndex = inputText.indexOf('$');
    //Extract the price of the text content as an string.
    let price = inputText.slice(priceIndex + 1);
    //Add the price to the totalCost variable when checked and subtract its value when unchecked.
    if (input.checked) {
        totalCost += parseInt(price);
    } else {
        totalCost -= parseInt(price);
    }
    //it displayes the total cost and keeps the total cost updated every time there is a change in the event.
    $('.activities span').eq(0).text(`Total: $${totalCost}`);

    // It fins the spot where the day and time starts in that text content.
    let dateStartIndex = inputText.indexOf('—');
    // It fins the spott where the day and time ends in that text content.
    let dateEndIndex = inputText.indexOf(',');
    //Extract the date from the text content.
    let date = inputText.slice(dateStartIndex, dateEndIndex);
    //It loops through all input elements to find activities with the same date.
    $('.activities input').each(function (i) {
        let $checkbox = $('.activities input')[i];
        //If an activity has been checked it will disable all activities with the same date and vice and verse.
        if ($checkbox.parentNode.textContent.includes(date) && $checkbox.parentNode.textContent !== inputText) {
            if (input.checked) {
                $checkbox.disabled = true;
                $checkbox.parentElement.classList.add("disabled");
            } else {
                $checkbox.disabled = false;
                $checkbox.parentElement.classList.remove("disabled");
            }
        }
    });
});

/* Payment Info */

//It sets the credit card option as the first and default option
$('#payment option[value="select_method"]').hide();
$('#payment').val($('#payment option[value="credit card"]').val());
$('p').hide();

//This event listener hides and shows the payment's instruction for the payment method selected
$('#payment').on('change', () => {
    const $paymentSelected = $('#payment').val();
    if ($paymentSelected === 'paypal') {
        $('#credit-card').hide();
        $('p').eq(1).hide();
        $('p').eq(0).show();
    } else if ($paymentSelected === 'bitcoin') {
        $('#credit-card').hide();
        $('p').eq(0).hide();
        $('p').eq(1).show();
    } else {
        $('#credit-card').show();
        $('p').hide();
    }
});

/* Validation */

// Creating and appending the error messages to the DOM
$('label[for="name"]').before(`<span id="error-name" class="errorMessage">⚠️ Name field can't be empty</span>`);
$('label[for="mail"]').before(`<span id="error-mail" class="errorMessage">⚠️ Email field must be a valid e-mail address</span>`);
$('.activities').append(`<span id="error-act" class="errorMessage">⚠️ Please select at least one activity</span>`);
$('#credit-card').before(`<span id="error-card-blank" class="errorMessage">⚠️ Please enter a credit card number</span>`);
$('#credit-card').before(`<span id="error-card-digit" class="errorMessage">⚠️ Please enter a number that is between 13 and 16 digits long.</span>`);
$('#credit-card').before(`<span id="error-zip" class="errorMessage">⚠️ The Zip Code field should be 5-digit number</span>`);
$('#credit-card').before(`<span id="error-cvv" class="errorMessage">⚠️ The CVV should be exactly 3 digits long</span>`);

//Hide all the error messages from the DOM as initially default
$('.errorMessage').hide();

// Name Validator
function isValidName(name) {
    //Using Regex to make sure the user doesn't submit an empty field.
    let validator = /^\S/.test(name);
    if (validator) {
        $('#error-name').hide();
        $('#name').prev().removeClass('errorLabel');
        $('#name').removeClass('errorInput');
        return true;
    } else {
        $('#error-name').show();
        $('#name').prev().addClass('errorLabel');
        $('#name').addClass('errorInput');
        return false;
    }
};

// Email Validator
function isValidEmail(email) {
    //Using Regex to make sure the user submits a valid email format.
    let validator = /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
    if (validator) {
        $('#error-mail').hide();
        $('#mail').prev().removeClass('errorLabel');
        $('#mail').removeClass('errorInput');
        return true;
    } else {
        $('#error-mail').show();
        $('#mail').prev().addClass('errorLabel');
        $('#mail').addClass('errorInput');
        return false;
    }
};

//Activities Validator
function isActivityCheck() {
    const $checkbox = $('.activities input');
    //Looping through all checkboxes to make sure the user has checked at least one activity
    for (let i = 0; i < $checkbox.length; i++) {
        check = $checkbox[i]
        if (check.checked) {
            $('#error-act').hide();
            $('.activities legend').removeClass('errorLabel');
            return true
        };
    };
    $('#error-act').show();
    $('.activities legend').addClass('errorLabel');
    return false
};

//Credit Cart Validator
function isValidCcNumber(ccNumber) {
    const $paymentSelected = $('#payment').val();
    //If the credit card option is selected, enable validator.
    if ($paymentSelected === 'credit card') {
        //Using Regex to make sure the user provides a valid credit card number
        let validator = /^\d{13,16}$/.test(ccNumber);
        if (validator) {
            $('#error-card-blank').hide();
            $('#error-card-digit').hide();
            $('#cc-num').prev().removeClass('errorLabel');
            $('#cc-num').removeClass('errorInput');
            return true;
            //If the user submits a credit card number shorter than 13 or longer than 16 digits, it displayes one message.
        } else if (ccNumber !== '') {
            $('#error-card-blank').hide();
            $('#error-card-digit').show();
            $('#cc-num').prev().addClass('errorLabel');
            $('#cc-num').addClass('errorInput');
            return false;
            //If the user submits a empty credit card field, it displayes a different message.
        } else {
            $('#error-card-digit').hide();
            $('#error-card-blank').show();
            $('#cc-num').prev().addClass('errorLabel');
            $('#cc-num').addClass('errorInput');
            return false;
        }
    } else {
        return true;
    };
};

// Zip Code Validator
function isValidZipCode(zipCode) {
    const $paymentSelected = $('#payment').val();
    //If the credit card option is selected, enable validator.
    if ($paymentSelected === 'credit card') {
        //Using Regex to make sure the user provides a valid Zip Code.
        let validator = /^\d{5}$/.test(zipCode);
        if (validator) {
            $('#error-zip').hide();
            $('#zip').prev().removeClass('errorLabel');
            $('#zip').removeClass('errorInput');
            return true;
        } else {
            $('#error-zip').show();
            $('#zip').prev().addClass('errorLabel');
            $('#zip').addClass('errorInput');
            return false;
        }
    } else {
        return true;
    };
};

// CVV Validator
function isValidCvv(cvv) {
    const $paymentSelected = $('#payment').val();
    //If the credit card option is selected, enable validator.
    if ($paymentSelected === 'credit card') {
        //Using Regex to make sure the user provides a valid CVV.
        let validator = /^\d{3}$/.test(cvv);
        if (validator) {
            $('#error-cvv').hide();
            $('#cvv').prev().removeClass('errorLabel');
            $('#cvv').removeClass('errorInput');
            return true;
        } else {
            $('#error-cvv').show();
            $('#cvv').prev().addClass('errorLabel');
            $('#cvv').addClass('errorInput');
            return false;
        }
    } else {
        return true;
    };
};

/* This Event Listener is a "RESET" for credit card errors warning, in case the user switches to Paypal or Bitcoin
 after trying credit card option unsuccessfully, the messages and display warning must be removed when switching
 to a different option */
$('#payment').on('change', () => {
    const $paymentSelected = $('#payment').val();
    //If the payment option is paypal or bitcoin all error messages from previews credit card attemped must be removed.
    if ($paymentSelected === 'paypal' || $paymentSelected === 'bitcoin') {
        $('.errorMessage').hide();
        $('#cc-num').prev().removeClass('errorLabel');
        $('#cc-num').removeClass('errorInput');
        $('#cvv').prev().removeClass('errorLabel');
        $('#cvv').removeClass('errorInput');
        $('#zip').prev().removeClass('errorLabel');
        $('#zip').removeClass('errorInput');
    };
});

/*This (Master) funtion calls all validators and store the boolean value returned from each function in a variable.
This value is compared to the next validator and the result is stored in the same variable. All validator must return
true otherwise, this function will return false.
*/
function isFormValid() {
    let result;
    result = isValidName($('#name').val());
    result = isValidEmail($('#mail').val()) && result;
    result = isActivityCheck() && result;
    result = isValidCcNumber($('#cc-num').val()) && result;
    result = isValidZipCode($('#zip').val()) && result;
    result = isValidCvv($('#cvv').val()) && result;
    return result;
};

//Real-time Error Message for name field.
$('#name').on('input', (e) => {
    const text = e.target.value;
    isValidName(text);
});

//Real-time Error Message for email field.
$('#mail').on('input', (e) => {
    const text = e.target.value;
    isValidEmail(text);
});

//Real-time Error Message for activities.
$('.activities').on('input', isActivityCheck);

//Real-time Error Messages for credit card.
$('#cc-num').on('input', (e) => {
    const text = e.target.value;
    isValidCcNumber(text);
});

//Real-time Error Message for zip code.
$('#zip').on('input', (e) => {
    const text = e.target.value;
    isValidZipCode(text);
});

//Real-time Error Message for CVV.
$('#cvv').on('input', (e) => {
    const text = e.target.value;
    isValidCvv(text);
});

//Event listener preventing the browser to send the data to the server in case the form has an invalid field.
$('form').on('submit', (e) => {
    //If the isFormValid function returns false (based on the validator functions), the button won't submit the data.
    if (isFormValid() === false) {
        e.preventDefault();
    }
});