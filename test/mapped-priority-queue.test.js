const { MappedPriorityQueue } = require("../src");

describe("MappedPriorityQueue", () => {
  describe("constructor", () => {
    it("should be an instance of MappedPriorityQueue", () => {
      const queue = new MappedPriorityQueue();
      expect(queue).toBeInstanceOf(MappedPriorityQueue);
    });
    it("should create MappedPriorityQueue with empty initial values", () => {
      const queue = new MappedPriorityQueue();
      expect(queue.head).toBeNull();
      expect(queue.tail).toBeNull();
      expect(queue.length).toEqual(0);
    });
  });
  describe("add", () => {
    let mappedPriorityQueue;
    let length;
    let testData;
    let testDataArray;
    beforeEach(() => {
      mappedPriorityQueue = new MappedPriorityQueue();
      length = mappedPriorityQueue.length;
      testData = { a: 1, id: 1 };
      testDataArray = [
        { data: 1, id: "asdqw" },
        { data: [1, 2, 3, 4], id: "234" },
        { data: { a: 2 }, id: 123 },
        { data: "42", id: "ds" },
        { data: { a: { b: 2 } }, id: "qw" }
      ];
    });
    it("should return new length", () => {
      expect(mappedPriorityQueue.add(1, testData)).toEqual(++length);
    });
    it("should add item to queue", () => {
      testDataArray.forEach(data => {
        mappedPriorityQueue.add(1, data);
        expect(mappedPriorityQueue).toHaveLength(++length);
      });
    });
    it("should add item to queue by priority", () => {
      testDataArray.forEach((data, i) => {
        mappedPriorityQueue.add(i, data);
        length++;
      });
      expect(mappedPriorityQueue).toHaveLength(length);
      expect(mappedPriorityQueue.getMin()).toEqual(testDataArray[0]);
      expect(mappedPriorityQueue.getMax()).toEqual(testDataArray[length - 1]);
    });
  });
  describe("pop", () => {
    let mappedPriorityQueue;
    let length;
    let testData;
    let testDataArray;
    beforeEach(() => {
      mappedPriorityQueue = new MappedPriorityQueue();
      length = mappedPriorityQueue.length;
      testData = { a: 1, id: 1 };
      testDataArray = [
        { data: 1, id: "asdqw" },
        { data: [1, 2, 3, 4], id: "234" },
        { data: { a: 2 }, id: 123 },
        { data: "42", id: "ds" },
        { data: { a: { b: 2 } }, id: "qw" }
      ];
      testDataArray.forEach(data => {
        mappedPriorityQueue.add(1, data);
        ++length;
      });
    });
    it("should return first added item for same priority", () => {
      testDataArray.forEach(data => {
        expect(mappedPriorityQueue.pop()).toEqual(data);
        expect(mappedPriorityQueue).toHaveLength(--length);
      });
    });
    it("should return item with higher priority", () => {
      mappedPriorityQueue.add(2, testData);
      expect(mappedPriorityQueue.pop()).toEqual(testData);
    });
  });
  describe("shift", () => {
    let mappedPriorityQueue;
    let length;
    let testData;
    let testDataArray;
    beforeEach(() => {
      mappedPriorityQueue = new MappedPriorityQueue();
      length = mappedPriorityQueue.length;
      testData = { a: 1, id: 1 };
      testDataArray = [
        { data: 1, id: "asdqw" },
        { data: [1, 2, 3, 4], id: "234" },
        { data: { a: 2 }, id: 123 },
        { data: "42", id: "ds" },
        { data: { a: { b: 2 } }, id: "qw" }
      ];
      testDataArray.forEach(data => {
        mappedPriorityQueue.add(1, data);
        ++length;
      });
    });
    it("should return last added item for same priority", () => {
      testDataArray.forEach(() => {
        expect(mappedPriorityQueue.shift()).toEqual(testDataArray[--length]);
        expect(mappedPriorityQueue).toHaveLength(length);
      });
    });
    it("should return item with lower priority", () => {
      mappedPriorityQueue.add(0, testData);
      expect(mappedPriorityQueue.shift()).toEqual(testData);
    });
  });
  describe("getById", () => {
    let mappedPriorityQueue;
    let testData;
    let testDataArray;
    beforeEach(() => {
      mappedPriorityQueue = new MappedPriorityQueue();
      testData = { a: 1, id: 1 };
      testDataArray = [
        { data: 1, id: "asdqw" },
        { data: [1, 2, 3, 4], id: "234" },
        { data: { a: 2 }, id: 123 },
        { data: "42", id: "ds" },
        { data: { a: { b: 2 } }, id: "qw" }
      ];
      testDataArray.forEach(data => {
        mappedPriorityQueue.add(1, data);
        ++length;
      });
    });
    it("should return item with correct id", () => {
      testDataArray.forEach(data => {
        expect(mappedPriorityQueue.getById(data.id)).toEqual(data);
      });
    });
    it("shouldn't have item with same id", () => {
      while (mappedPriorityQueue.length) {
        mappedPriorityQueue.pop();
      }
      mappedPriorityQueue.add(1, testData);
      mappedPriorityQueue.add(1, testData);
      expect(mappedPriorityQueue.getById(testData.id)).toEqual(testData);
      expect(mappedPriorityQueue.removeById(testData.id)).toEqual(testData);
      expect(mappedPriorityQueue.getById(testData.id)).toEqual(undefined);
    });
  });
  describe("removeById", () => {
    let mappedPriorityQueue;
    let testDataArray;
    beforeEach(() => {
      mappedPriorityQueue = new MappedPriorityQueue();
      testDataArray = [
        { data: 1, id: "asdqw" },
        { data: [1, 2, 3, 4], id: "234" },
        { data: { a: 2 }, id: 123 },
        { data: "42", id: "ds" },
        { data: { a: { b: 2 } }, id: "qw" }
      ];
      testDataArray.forEach(data => {
        mappedPriorityQueue.add(1, data);
        ++length;
      });
    });
    it("should remove item with correct id", () => {
      testDataArray.forEach(data => {
        expect(mappedPriorityQueue.getById(data.id)).toEqual(data);
        expect(mappedPriorityQueue.removeById(data.id)).toEqual(data);
        expect(mappedPriorityQueue.getById(data.id)).toEqual(undefined);
      });
    });
  });
  describe("has", () => {
    let mappedPriorityQueue;
    let testDataArray;
    beforeEach(() => {
      mappedPriorityQueue = new MappedPriorityQueue();
      testDataArray = [
        { data: 1, id: "asdqw" },
        { data: [1, 2, 3, 4], id: "234" },
        { data: { a: 2 }, id: 123 },
        { data: "42", id: "ds" },
        { data: { a: { b: 2 } }, id: "qw" }
      ];
      testDataArray.forEach(data => {
        mappedPriorityQueue.add(1, data);
        ++length;
      });
    });
    it("should return true if id exist in queue", () => {
      testDataArray.forEach(data => {
        expect(mappedPriorityQueue.getById(data.id)).toEqual(data);
        expect(mappedPriorityQueue.has(data.id)).toBeTruthy();
      });
    });
  });
});
