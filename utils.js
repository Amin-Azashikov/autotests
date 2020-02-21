const checkInstance = (constructor, instanceName) => {
  describe("constructor", () => {
    it(`should be an instance of ${instanceName}`, () => {
      const queue = new constructor();
      expect(queue).toBeInstanceOf(constructor);
    });
  });
};

module.exports = {
  checkInstance,
}
