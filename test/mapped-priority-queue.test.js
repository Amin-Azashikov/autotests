const { MappedPriorityQueue } = require("../src");

describe("MappedPriorityQueue", () => {
  describe("constructor()", () => {
    it("should be an instance of MappedPriorityQueue", () => {
      const mappedPriorityQueue = new MappedPriorityQueue();
      expect(mappedPriorityQueue).toBeInstanceOf(MappedPriorityQueue);
    });

    it("should create MappedPriorityQueue with empty initial values", () => {
      const mappedPriorityQueue = new MappedPriorityQueue();
      expect(mappedPriorityQueue.head).toBeNull();
      expect(mappedPriorityQueue.tail).toBeNull();
      expect(mappedPriorityQueue.length).toEqual(0);
    });
  });

  describe("method add(priority, data)", () => {
    let mappedPriorityQueue;
    let length;
    let testDataArray;

    beforeEach(() => {
      mappedPriorityQueue = new MappedPriorityQueue();
      length = 0;
      testDataArray = [
        { data: 1, id: "asdqw" },
        { data: [1, 2, 3, 4], id: "234" },
        { data: { a: 2 }, id: 123 },
        { data: "42", id: "ds" },
        { data: { a: { b: 2 } }, id: "qw" }
      ];
    });

    it("should add item to mapped priority queue", () => {
      mappedPriorityQueue.add(1, testDataArray);
      expect(mappedPriorityQueue).toHaveLength(++length);
      expect(mappedPriorityQueue.head.data).toEqual(testDataArray);
    });

    it("shouldn't be able to add items with same id", () => {
      mappedPriorityQueue.add(1, { testDataArray, id: "1" })
      expoect(mappedPriorityQueue.add(1, { testDataArray, id: "1" })).toThrow("Item with same id already added to queue");
    });

    it("should add item to mapped priority queue with correct priority", () => {
      testDataArray.forEach((data, i) => {
        mappedPriorityQueue.add(i, data);
      });
      expect(mappedPriorityQueue.getMin()).toEqual(testDataArray[0]);
      expect(mappedPriorityQueue.getMax()).toEqual(testDataArray[length - 1]);
    });

    it("should return new length", () => {
      expect(mappedPriorityQueue.add(1, testDataArray)).toEqual(++length);
    });
  });

  describe("method has(id)", () => {
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
      });
    });

    it("should return true if id exist in queue", () => {
      testDataArray.forEach(data => {
        expect(mappedPriorityQueue.has(data.id)).toBeTruthy();
      });
    });

    it("should return false if id not exist in queue", () => {
      expect(mappedPriorityQueue.has("some invalid id")).toBeFalsy();
    });
  });

  describe("method pop()", () => {
    let mappedPriorityQueue;
    let testDataArray;

    beforeEach(() => {
      mappedPriorityQueue = new MappedPriorityQueue();
      length = mappedPriorityQueue.length;
      testDataArray = [
        { data: 1, id: "asdqw" },
        { data: [1, 2, 3, 4], id: "234" },
        { data: { a: 2 }, id: 123 },
        { data: "42", id: "ds" },
        { data: { a: { b: 2 } }, id: "qw" }
      ];
      testDataArray.forEach((data, i) => {
        mappedPriorityQueue.add(i, data);
      });
    });

    it("should remove item from queue", () => {
      testDataArray.forEach(() => {
        mappedPriorityQueue.pop();
      });
      expect(mappedPriorityQueue).toHaveLength(0);
    });

    it("should remove and return first added item with highest priority", () => {
      mappedPriorityQueue.add(10, -10);
      mappedPriorityQueue.add(10, { data: -10 });
      expect(mappedPriorityQueue.pop()).toEqual(10);
    });

    it("should remove id after removing item", () => {
      const testData = { testDataArray, id: 'some unique id' };
      mappedPriorityQueue.add(0, testData);
      expect(mappedPriorityQueue.has(testData.id)).toBeFalsy();
    });
  });

  describe("method shift()", () => {
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
      testDataArray.forEach((data, i) => {
        mappedPriorityQueue.add(i, data);
      });
    });

    it("should remove item from queue", () => {
      testDataArray.forEach(() => {
        mappedPriorityQueue.shift();
      });
      expect(mappedPriorityQueue).toHaveLength(0);
    });

    it("should remove and return item with lower priority", () => {
      mappedPriorityQueue.add(-10, testData);
      expect(mappedPriorityQueue.shift()).toEqual(testData);
    });

    it("should remove and return last added item for same priority", () => {
      mappedPriorityQueue.add(10, { testDataArray, id: 1 });
      mappedPriorityQueue.add(10, 10);
      expect(mappedPriorityQueue.shift()).toEqual(10);
    });
  });

  describe("method getById(id)", () => {
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
      });
    });

    it("should return correct item with id", () => {
      testDataArray.forEach(data => {
        expect(mappedPriorityQueue.getById(data.id)).toEqual(data);
      });
    });

    it("should return undefined if item with given id doesn't exist in queue", () => {
      expect(mappedPriorityQueue.getById(testData.id)).toEqual(undefined);
    });
  });

  describe("method removeById(id)", () => {
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
      testDataArray.forEach((data, i) => {
        mappedPriorityQueue.add(i, data);
      });
    });

    it("should remove item from queue", () => {
      testDataArray.forEach(data => {
        mappedPriorityQueue.removeById(data.id);
      });
      expect(mappedPriorityQueue).toHaveLength(0);
    });

    it("should remove item with correct id", () => {
      testDataArray.forEach(data => {
        expect(mappedPriorityQueue.getById(data.id)).toEqual(data);
        expect(mappedPriorityQueue.removeById(data.id)).toEqual(data);
        expect(mappedPriorityQueue.getById(data.id)).toEqual(undefined);
      });
    });

    it("should return true if item was removed from", () => {
      const testId = "some id";
      mappedPriorityQueue.add(0, {testDataArray, id: testId});
      expect(mappedPriorityQueue.removeById(testId)).toBeTruthy();
    });

    it("should return false if item wasn't in queue", () => {
      const testId = "some id";
      const testInvalidId = "some invalid id";
      mappedPriorityQueue.add(0, {testDataArray, id: testId});
      expect(mappedPriorityQueue.removeById(testInvalidId)).toBeFalsy();
    });
  });
});
