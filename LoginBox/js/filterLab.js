"use strict";                                         // 1) strict mode

const filterInput = document.getElementById("filter-input");   // 2) input box
const filterBtn = document.getElementById("filter-btn");       // 3) button
const filterOutput = document.getElementById("filter-output"); // 4) output <p>

function parseNumberList(text) {                       // 5) helper to parse input string
    return text                                        // 6) start with raw string
        .split(",")                                    // 7) split by comma into array of strings
        .map(s => s.trim())                             // 8) remove spaces around each entry
        .filter(s => s.length > 0)                      // 9) remove empty entries
        .map(Number);                                   // 10) convert each string to number
}

filterBtn.addEventListener("click", () => {             // 11) run logic when button clicked
    const values = parseNumberList(filterInput.value);  // 12) read input & convert to numbers

    // 13) validate: check if any value is NaN (not a valid number)
    const hasInvalid = values.some(n => Number.isNaN(n));

    if (filterInput.value.trim() === "") {              // 14) if user typed nothing
        filterOutput.innerText = "Please enter some numbers."; // 15) show message
        return;                                         // 16) stop
    }

    if (hasInvalid) {                                   // 17) if any invalid number exists
        filterOutput.innerText = "Invalid input. Use comma-separated numbers only.";
        return;                                         // 18) stop
    }

    const evens = values.filter(n => n % 2 === 0);      // 19) filter even numbers

    filterOutput.innerText = `Result: ${evens.join(", ")}`; // 20) display result
});
