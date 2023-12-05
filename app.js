const submitBtn = document.querySelector('.submit');
const tipContainer = document.querySelector('.tipContainer');
const subtotal = document.querySelector('.subtotal input');

// returns true if palindrome 
function isPalindrome(num) {
    let originalNum = num;
    let reversedNum = 0;
    while (num > 0) {
      const digit = num % 10;
      reversedNum = reversedNum * 10 + digit;
      num = Math.floor(num / 10);
    }
    return originalNum === reversedNum;
}

function findPalindromeWithSubtotal(e) {
    e.preventDefault();


    const rows = document.getElementsByClassName('tipContainer')[0].getElementsByClassName('generated');
    while(rows.length) {
        rows[0].remove();
    }

    const subtotalVal = subtotal.value*100; //this is a string 12.50 > 1250
    const allPossiblePals = [];
    // make sure subtotal input has a value, else, throw an alert
    if (subtotal.value.length > 0 && isNaN(subtotal.value) == false) {
        
        for (let i = 0; i < 10000000; i++) {
            const currentNumber = i;
            const sum = currentNumber + Number(subtotalVal);

            if (isPalindrome(currentNumber) && isPalindrome(sum) && (currentNumber / Number(subtotal.value))<100) {
                allPossiblePals.push({
                    palindromeNumber: currentNumber/100,
                    palindromeWithSubtotal: sum/100,
                    palindromeTipPercentage: Math.round((currentNumber / Number(subtotal.value)))
                });
            }
        }
    } else {
        alert("Subtotal requires a valid and numerical input!");
    }
   
    for (let i = 0; i < allPossiblePals.length; i++) {
        let tipRow = document.createElement('tr');
        tipRow.classList.add('generated')
        tipContainer.append(tipRow);
        let tipAmt = document.createElement('th');
        let total = document.createElement('th');
        let percent = document.createElement('th');
        tipRow.append(tipAmt);
        tipRow.append(total);
        tipRow.append(percent);
        tipAmt.innerText = `Tip Amount: $${allPossiblePals[i].palindromeNumber}`;
        total.innerText = `Total Including Tip: $${allPossiblePals[i].palindromeWithSubtotal}`;
        percent.innerText = `Tip Percentage ${allPossiblePals[i].palindromeTipPercentage}%`;
    }

}

submitBtn.addEventListener('click', findPalindromeWithSubtotal);