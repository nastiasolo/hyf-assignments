const funcArray = [
  function first() {
    console.log("Hi! I'm first function");
  },
  function second() {
    console.log("Hi! I'm second function");
  },
  function third() {
    console.log("Hi! I'm third function");
  },
];

funcArray.forEach((func) => {
  func();
});

const constFunction = () => {
  console.log("Hi! I'm function as a const");
};

function normalFunction() {
  console.log("Hi! I'm normal function");
}

constFunction();
normalFunction();

const objectWithFunction = {
  id: 12345,
  isObject: true,
  doSomething: function () {
    console.log("Hi! I'm function as a key in the object");
  },
};

objectWithFunction.doSomething();
objectWithFunction["doSomething"]();
