const crypto = require("crypto");
const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it('should return the partition key if provided in event', () => {
    const partitionKey = 'my-partition-key';
    const event = { partitionKey };
    expect(deterministicPartitionKey(event)).toBe(partitionKey);
  });

  it('should return a SHA3-512 hash if partition key is not provided in event', () => {
    const event = { data: { name: 'John Doe' } };
    const hash = crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex");
    expect(deterministicPartitionKey(event)).toBe(hash);
  });

  it('should return a SHA3-512 hash if partition key is longer than 256 characters', () => {
    const partitionKey = 'a'.repeat(257);
    const event = { partitionKey };
    const hash = crypto.createHash("sha3-512").update(partitionKey).digest("hex");
    expect(deterministicPartitionKey(event)).toBe(hash);
  });

  it('should return "0" if event is not provided', () => {
    expect(deterministicPartitionKey()).toBe('0');
  });

});