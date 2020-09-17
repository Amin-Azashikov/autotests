const { Queue } = require("../src");

describe("Test for Queue class", () => {
  describe("constructor()", () => {
    it("should be an instance of Queue", () => {
      const queue = new Queue();
      expect(queue).toBeInstanceOf(Queue);
    });

    it("should create Queue with empty initial values", () => {
      const queue = new Queue();
      expect(queue.head).toBeNull();
      expect(queue.tail).toBeNull();
      expect(queue.length).toEqual(0);
    });
  });

  describe("method push(item)", () => {
    let queue;
    let length;
    let testDataArray;

    beforeEach(() => {
      queue = new Queue();
      length = 0;
      testDataArray = [1, "42", { a: 2 }, [1, 2, 3, 4], { a: { b: 2 } }];
    });

    it("should add item", () => {
      testDataArray.forEach(data => {
        queue.push(data);
        expect(queue).toHaveLength(++length);
      });
    });

    it("should return new length", () => {
      expect(queue.push({})).toEqual(length + 1);
    });

    it("should add an exact item to end of queue", () => {
      testDataArray.forEach(data => {
        queue.push(data);
        expect(queue.head.data).toEqual(testDataArray[0]);
        expect(queue.tail.data).toEqual(data);
      });
    });
  });

  describe("method pop()", () => {
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
        expect(queue.pop()).toEqual(testDataArray[--length]);
        expect(queue).toHaveLength(length);
      });
    });

    it("should return null if queue is empty", () => {
      testDataArray.forEach(() => {
        queue.pop();
      });
      expect(queue.pop()).toEqual(null);
    });
  });

  describe("method unshift(item)", () => {
    let queue;
    let length;
    let testDataArray;

    beforeEach(() => {
      queue = new Queue();
      length = queue.length;
      testDataArray = [1, "42", { a: 2 }, [1, 2, 3, 4], { a: { b: 2 } }];
    });

    it("should add item", () => {
      testDataArray.forEach(data => {
        queue.unshift(data);
        expect(queue).toHaveLength(++length);
      });
    });

    it("should return new length", () => {
      expect(queue.unshift(testDataArray)).toEqual(length + 1);
    });

    it("should add an exact item to start of queue", () => {
      testDataArray.forEach(data => {
        queue.unshift(data);
        expect(queue.tail.data).toEqual(testDataArray[0]);
        expect(queue.head.data).toEqual(data);
      });
    });
  });

  describe("method shift()", () => {
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
      testDataArray.forEach(() => {
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
