const storage = require('./storage');

// storage.load()
storage.put('first','firstValue');
storage.put('second','secondValue');
storage.put('third','thirdValue');
storage.put('fouth','fourthValue');
console.log(storage.get('first'));
console.log(storage.getAll());
storage.delete('second');
storage.update('first','updatedFirst');
storage.saveSync();
// storage.save();
storage.clear();
console.log(storage.getAll());
storage.loadSync();
// storage.load();
console.log(storage.getAll());

// // Testing invalid input
// storage.put('first', 'firstValue');
// storage.put('second', 'secondValue');
// storage.delete('second'); // invalid key
// storage.put(2, 'someValue'); // invalid type
// storage.put('cat', 'dog');
// storage.put('cat', 'anotherDog'); // existing key
