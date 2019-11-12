var Queue = class Queue {
  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }
  __biuldItem(data, prev=null, next=null) {
    return { data, prev, next }
  }
  push(data) {
    switch (this.length) {
      case 0:
        this.tail = this.head = this.__biuldItem(data)
        break;
      default:
        this.tail = this.tail.next = this.__biuldItem(data, this.tail)
    }
    return this.length++
  }
  pop() {
    let res = null
    switch (this.length) {
      case 0:
        break;
      case 1:
        res = this.tail.data
        this.tail = this.head = null
        this.length--
        break;
      default:
        res = this.tail.data
        this.tail = this.tail.prev
        this.tail.next = null
        this.length--
    }
    return res
  }
  unshift(data) {
    switch (this.length) {
      case 0:
        this.head = this.tail = this.__biuldItem(data)
        break;
      default:
        this.head = this.head.prev = this.__biuldItem(data, null, this.head)
    }
    return this.length++
  }
  shift() {
    let res = null
    switch (this.length) {
      case 0:
        break;
      case 1:
        res = this.head.data
        this.head = this.tail = null
        this.length--
        break;
      default:
        res = this.head.data
        this.head = this.head.next
        this.head.prev = null
        this.length--
    }
    return res
  }
}

var PriorityQueue = class PriorityQueue extends Queue {
  __biuldItem(priority, ...args) {
    let res = super.__biuldItem(...args)
    res.priority = priority
    return res
  }
  add(priority, data) {
    switch (this.length) {
      case 0:
        this.head = this.tail = this.__biuldItem(priority, data)
        break;
      case 1:
        if (this.head.priority >= priority) {
          this.head = this.tail.prev = this.__biuldItem(priority, data, null, this.tail)
        } else {
          this.tail = this.head.next = this.__biuldItem(priority, data, this.head)
        }
        break;
      default:
        let item = this.head
        if (item.priority >= priority) {
          this.head = item.prev = this.__biuldItem(priority, data, null, item)
        } else {
          while (true) {
            item = item.next
            if (item == null) {
              this.tail = this.tail.next = this.__biuldItem(priority, data, item.prev, item)
              break
            }
            if (item.priority >= priority) {
              item.prev = item.prev.next = this.__biuldItem(priority, data, item.prev, item)
              break
            }
          }
        }
    }
    return this.length++
  }
  getMax() {
    return this.pop()
  }
  getMin() {
    return this.shift()
  }
  push(data, priority=0) {
    return this.add(priority, data)
  }
  unshift(data, priority=0) {
    return this.add(priority, data)
  }
}

class MappedPriorityQueue extends PriorityQueue {
  constructor() {
    super()
    this.map = {}
  }
  add(priority, data) {
    this.map[data.id] = data
    return super.add(priority, data)
  }
  pop() {
    let res = super.pop()
    if (res != null)
      delete this.map[res.id]
    return res
  }
  shift() {
    let res = super.shift()
    if (res != null)
      delete this.map[res.id]
    return res
  }
  getById(id) {
    return this.map[id]
  }
  removeById(id) {
    delete this.map[id]
    let item = this.head
    if (item.id !== id) while ((item = item.next).id !== id) ;
    item.prev.next = item.next
    item.next.prev = item.prev
  }
  has(id) {
    return this.map[id] != null
  }
}

module.exports = {
  Queue,
  PriorityQueue,
  MappedPriorityQueue,
}