var operator;
var currentSelection;
document.querySelectorAll(".operator").forEach(item => item.addEventListener("click", (e) => {
  if (e.target.classList.contains("selected")) {
    currentSelection.classList.remove("selected");
    operator = undefined;
    currentSelection = undefined;
    return;
  }
  if (currentSelection)
    currentSelection.classList.remove("selected");
  currentSelection = e.target;
  currentSelection.classList.add("selected");
  operator = e.target.id;
}));

fetch('../wasm-calculator/out/main.wasm').then(response =>
  response.arrayBuffer()
).then(bytes => WebAssembly.instantiate(bytes)).then(results => {
  instance = results.instance;
  document.getElementById("container").textContent = "Main result:  " + instance.exports.main();

  document.getElementById("submit").addEventListener("click", () => {
    let res;
    let first = document.getElementsByClassName("first")[0].value;
    let second = document.getElementsByClassName("second")[0].value;

    switch (operator) {
      case "plus":
        res = instance.exports.add(first, second);
        break;
      case "minus":
        res = instance.exports.subtract(first, second);
        break;
      case "multiply":
        res = instance.exports.multiply(first, second);
        break;
      case "divide":
        if (second == 0) {
          console.log("can't divide by 0");
          res = "Can't divide by 0";
        } else {
          res = instance.exports.divide(first, second);
        }
        break;
      default:
        console.log("no operator selected!");
        break;
    }
    document.getElementById("result").textContent = res;
    console.log("Result: " +res);
  })
}).catch(console.error);

