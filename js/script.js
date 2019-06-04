//Basic Info Section

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


//T-Shirt Info

//Hides the 'Select Theme' option when the user clicks to select the design.
$('#design').on('focus', () => {
    $('#design option:first-child').hide();
});

//Disable color selection when the design is not definited. 
$('#color option').hide();
$('#color').append('<option value="default" disabled selected>Please select a T-shirt theme</option>');

//This event listener sets the color options for the t-shirt based on the t-shirt's design selected.
$('#design').on('change', () => {
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


//Register for Activities

//hold the total cost of all selected activities.
let totalCost = 0;
//Creates an element in the DOM to display the total cost.
$('.activities').append('<span></span>');

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
    $('.activities span').text(`Total: $${totalCost}`);

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
            } else {
                $checkbox.disabled = false;
            }
        }
    });
});


//Payment Info

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
})


//Validation 
function isValidName(name) {
    let validator = /^\S/.test(name);
    if (validator) {
        $('#name').prev().removeClass('errorLabel');
        $('#name').removeClass('errorInput');
        return true;
    } else {
        $('#name').prev().addClass('errorLabel');
        $('#name').addClass('errorInput');
        return false;
    }
};

function isValidEmail(email) {
    let validator = /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
    if (validator) {
        $('#mail').prev().removeClass('errorLabel');
        $('#mail').removeClass('errorInput');
        return true;
    } else {
        $('#mail').prev().addClass('errorLabel');
        $('#mail').addClass('errorInput');
        return false;
    }
};

function isActivityCheck() {
    const $checkbox = $('.activities input');
    for (let i = 0; i < $checkbox.length; i++) {
        check = $checkbox[i]
        if (check.checked) {
            $('.activities legend').removeClass('errorLabel');
            return true
        }
    };
    $('.activities legend').addClass('errorLabel');
    return false
};

function isValidCcNumber(ccNumber) {
    const $paymentSelected = $('#payment').val();
    if ($paymentSelected === 'credit card') {
        let validator = /^\d{13,16}$/.test(ccNumber);
        if (validator) {
            $('#cc-num').prev().removeClass('errorLabel');
            $('#cc-num').removeClass('errorInput');
            return true;
        } else {
            $('#cc-num').prev().addClass('errorLabel');
            $('#cc-num').addClass('errorInput');
            return false;
        }
    } else {
        return true;
    }
};

function isValidZipCode(zipCode) {
    const $paymentSelected = $('#payment').val();
    if ($paymentSelected === 'credit card') {
        let validator = /^\d{5}$/.test(zipCode);
        if (validator) {
            $('#zip').prev().removeClass('errorLabel');
            $('#zip').removeClass('errorInput');
            return true;
        } else {
            $('#zip').prev().addClass('errorLabel');
            $('#zip').addClass('errorInput');
            return false;
        }
    } else {
        return true;
    }
};

function isValidCvv(cvv) {
    const $paymentSelected = $('#payment').val();
    if ($paymentSelected === 'credit card') {
        let validator = /^\d{3}$/.test(cvv);
        if (validator) {
            $('#cvv').prev().removeClass('errorLabel');
            $('#cvv').removeClass('errorInput');
            return true;
        } else {
            $('#cvv').prev().addClass('errorLabel');
            $('#cvv').addClass('errorInput');
            return false;
        }
    } else {
        return true;
    }
};

function validation() {
    let result;
    result = isValidName($('#name').val());
    result = isValidEmail($('#mail').val()) && result;
    result = isActivityCheck() && result;
    result = isValidCcNumber($('#cc-num').val()) && result;
    result = isValidZipCode($('#zip').val()) && result;
    result = isValidCvv($('#cvv').val()) && result;
    return result;
}

$('form').on('submit', (e) => {
    if (validation() === false) {
        e.preventDefault();
    }
})
