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


    let dayIndex = inputText.indexOf('—');
    let timeIndex = inputText.indexOf(',');
    let schedule = inputText.slice(dayIndex, timeIndex);
    //console.log(schedule);
    $('.activities input').each(function (i){
        let $checkbox = $('.activities input')[i];
       if($checkbox.parentNode.textContent.includes(schedule) && $checkbox.parentNode.textContent !== inputText ) {
        if(input.checked) {
            $checkbox.disabled = true;
        } else {
            $checkbox.disabled = false;
        }
       }
        });
})
