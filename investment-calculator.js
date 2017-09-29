
var investmentCalculator = (function() {
  // Inputs
  var calculator = document.getElementById('calculator');
  var numShares = document.getElementById('num-shares');
  var purchasePrice = document.getElementById('purchase-price');
  var sellPrice = document.getElementById('sell-price');
  var buyCommission = document.getElementById('buy-commission');
  var sellCommission = document.getElementById('sell-commission');
  var calculate = document.getElementById('calculate');
  // Outputs
  var error = document.getElementById('error');
  var purchasedFor = document.getElementById('purchased-for');
  var soldFor = document.getElementById('sold-for');
  var result = document.getElementById('result');
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
      var reDecPercent = /^(\.\d{1,2})?$/; // Regex for decimal percentage
      var good = 0; // Counter for validated inputs
      var inputs = document.querySelectorAll('#calculator input[type=text]');

      // Loop text inputs, compare with regex, update status(good)
      for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].value.match(re) && inputs[i].value != '') {
          good++;
          if (inputs[i].style.borderColor == 'red') {
            inputs[i].style.borderColor = 'initial';
          }
        } else {
          good--;
          inputs[i].style.borderColor = 'red';
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
