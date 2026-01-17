"use strict";                                           // 1) strict mode

const decBtn = document.getElementById("decrement");    // 2) decrement button
const incBtn = document.getElementById("increment");    // 3) increment button
const countSpan = document.getElementById("count");     // 4) display span

function createCounter(initialValue = 0) {              // 5) factory creates a closure counter
    let count = initialValue;                           // 6) private state variable

    return {                                            // 7) return object with methods
        increment() {                                   // 8) method to increase count
            count++;                                    // 9) update private state
            return count;                               // 10) return new count
        },
        decrement() {                                   // 11) method to decrease count
            count--;                                    // 12) update private state
            return count;                               // 13) return new count
        },
        getValue() {                                    // 14) method to read state
            return count;                               // 15) return current count
        }
    };
}

const counter = createCounter(0);                       // 16) create counter instance

countSpan.innerText = counter.getValue();               // 17) initialize UI with current count

incBtn.addEventListener("click", () => {                // 18) handle increment clicks
    countSpan.innerText = counter.increment();          // 19) increment and display
});

decBtn.addEventListener("click", () => {                // 20) handle decrement clicks
    countSpan.innerText = counter.decrement();          // 21) decrement and display
});
