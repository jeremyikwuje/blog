---
layout: blog
title: How to dynamically add property to an object in TypeScript
date: 2023-09-23T20:48:57.803Z
---
TypeScript allows you to add properties to an object in three ways:

1.  **Using an interface with optional properties:** Define an interface with the properties that the object must have, and mark the optional properties with a `?`.
2.  **Using an index signature:** Define the type of properties that the object can have, even if you don't know the names of the properties in advance.
3.  **Using the `Record` utility type:** Create an object with any property of any type.

All three methods allow you to dynamically add properties to an object, which can be useful when you are getting the property names from a database or external API.

### 1. Using an interface with optional properties to dynamically add properties to an object
**TypeScript [interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html) allow us to define the shape of an object.** We can specify the properties that the object must have, and their types.

**Dynamically adding properties to an object:**

1.  Define an interface with the required properties.
2.  Mark the optional properties with a  `?`.
3.  Create an object of the interface type.
4.  Use square brackets (`[]`) to dynamically add a new property to the object.
5.  Pass the name of the property as a string to the square brackets.
6.  Assign a value to the property.

**Example:**
```
interface  Car {
	brand: string;
	color?: string; // optional property
}

// Create a Car object.
const car: Car = {
	brand: 'Toyota',
}

// Get the property name from a database or external API.
const propertyName = 'color'

// Dynamically add the property to the object.
car[propertyName] = 'Black'

// Print the object.
console.log(car)
```

**Output**:
```
{ brand: 'Toyota', color: 'Black' }
```

The benefit of dynamically adding properties using an interface with optional property is it allows us to add properties to an object at runtime, without having to modify the interface.

### 2. Using the `Record` utility type to dynamically add any property of any type to an object
The [Record Utility](https://www.typescriptlang.org/docs/handbook/utility-types.html) type in TypeScript allows you to create an object with any property of any type. This is useful for creating dynamic objects, such as objects that are returned from an API or created from a database.

**Example:**
```
const obj: Record<string, any> = {}

obj.brand = 'Toyota'

// Get the property name from a database or external API.
const propertyName = 'color'

// Dynamically add the property to the object.
obj[propertyName] = 'Black'

// Print the object.
console.log(obj)
```

**Output:**
```
{ brand: 'Toyota', color: 'Black' }
```

This code created an object with two properties: `brand` and `color`. The `brand` property is a string, and the `color` property is also a string. However, the Record type allows us to add any type of property to the object, so we could also add a number property, a boolean property, or even an object property.

**Here is another example:**
```
// Get the property name from a database or external API.
const propertyName = 'wheels'

// Dynamically add the property to the object.
obj[propertyName] = 3

console.log(obj) // { brand: 'Toyota', wheels: 3 }
```

The `brand` property is a string, but the `wheels` property is a number.

## 3. Using an index signature to dynamically add properties to an object
**TypeScript [index signature](https://dmitripavlutin.com/typescript-index-signatures/)  allow you to create dynamic objects.** This means that you can add new properties to the object at runtime, even if you didn't define them when you created the object.

**Example:**
```
// Create a dynamic object using an index signature.
const obj: { [key: string]: any } = {}

// Add a new property to the object.
obj.brand = 'Toyota'

// Get the property name from a database or external API.
const propertyName = 'wheels'

// Add another new property to the object.
obj[propertyName] = 3

// Print the object.
console.log(obj) // { brand: 'Toyota', wheels: 3 }
```

**Output:**
```
{ brand: 'Toyota', wheels: 3 }
```

Index signatures can be useful in a variety of situations. You could also use them to create objects to represent database records, API responses, or user configuration data.

God bless!