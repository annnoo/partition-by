
# PartitionBy-JS

Small helper function for everyone that misses Java's ```partitionBy```.
Fully typed. Should work pretty well :)


# Installation
Just install it
```npm install partitionby```


# Example

You can use the function and specify any kind of partition function that is used to partition the given array
```

enum ExampleEnum {
  ENUM_A = 'a',
  ENUM_B = 'b',
}

interface ExampleInterface {
  type: 'single' | 'double';
  name: string;
  id: number;
  prefixedId: `id-${number}`;
  enum: ExampleEnum;
}

const o: ExampleInterface[] = [
  { type: 'single', name: 'a', id: 1, prefixedId: 'id-1', enum: ExampleEnum.ENUM_A },
  { type: 'double', name: 'b', id: 2, prefixedId: 'id-2', enum: ExampleEnum.ENUM_B },
  { type: 'single', name: 'a', id: 3, prefixedId: 'id-3', enum: ExampleEnum.ENUM_A },
  { type: 'double', name: 'b', id: 4, prefixedId: 'id-4', enum: ExampleEnum.ENUM_B },
  { type: 'single', name: 'a', id: 5, prefixedId: 'id-5', enum: ExampleEnum.ENUM_A },
];


// This will be typed as { single: ExampleInterface[], double: ExampleInterface[] }
const partitionedByType = partitionBy(o, (item) => item.type);
console.log(partitionedByType.single); // This will return the items with type 'single' so the items with id 1, 3 and 5


// This will be typed as { [key: string]: ExampleInterface[] }
// You will not get any type information about the keys, because they are dynamic
const partitionedByName = partitionBy(o, (item) => item.name);
console.log(partitionedByName.a); // This will return the items with name 'a' so the items with id 1

// You can also use the partitionBy function to partition by a property that is an enum
// This will be typed as { [key in ExampleEnum]: ExampleInterface[] }
const partitionedByEnum = partitionBy(o, (item) => item.enum);
console.log(partitionedByEnum[ExampleEnum.ENUM_A]);  // This will return the items with enum ExampleEnum.ENUM_A so the items with id 1, 3 and 5

// You can also use the partitionBy function to partition by a property that is a prefixed string
// This will be typed as { [key: string]: ExampleInterface[] }
// You will get safe access to the keys, because they are prefixed
// So you can safely access partitionedByPrefixedId['id-1'], but not partitionedByPrefixedId['1']
const partitionedByPrefixedId = partitionBy(o, (item) => item.prefixedId);
console.log(partitionedByPrefixedId['id-1'])// This will return the items with prefixedId 'id-1'
console.log(partitionedByPrefixedId['1'])// This will throw an type error, because the key '1' is not applicable to the partitionedByPrefixedId object
```

