const { PriorityQueue } = require("../src");

describe("Test for PriorityQueue class", () => {
  describe("constructor()", () => {
    it("should be an instance of PriorityQueue", () => {
      const queue = new PriorityQueue();
      expect(queue).toBeInstanceOf(PriorityQueue);
    });

    it("should create PriorityQueue with empty initial values", () => {
      const queue = new Queue();
      expect(queue.head).toBeNull();
      expect(queue.tail).toBeNull();
      expect(queue.length).toEqual(0);
    });
  });

  describe("method add(priority, item)", () => {
    let priorityQueue;
    let length;
    let testDataArray;

    beforeEach(() => {
      priorityQueue = new PriorityQueue();
      length = 0;
      testDataArray = [1, "42", { a: 2 }, [1, 2, 3, 4], { a: { b: 2 } }];
    });

    it("should add item to priorityQueue", () => {
      testDataArray.forEach((data) => {
        priorityQueue.add(0, data);
        expect(priorityQueue).toHaveLength(++length);
      });
    });

    it("should add items with different priorities to priority queue", () => {
      testDataArray.forEach((data, index) => {
        priorityQueue.add(index % 3, data);
        expect(priorityQueue).toHaveLength(++length);
      });
    });

    it("should add items as head to priority queue if priority is greater than max priority in queue", () => {
      testDataArray.forEach((data, index) => {
        priorityQueue.add(index, data);
      });
      priorityQueue.add(testDataArray.length, testDataArray);
      expect(priorityQueue.head).toEqual(testDataArray);
    });

    it("should add items as tail to priority queue if priority is less than min priority in queue", () => {
      testDataArray.forEach((data, index) => {
        priorityQueue.add(index, data);
      });
      priorityQueue.add(-1, testDataArray);
      expect(priorityQueue.tail).toEqual(testDataArray);
    });

    it("should return new length", () => {
      expect(priorityQueue.add(1, testDataArray)).toEqual(++length);
    });
  });

  describe("method getMax()", () => {
    let priorityQueue;
    let length;
    let testDataArray;
    let maxPriorityItem;

    beforeEach(() => {
      priorityQueue = new PriorityQueue();
      testDataArray = [
        { data: 1, priority: 4 },
        { data: "42", priority: 3 },
        { data: { a: 2 }, priority: 2 },
        { data: [1, 2, 3, 4], priority: 1 },
        { data: { a: { b: 2 } }, priority: 0 }
      ];
      maxPriorityItem = testDataArray[0];
      testDataArray.forEach(({ data, priority }) => {
        priorityQueue.add(priority, data);
      });
      length = testDataArray.length;
    });

    it("should remove element", () => {
      testDataArray.forEach(() => {
        priorityQueue.getMax();
        expect(priorityQueue).toHaveLength(--length);
      });
    });

    it("should return element with max priority", () => {
      expect(priorityQueue.getMax()).toEqual(maxPriorityItem);
    });

    it("should remove correct element with max priority", () => {
      testDataArray.forEach(() => {
        expect(priorityQueue.getMax()).toEqual(testDataArray.shift().data);
      });
    });

    it("should return null if no element in priority queue", () => {
      testDataArray.forEach(() => {
        priorityQueue.getMax();
      });
      expect(priorityQueue.getMax()).toEqual(null);
    });

    it("should return first added item for same priority", () => {
      priorityQueue.add(5, 1);
      priorityQueue.add(5, testData);
      expect(priorityQueue.getMax()).toEqual(1);
    });
  });

  describe("method getMin()", () => {
    let priorityQueue;
    let length;
    let testDataArray;
    let minPriorityItem;

    beforeEach(() => {
      priorityQueue = new PriorityQueue();
      testDataArray = [
        { data: 1, priority: 4 },
        { data: "42", priority: 3 },
        { data: { a: 2 }, priority: 2 },
        { data: [1, 2, 3, 4], priority: 1 },
        { data: { a: { b: 2 } }, priority: 0 }
      ];
      testDataArray.forEach(({ data, priority }) => {
        priorityQueue.add(priority, data);
      });
      length = testDataArray.length;
      minPriorityItem = testDataArray[length - 1]
    });

    it("should remove element", () => {
      testDataArray.forEach(() => {
        priorityQueue.getMin();
        expect(priorityQueue).toHaveLength(--length);
      });
    });

    it("should return element with min priority", () => {
      expect(priorityQueue.getMin()).toEqual(minPriorityItem);
    });

    it("should remove correct element with min priority", () => {
      testDataArray.forEach(() => {
        expect(priorityQueue.getMin()).toEqual(testDataArray.pop().data);
      });
    });

    it("should return null if no element in priority queue", () => {
      testDataArray.forEach(() => {
        priorityQueue.getMin();
      });
      expect(priorityQueue.getMin()).toEqual(null);
    });

    it("should return first added item for same priority", () => {
      priorityQueue.add(-5, 1);
      priorityQueue.add(-5, testDataArray);
      expect(priorityQueue.getMin()).toEqual(1);
    });
  });

  describe("push", () => {
    let priorityQueue;
    let length;
    let testData;
    let testDataArray;

    beforeEach(() => {
      priorityQueue = new PriorityQueue();
      length = priorityQueue.length;
      testData = { data: { a: 2 }, priority: 10 };
      testDataArray = [
        { data: 1, priority: 4 },
        { data: "42", priority: 3 },
        { data: { a: 2 }, priority: 2 },
        { data: [1, 2, 3, 4], priority: 1 },
        { data: { a: { b: 2 } }, priority: 0 }
      ];
    });

    it("should add item to queue", () => {
      priorityQueue.push(testData.data, testData.priority);
      expect(priorityQueue).toHaveLength(++length);
    });

    it("should push item by priority to queue", () => {
      testDataArray.forEach(({ data, priority }) => {
        priorityQueue.push(data, priority);
        ++length;
      });
      priorityQueue.push(testData, testData.priority);
      expect(priorityQueue).toHaveLength(++length);
      expect(priorityQueue.getMax()).toEqual(testData);
      expect(priorityQueue).toHaveLength(--length);
      priorityQueue.push(testData, -testData.priority);
      expect(priorityQueue).toHaveLength(++length);
      expect(priorityQueue.getMin()).toEqual(testData);
      expect(priorityQueue).toHaveLength(--length);
    });

    it("should return new length of queue", () => {
      testDataArray.forEach(({ data, priority }) => {
        expect(priorityQueue.push(data, priority)).toEqual(++length);
      });
    });

    it("should add item to to last position of queue for same priority", () => {
      priorityQueue.push(1, 1);
      priorityQueue.push(testData, 1);
      expect(priorityQueue.getMin()).toEqual(1);
    });
  });

  describe("unshift", () => {
    let priorityQueue;
    let length;
    let testData;
    let testDataArray;

    beforeEach(() => {
      priorityQueue = new PriorityQueue();
      length = priorityQueue.length;
      testData = { data: { a: 2 }, priority: 10 };
      testDataArray = [
        { data: 1, priority: 4 },
        { data: "42", priority: 3 },
        { data: { a: 2 }, priority: 2 },
        { data: [1, 2, 3, 4], priority: 1 },
        { data: { a: { b: 2 } }, priority: 0 }
      ];
    });

    it("should add item to queue", () => {
      testDataArray.forEach(({ data, priority }) => {
        priorityQueue.unshift(data, priority);
        expect(priorityQueue).toHaveLength(++length);
      });
    });

    it("should push item by priority to queue", () => {
      testDataArray.forEach(({ data, priority }) => {
        priorityQueue.unshift(data, priority);
        ++length;
      });
      priorityQueue.unshift(testData, testData.priority);
      expect(priorityQueue).toHaveLength(++length);
      expect(priorityQueue.getMax()).toEqual(testData);
      expect(priorityQueue).toHaveLength(--length);
      priorityQueue.unshift(testData, -testData.priority);
      expect(priorityQueue).toHaveLength(++length);
      expect(priorityQueue.getMin()).toEqual(testData);
      expect(priorityQueue).toHaveLength(--length);
    });

    it("should return new length of queue", () => {
      testDataArray.forEach(({ data, priority }) => {
        expect(priorityQueue.unshift(data, priority)).toEqual(++length);
      });
    });

    it("should add item to to last position of queue for same priority", () => {
      priorityQueue.unshift(1, 1);
      priorityQueue.unshift(testData, 1);
      expect(priorityQueue.getMin()).toEqual(1);
    });
  });
});
