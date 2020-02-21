const { Queue } = require("../src/index");
const { checkInstance } = require("../utils");

describe("Queue", () => {
  checkInstance(Queue, "Queue");
  describe("push", () => {
    let queue;
    let length;
    let testData;
    let testDataArray;
    beforeEach(() => {
      queue = new Queue();
      length = queue.length;
      testData = { a: 1 };
      testDataArray = [1, "42", { a: 2 }, [1, 2, 3, 4], { a: { b: 2 } }];
    });
    it("should add an item to end of queue", () => {
      testDataArray.forEach(data => {
        queue.push(data);
        expect(queue).toHaveLength(++length);
      });
    });
    it("should return new length", () => {
      expect(queue.push(testData)).toEqual(length + 1);
    });
    it("should add an exact item to end of queue", () => {
      queue.push(testData);
      testDataArray.forEach(data => {
        queue.push(data);
        expect(queue.head.data).toEqual(testData);
        expect(queue.tail.data).toEqual(data);
      });
    });
  });
  describe("pop", () => {
    let queue;
    let length;
    let testDataArray;
    beforeEach(() => {
      queue = new Queue();
      testDataArray = [1, "42", { a: 2 }, [1, 2, 3, 4], { a: { b: 2 } }];
      testDataArray.forEach(data => queue.push(data));
      length = queue.length;
    });
    it("should remove last added element and return it", () => {
      testDataArray.forEach(() => {
        expect(queue.pop()).toEqual(testDataArray[length - 1]);
        expect(queue).toHaveLength(--length);
      });
    });
    it("should return null if queue is empty", () => {
      testDataArray.forEach(() => {
        queue.pop();
      });
      expect(queue.pop()).toEqual(null);
    });
  });
  describe("unshift", () => {
    let queue;
    let length;
    let testData;
    let testDataArray;
    beforeEach(() => {
      queue = new Queue();
      length = queue.length;
      testData = { a: 1 };
      testDataArray = [1, "42", { a: 2 }, [1, 2, 3, 4], { a: { b: 2 } }];
    });
    it("should add an item to start of queue", () => {
      testDataArray.forEach(data => {
        queue.unshift(data);
        expect(queue).toHaveLength(++length);
      });
    });
    it("should return new length", () => {
      expect(queue.unshift(testData)).toEqual(length + 1);
    });
    it("should add an exact item to start of queue", () => {
      queue.unshift(testData);
      testDataArray.forEach(data => {
        queue.unshift(data);
        expect(queue.tail.data).toEqual(testData);
        expect(queue.head.data).toEqual(data);
      });
    });
  });
  describe("shift", () => {
    let queue;
    let length;
    let testDataArray;
    beforeEach(() => {
      queue = new Queue();
      testDataArray = [1, "42", { a: 2 }, [1, 2, 3, 4], { a: { b: 2 } }];
      testDataArray.forEach(data => queue.unshift(data));
      length = queue.length;
    });
    it("should remove last added element and return it", () => {
      testDataArray.forEach((data, index) => {
        expect(queue.shift()).toEqual(testDataArray[length - 1]);
        expect(queue).toHaveLength(--length);
      });
    });
    it("should return null if queue is empty", () => {
      testDataArray.forEach(() => {
        queue.shift();
      });
      expect(queue.shift()).toEqual(null);
    });
  });
});
