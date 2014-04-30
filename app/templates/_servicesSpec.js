describe('NewService', function () {

  // Inject the module before each test
  beforeEach(module('<%= moduleName %>'));

  describe('sample function', function () {

    it('should inject the new service', inject(function(NewService) {
      expect(NewService).to.not.equal(null);
    }));
  })
});