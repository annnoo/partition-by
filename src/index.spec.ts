import { partitionBy } from '.';

describe('partitionBy', () => {
  it('should partition by a typed property', () => {
    interface ExampleInterface {
      test: 'single' | 'double';
    }
    const o: ExampleInterface[] = [
      { test: 'single' },
      { test: 'double' },
      { test: 'single' },
      { test: 'double' },
      { test: 'single' },
    ];

    const partitioned = partitionBy(o, (item) => item.test);

    const single = partitioned.single;
    const double = partitioned.double;
    expect(single.length).toBe(3);
    expect(double.length).toBe(2);
  });
});


