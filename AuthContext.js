class Animal {
  speak() {
    console.log('Animal makes a sound');
  }
}

class Dog extends Animal {
  // Overriding the speak() method of Animal class
  speak() {
    console.log('Dog barks');
  }
}

const animal = new Animal();
animal.speak();

const dog = new Dog();
dog.speak();
