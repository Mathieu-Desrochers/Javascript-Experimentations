
compare
-------
Compares the property values of two objects.

__tested__  
The object which values are tested.

    {
      name: "Alice",
      age: 5.25,
      address: {
        street: "Alisson Street",
        city: "Alisson City",
        country: "Canada"
      }
    }

__expected__  
The object which values are tested against.  
Any property found on expected but not on tested causes the function to return false.  
Any property found only on tested is ignored.

    {
      name: "Alice",
      address: {
        street: "Alisson Street",
        city: "Alisson City"
      }
    }

__result__  
Whether the property values were the same.

    true
