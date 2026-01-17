"use strict";                                           // 1) strict mode

const expectValInput = document.getElementById("expect-val");       // 2) first input
const expectCheckInput = document.getElementById("expect-check");   // 3) second input
const toBeBtn = document.getElementById("toBe-btn");               // 4) toBe button
const notToBeBtn = document.getElementById("notToBe-btn");         // 5) notToBe button
const expectOutput = document.getElementById("expect-output");     // 6) output <p>

/**
 * expect(val) returns an object with toBe and notToBe methods.
 * The methods "remember" val using closure.
 */
function expect(val) {                                   // 7) outer function captures val
    return {                                             // 8) return an object
        toBe: function (other) {                         // 9) compare equality
            if (val === other) {                         // 10) strict equality
                return true;                             // 11) success
            }
            throw "Not Equal";                           // 12) required error
        },
        notToBe: function (other) {                      // 13) compare inequality
            if (val !== other) {                         // 14) strict inequality
                return true;                             // 15) success
            }
            throw "Equal";                               // 16) required error
        }
    };
}

// helper: read inputs safely
function readInputsAsStrings() {                         // 17) read raw values from inputs
    return {                                             // 18) return object
        a: expectValInput.value,                         // 19) first value
        b: expectCheckInput.value                        // 20) second value
    };
}

toBeBtn.addEventListener("click", () => {                // 21) handle toBe click
    const { a, b } = readInputsAsStrings();              // 22) destructure input object

    try {                                                // 23) try because expect may throw
        const result = expect(a).toBe(b);                // 24) run toBe comparison
        expectOutput.innerText = `Result: ${result}`;    // 25) show true
    } catch (err) {                                      // 26) catch thrown string
        expectOutput.innerText = `Error: ${err}`;        // 27) show error message
    }
});

notToBeBtn.addEventListener("click", () => {             // 28) handle notToBe click
    const { a, b } = readInputsAsStrings();              // 29) read inputs

    try {                                                // 30) try/catch for thrown error
        const result = expect(a).notToBe(b);             // 31) run notToBe comparison
        expectOutput.innerText = `Result: ${result}`;    // 32) show true
    } catch (err) {                                      // 33) catch error
        expectOutput.innerText = `Error: ${err}`;        // 34) show error message
    }
});
