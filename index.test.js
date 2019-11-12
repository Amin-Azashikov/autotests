const {
  Queue,
  PriorityQueue,
  MappedPriorityQueue,
} = require('./index');

function checkInstance(constructor, instanceName) {
  describe('constructor', () => {
    it(`should be an instance of ${instanceName}`, () => {
      const queue = new constructor();
      expect(queue).toBeInstanceOf(constructor);
    });
  });
}

describe('Queue', () => {
  checkInstance(Queue, 'Queue');
  describe('push', () => {
    let queue;
    let length;
    let testData;
    let testDataArray;
    beforeEach(() => {
      queue = new Queue();
      length = queue.length;
      testData = { a: 1 };
      testDataArray = [1,'42', { a: 2 }, [1, 2, 3, 4], { a: { b:2 } }];
    });
    it('should add an item to end of queue', () => {
      testDataArray.forEach(data => {
        queue.push(data);
        expect(queue).toHaveLength(++length);
      });
    });
    it('should return new length', () => {
      expect(queue.push(testData)).toEqual(length + 1);
    });
    it('should add an exact item to end of queue', () => {
      queue.push(testData);
      testDataArray.forEach(data => {
        queue.push(data);
        expect(queue.head.data).toEqual(testData);
        expect(queue.tail.data).toEqual(data);
      });
    });
  });
  describe('pop', () => {
    let queue;
    let length;
    let testDataArray;
    beforeEach(() => {
      queue = new Queue();
      testDataArray = [1,'42', { a: 2 }, [1, 2, 3, 4], { a: { b:2 } }];
      testDataArray.forEach(data => queue.push(data));
      length = queue.length;
    });
    it('should remove last added element and return it', () => {
      testDataArray.forEach(() => {
        expect(queue.pop()).toEqual(testDataArray[length - 1]);
        expect(queue).toHaveLength(--length);
      });
    });
    it('should return null if queue is empty', () => {
      testDataArray.forEach(() => {
        queue.pop();
      });
      expect(queue.pop()).toEqual(null);
    });
  });
  describe('unshift', () => {
    let queue;
    let length;
    let testData;
    let testDataArray;
    beforeEach(() => {
      queue = new Queue();
      length = queue.length;
      testData = { a: 1 };
      testDataArray = [1,'42', { a: 2 }, [1, 2, 3, 4], { a: { b:2 } }];
    });
    it('should add an item to start of queue', () => {
      testDataArray.forEach(data => {
        queue.unshift(data);
        expect(queue).toHaveLength(++length);
      });
    });
    it('should return new length', () => {
      expect(queue.unshift(testData)).toEqual(length + 1);
    });
    it('should add an exact item to start of queue', () => {
      queue.unshift(testData);
      testDataArray.forEach(data => {
        queue.unshift(data);
        expect(queue.tail.data).toEqual(testData);
        expect(queue.head.data).toEqual(data);
      });
    });
  });
  describe('shift', () => {
    let queue;
    let length;
    let testDataArray;
    beforeEach(() => {
      queue = new Queue();
      testDataArray = [1,'42', { a: 2 }, [1, 2, 3, 4], { a: { b:2 } }];
      testDataArray.forEach(data => queue.unshift(data));
      length = queue.length;
    });
    it('should remove last added element and return it', () => {
      testDataArray.forEach((data, index) => {
        expect(queue.shift()).toEqual(testDataArray[length - 1]);
        expect(queue).toHaveLength(--length);
      });
    });
    it('should return null if queue is empty', () => {
      testDataArray.forEach(() => {
        queue.shift();
      });
      expect(queue.shift()).toEqual(null);
    });
  });
});
describe('PriorityQueue', () => {
  checkInstance(PriorityQueue, 'PriorityQueue');
  describe('add', () => {
    let priorityQueue;
    let length;
    let testData;
    let testDataArray;
    beforeEach(() => {
      priorityQueue = new PriorityQueue();
      length = priorityQueue.length;
      testData = { a: 1 };
      testDataArray = [1,'42', { a: 2 }, [1, 2, 3, 4], { a: { b:2 } }];
    });
    it('should add item to priorityQueue', () => {
      testDataArray.forEach((data, index) => {
        priorityQueue.add(0, data);
        expect(priorityQueue).toHaveLength(++length);
      });
    });
    it('should add items with different priorities to priority queue', () => {
      testDataArray.forEach((data, index) => {
        priorityQueue.add(index % 3, data);
        expect(priorityQueue).toHaveLength(++length);
      });
    });
    it('should return new length', () => {
      expect(priorityQueue.add(1, testData)).toEqual(++length)
    });
  });
  describe('getMax', () => {
    let priorityQueue;
    let length;
    let testDataArray;
    let maxPriority = 0;
    let maxPriorityItem;
    beforeEach(() => {
      priorityQueue = new PriorityQueue();
      testDataArray = [
        {data:1, priority: 4},
        {data:'42', priority: 3},
        {data:{ a: 2 }, priority: 2},
        {data:[1, 2, 3, 4], priority: 1},
        {data:{ a: { b:2 } }, priority: 0},
      ];
      testDataArray.forEach(({data, priority}) => {
        priorityQueue.add(priority, data);
        maxPriorityItem = maxPriority >= priority ? maxPriorityItem : data;
        maxPriority = maxPriority >= priority ? maxPriority : priority;
      });
      length = priorityQueue.length;
    });
    it('should return element with max priority', () => {
      expect(priorityQueue.getMax()).toEqual(maxPriorityItem);
    });
    it('should remove correct element with max priority', () => {
      testDataArray.forEach(() => {
        expect(priorityQueue.getMax()).toEqual(testDataArray.shift().data);
        expect(priorityQueue).toHaveLength(--length);
      });
    });
    it('should return null if no element in priority queue', () => {
      testDataArray.forEach(() => {
        priorityQueue.getMax();
        expect(priorityQueue).toHaveLength(--length);
      });
      expect(priorityQueue.getMax()).toEqual(null);
    });
    it('should return first added item for same priority', () => {
      priorityQueue.add(1, 1);
      priorityQueue.add(testData, 1);
      expect(priorityQueue.getMax()).toEqual(1);
    });
  });
  describe('getMin', () => {
    let priorityQueue;
    let length;
    let testDataArray;
    let minPriority = 5;
    let minPriorityItem;
    beforeEach(() => {
      priorityQueue = new PriorityQueue();
      testDataArray = [
        {data:1, priority: 4},
        {data:'42', priority: 3},
        {data:{ a: 2 }, priority: 2},
        {data:[1, 2, 3, 4], priority: 1},
        {data:{ a: { b:2 } }, priority: 0},
      ];
      testDataArray.forEach(({data, priority}) => {
        priorityQueue.add(priority, data);
        minPriorityItem = minPriority <= priority ? minPriorityItem : data;
        minPriority = minPriority <= priority ? minPriority : priority;
      });
      length = priorityQueue.length;
    });
    it('should return element with min priority', () => {
      expect(priorityQueue.getMin()).toEqual(minPriorityItem);
    });
    it('should remove correct element with min priority', () => {
      testDataArray.forEach(() => {
        expect(priorityQueue.getMin()).toEqual(testDataArray.pop().data);
        expect(priorityQueue).toHaveLength(--length);
      });
    });
    it('should return null if no element in priority queue', () => {
      testDataArray.forEach(() => {
        priorityQueue.getMin();
        expect(priorityQueue).toHaveLength(--length);
      });
      expect(priorityQueue.getMin()).toEqual(null);
    });
    it('should return first added item for same priority', () => {
      priorityQueue.add(1, 1);
      priorityQueue.add(testData, 1);
      expect(priorityQueue.getMin()).toEqual(1);
    });
  });
  describe('push', () => {
    let priorityQueue;
    let length;
    let testData;
    let testDataArray;
    beforeEach(() => {
      priorityQueue = new PriorityQueue();
      length = priorityQueue.length;
      testData = { data: {a: 2}, priority: 10 };
      testDataArray = [
        {data:1, priority: 4},
        {data:'42', priority: 3},
        {data:{ a: 2 }, priority: 2},
        {data:[1, 2, 3, 4], priority: 1},
        {data:{ a: { b:2 } }, priority: 0},
      ];
    });
    it('should add item to queue', () => {
      testDataArray.forEach(({data, priority}) => {
        priorityQueue.push(data, priority);
        expect(priorityQueue).toHaveLength(++length);
      });
    });
    it('should push item by priority to queue', () => {
      testDataArray.forEach(({data, priority}) => {
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
    it('should return new length of queue', () => {
      testDataArray.forEach(({data, priority}) => {
        expect(priorityQueue.push(data, priority)).toEqual(++length);
      });
    });
    it('should add item to to last position of queue for same priority', () => {
      priorityQueue.push(1, 1);
      priorityQueue.push(testData, 1);
      expect(priorityQueue.getMin()).toEqual(1);
    });
  });
  describe('unshift', () => {
    let priorityQueue;
    let length;
    let testData;
    let testDataArray;
    beforeEach(() => {
      priorityQueue = new PriorityQueue();
      length = priorityQueue.length;
      testData = { data: {a: 2}, priority: 10 };
      testDataArray = [
        {data:1, priority: 4},
        {data:'42', priority: 3},
        {data:{ a: 2 }, priority: 2},
        {data:[1, 2, 3, 4], priority: 1},
        {data:{ a: { b:2 } }, priority: 0},
      ];
    });
    it('should add item to queue', () => {
      testDataArray.forEach(({data, priority}) => {
        priorityQueue.unshift(data, priority);
        expect(priorityQueue).toHaveLength(++length);
      });
    });
    it('should push item by priority to queue', () => {
      testDataArray.forEach(({data, priority}) => {
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
    it('should return new length of queue', () => {
      testDataArray.forEach(({data, priority}) => {
        expect(priorityQueue.unshift(data, priority)).toEqual(++length);
      });
    });
    it('should add item to to last position of queue for same priority', () => {
      priorityQueue.unshift(1, 1);
      priorityQueue.unshift(testData, 1);
      expect(priorityQueue.getMin()).toEqual(1);
    });
  });
});
describe('MappedPriorityQueue', () => {
  checkInstance(MappedPriorityQueue, 'MappedPriorityQueue');
  describe('add', () => {
    let mappedPriorityQueue;
    let length;
    let testData;
    let testDataArray;
    beforeEach(() => {
      mappedPriorityQueue = new MappedPriorityQueue();
      length = mappedPriorityQueue.length;
      testData = { a: 1, id: 1 };
      testDataArray = [
        {data: 1, id: 'asdqw'},
        {data: [1, 2, 3, 4], id: '234'},
        {data: { a: 2 }, id: 123},
        {data: '42', id: 'ds'},
        {data: { a: { b:2 } }, id: 'qw'},
      ];
    });
    it('should return new length', () => {
      expect(mappedPriorityQueue.add(1, testData)).toEqual(++length);
    });
    it('should add item to queue', () => {
      testDataArray.forEach(data => {
        mappedPriorityQueue.add(1, data)
        expect(mappedPriorityQueue).toHaveLength(++length);
      });
    });
    it('should add item to queue by priority', () => {
      testDataArray.forEach((data, i) => {
        mappedPriorityQueue.add(i, data);
        length++;
      });
      expect(mappedPriorityQueue).toHaveLength(length);
      expect(mappedPriorityQueue.getMin()).toEqual(testDataArray[0])
      expect(mappedPriorityQueue.getMax()).toEqual(testDataArray[length-1])
    });
  });
  describe('pop', () => {
    let mappedPriorityQueue;
    let length;
    let testData;
    let testDataArray;
    beforeEach(() => {
      mappedPriorityQueue = new MappedPriorityQueue();
      length = mappedPriorityQueue.length;
      testData = { a: 1, id: 1 };
      testDataArray = [
        {data: 1, id: 'asdqw'},
        {data: [1, 2, 3, 4], id: '234'},
        {data: { a: 2 }, id: 123},
        {data: '42', id: 'ds'},
        {data: { a: { b:2 } }, id: 'qw'},
      ];
      testDataArray.forEach(data => {
        mappedPriorityQueue.add(1, data);
        ++length;
      });
    });
    it('should return first added item for same priority', () => {
      testDataArray.forEach(data => {
        expect(mappedPriorityQueue.pop()).toEqual(data);
        expect(mappedPriorityQueue).toHaveLength(--length);
      });
    });
    it('should return item with higher priority', () => {
      mappedPriorityQueue.add(2, testData);
      expect(mappedPriorityQueue.pop()).toEqual(testData);
    });
  });
  describe('shift', () => {
    let mappedPriorityQueue;
    let length;
    let testData;
    let testDataArray;
    beforeEach(() => {
      mappedPriorityQueue = new MappedPriorityQueue();
      length = mappedPriorityQueue.length;
      testData = { a: 1, id: 1 };
      testDataArray = [
        {data: 1, id: 'asdqw'},
        {data: [1, 2, 3, 4], id: '234'},
        {data: { a: 2 }, id: 123},
        {data: '42', id: 'ds'},
        {data: { a: { b:2 } }, id: 'qw'},
      ];
      testDataArray.forEach(data => {
        mappedPriorityQueue.add(1, data);
        ++length;
      });
    });
    it('should return last added item for same priority', () => {
      testDataArray.forEach(() => {
        expect(mappedPriorityQueue.shift()).toEqual(testDataArray[--length]);
        expect(mappedPriorityQueue).toHaveLength(length);
      });
    });
    it('should return item with lower priority', () => {
      mappedPriorityQueue.add(0, testData);
      expect(mappedPriorityQueue.shift()).toEqual(testData);
    });
  });
  describe('getById', () => {
    let mappedPriorityQueue;
    let testData;
    let testDataArray;
    beforeEach(() => {
      mappedPriorityQueue = new MappedPriorityQueue();
      testData = { a: 1, id: 1 };
      testDataArray = [
        {data: 1, id: 'asdqw'},
        {data: [1, 2, 3, 4], id: '234'},
        {data: { a: 2 }, id: 123},
        {data: '42', id: 'ds'},
        {data: { a: { b:2 } }, id: 'qw'},
      ];
      testDataArray.forEach(data => {
        mappedPriorityQueue.add(1, data);
        ++length;
      });
    });
    it('should return item with correct id', () => {
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
        {data: 1, id: 'asdqw'},
        {data: [1, 2, 3, 4], id: '234'},
        {data: { a: 2 }, id: 123},
        {data: '42', id: 'ds'},
        {data: { a: { b:2 } }, id: 'qw'},
      ];
      testDataArray.forEach(data => {
        mappedPriorityQueue.add(1, data);
        ++length;
      });
    });
    it('should remove item with correct id', () => {
      testDataArray.forEach(data => {
        expect(mappedPriorityQueue.getById(data.id)).toEqual(data);
        expect(mappedPriorityQueue.removeById(data.id)).toEqual(data);
        expect(mappedPriorityQueue.getById(data.id)).toEqual(undefined);
      });
    });
  });
  describe('has', () => {
    let mappedPriorityQueue;
    let testDataArray;
    beforeEach(() => {
      mappedPriorityQueue = new MappedPriorityQueue();
      testDataArray = [
        {data: 1, id: 'asdqw'},
        {data: [1, 2, 3, 4], id: '234'},
        {data: { a: 2 }, id: 123},
        {data: '42', id: 'ds'},
        {data: { a: { b:2 } }, id: 'qw'},
      ];
      testDataArray.forEach(data => {
        mappedPriorityQueue.add(1, data);
        ++length;
      });
    });
    it('should return true if id exist in queue', () => {
      testDataArray.forEach(data => {
        expect(mappedPriorityQueue.getById(data.id)).toEqual(data);
        expect(mappedPriorityQueue.has(data.id)).toBeTruthy();
      });
    });
  });
});