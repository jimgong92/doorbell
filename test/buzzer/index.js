var expect = require('chai').expect;
var Buzzer = require('../../index');

var buzzer; // Capture buzzer state

module.exports = function(suite) {
  // beforeEach(function() {
  //   suite.app.listen(suite.app.get('port'), function() {
  //     console.log('Listening on port %d', suite.app.get('port'));
  //   });
  // });
  // afterEach(function() {
  //   suite.app.close();
  // });
  describe('Buzzer', function() {
    it('should fail if no endpoint is passed', function(done) {
      var buzzerConfig = {};
      var didFail = false;
      try {
        buzzer = new Buzzer(buzzerConfig);
      }
      catch (e) {
        didFail = true;
      }
      finally {
        expect(didFail).to.be.true;
        done();
      }
    });
    it('should be passed an endpoint to ping', function(done) {
      var buzzerConfig = { endpoint: suite.ENDPOINT };
      buzzer = new Buzzer(buzzerConfig);
      done();
    });
    it('should have default values', function(done) {
      // Default values expect to cover 7:30AM - 1:00AM in 20min intervals
      expect(buzzer._interval).to.equal(1000 * 60 * 20);
      expect(buzzer._startHour).to.equal(7);
      expect(buzzer._startMinute).to.equal(30);
      expect(buzzer._endHour).to.equal(1);
      expect(buzzer._endMinute).to.equal(0);
      done();
    });
    it('should accept a callback to process the ping response', function(done) {
      buzzer = new Buzzer({
        endpoint: suite.ENDPOINT,
        callback: function(err, res) {
          expect(err).to.not.exist;
          expect(res.statusCode).to.equal(200);
          done();
        }
      })
      buzzer.buzz();
    });
    xit('should activate manually (upon invoking activate method)', function(done) {
      
      // done();
    });
    xit('should deactivate upon invoking deactivate method', function(done) {
      done();
    });
  });
};
