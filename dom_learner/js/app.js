const addBtn = document.getElementById("add");
const removeBtn = document.getElementById("remove");
const container = document.getElementById("cards-container");

let count = 0;


// add elements dynamically 
addBtn.addEventListener("click", () => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.id = ++count;

  card.innerHTML = `
    <h3>Card ${count}</h3>
    <p>Created dynamically</p>
  `;

  container.appendChild(card);
});

// remove elements 
removeBtn.addEventListener("click", () => {
  if (container.lastElementChild) {
    container.removeChild(container.lastElementChild);
    count--;
  }
});
 
// event
container.addEventListener("click", (e) => {
  if (e.target.closest(".card")) {
    e.target.closest(".card").classList.toggle("active");
  }
});
