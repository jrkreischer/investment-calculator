
var investmentCalculator = (function() {
  // Inputs
  var calculator = document.getElementById('investment-calculator');
  var numShares = document.querySelector('#investment-calculator #num-shares');
  var purchasePrice = document.querySelector('#investment-calculator #purchase-price');
  var sellPrice = document.querySelector('#investment-calculator #sell-price');
  var buyCommission = document.querySelector('#investment-calculator #buy-commission');
  var sellCommission = document.querySelector('#investment-calculator #sell-commission');
  var calculate = document.querySelector('#investment-calculator #calculate');
  // Outputs
  var error = document.querySelector('#investment-calculator #error');
  var purchasedFor = document.querySelector('#investment-calculator #purchased-for');
  var soldFor = document.querySelector('#investment-calculator #sold-for');
  var result = document.querySelector('#investment-calculator #result');
  // Vars for calculation
  var s, pp, sp, bc, sc, pf, sf, totalResult;

  function calcResult() {
    'use strict';

    // Get values
    s = parseInt(numShares.value);
    pp = parseFloat(purchasePrice.value);
    sp = parseFloat(sellPrice.value);
    bc = parseFloat(buyCommission.value);
    sc= parseFloat(sellCommission.value);

    // Calculate
    pf = (s * pp) + bc;
    sf = (s * sp) - sc;
    totalResult = sf - pf;

    // Output
    purchasedFor.innerHTML = '$' + pf.toFixed(2);
    soldFor.innerHTML = '$' + sf.toFixed(2);
    result.innerHTML = '$' + totalResult.toFixed(2);
  }

  function validate() {
    'use strict';

    // Clear outputs
    var clearOutputs = (function() {
      var outputs = document.querySelectorAll('#outputs span');
      for (var i = 0; i < outputs.length; i++) {
        outputs[i].innerHTML = '';
      }
    }());

    var validateInputs = (function() {
      var re = /^\d+(?:\.\d{1,2})?$/; // Regex to check for valid number
      var good = 0; // Counter for validated inputs
      var inputs = document.querySelectorAll('#investment-calculator input[type=text]');

      // Loop text inputs, compare with regex, update status(good)
      for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].value.match(re) && inputs[i].value != '') {
          good++;
          if (inputs[i].classList.contains('error')) {
            inputs[i].classList.remove('error');
            error.innerHTML = '&nbsp;';
          }
        } else {
          good--;
          inputs[i].classList.add('error');
        }
      }

      // All inputs pass validation -> calculate, otherwise error message
      if (good == inputs.length) {
        calcResult();
      } else {
        error.innerHTML = '* Please enter valid number(s).';
      }
    }());
  }

  calculate.addEventListener('click', validate);
}());
