---
layout: blog
title: How to add property to an object in TypeScript
date: 2023-09-23T05:54:24.480Z
---
There are three ways to add a property to an object in TypeScript:

1.  **Create an interface with optional properties** 
2.  **Using an index signature**
3.  **Using the  `Record`  utility type**

### 1. Create an interface and optionally add the properties to an object
**TypeScript [interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html) allow us to define the shape of an object.** We can specify the properties that the object must have, and their types.

**Optionally adding properties to an object:**

1.  Define an interface with the required properties.
2.  Mark the optional properties with a  `?`.
3.  Create an object of the interface type.
4.  Add the optional properties to the object as needed.

**Example:**
```
interface  Car {
	brand: string;
	color?: string; // optional property
}

// Create a Car object.
const car: Car = {
	brand: 'Toyota',
};

// Add the optional color property.
car.color = 'White';

// Print the object.
console.log(car);
```

**Output**:
```
{ brand: 'Toyota', color: 'White' }

```

**Benefits of using interfaces:**
-   Interfaces help us to write more maintainable code.
-   Interfaces make it easier to catch errors early.
-   Interfaces can help us to document our code more effectively.

### 2. Use the Record Utility type to add any property of any type to an object
The [Record Utility](https://www.typescriptlang.org/docs/handbook/utility-types.html) type in TypeScript allows you to create an object with any property of any type.

**Example:**
```
const obj: Record<string, any> = {}

obj.brand = 'Toyota'
obj.color = 'Black'

console.log(obj) // { brand: 'Toyota', color: 'Black' }
```

**Output:**
```
{ brand: 'Toyota', color: 'Black' }
```

This code created an object with two properties: `brand` and `color`. The `brand` property is a string, and the `color` property is also a string. However, the Record type allows us to add any type of property to the object, so we could also add a number property, a boolean property, or even an object property.

**Here is another example:**
```
const obj: Record<string, any> = {}

obj.brand = 'Toyota'
obj.wheels = 4

console.log(obj) // { brand: 'Toyota', wheels: 4 }
```

The `brand` property is a string, but the `wheels` property is a number.

The Record type can be useful in a variety of situations. For example, you could use it to create an object to represent a database record, or to create an object to represent the configuration for a web application.

## 3. Use an index signature to add properties to an object
An [index signature](https://dmitripavlutin.com/typescript-index-signatures/) in TypeScript allows you to define the type of properties that an object can have, even if you don't know the names of the properties in advance.

**Example:**
```
const obj: { [key: string]: any } = {}

obj.brand = 'Toyota'
obj.wheels = 4

console.log(obj) // { brand: 'Toyota', wheels: 4 }
```

**Output:**
```
{ brand: 'Toyota', wheels: 4 }
```

This code created an object with two properties: `brand` and `color`. The `brand` property is a string, and the `color` property is also a string. However, similar to the Record Utility, the index signature allows us to add any type of property to the object, so we could also add a number property, a boolean property, or even an object property.

Index signatures can be useful in a variety of situations. For example, you could use them to define the type of objects that are returned from an API, or to define the type of objects that are created from a database.

If you find this post helpful, you can follow my channel on WhatsApp.
