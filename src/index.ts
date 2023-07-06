export type PartitionFunction<Input, Output> = (input: Input) => Output;

type ValidObjectKey = string | number | bigint | boolean;

type Stringify<T extends ValidObjectKey> = `${T}`;
export type PartitionOutput<Input, PartitionFunctionOutput extends ValidObjectKey> = {
  [key in Stringify<PartitionFunctionOutput>]: Input[];
};

export const partitionBy = <Input, PartitionFunctionOutput extends ValidObjectKey>(
  input: Input[],
  partitionFunction: PartitionFunction<Input, PartitionFunctionOutput>,
): PartitionOutput<Input, ReturnType<typeof partitionFunction>> => {
  const output: PartitionOutput<Input, PartitionFunctionOutput> = {} as PartitionOutput<
    Input,
    ReturnType<typeof partitionFunction>
  >;
  input.forEach((item) => {
    const bucket = partitionFunction(item).toString() as Stringify<PartitionFunctionOutput>;
    if (!output[bucket]) {
      output[bucket] = [];
    }
    output[bucket].push(item);
  });
  return output;
};
