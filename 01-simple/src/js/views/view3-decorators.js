function decorator(...args) {
  console.log("ES2018 decorator");
}

export
@decorator
class Bar {
  saySomething() {
    return "hello from decorated class";
  }
}
