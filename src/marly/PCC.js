'use strict';

function PCC() {
  Object.defineProperties(this, {
    type: {
      configurable: true,
      enumerable: false,
      value: PCC.types.APPROXIMATE,
      writable: true
    }
  });
}

Object.defineProperties(PCC, {
  types: {
    configurable: false,
    enumerable: false,
    value: {
      APPROXIMATE: 0,
      EXACT: 1
    },
    writable: false
  }
});

Object.defineProperties(PCC.prototype, {
  _computeApproximate: {
    configurable: false,
    enumerable: false,
    value: function (x, y) {
      var
        commonScores,
        denominator,
        denominatorSum1,
        denominatorSum2,
        denominatorSum3,
        denominatorSum4,
        n,
        numerator,
        numeratorSum1,
        numeratorSum2,
        numeratorSum3,
        r,
        tempX,
        tempY
      ;

      denominatorSum1 = 0;
      denominatorSum2 = 0;
      denominatorSum3 = 0;
      denominatorSum4 = 0;
      numeratorSum1 = 0;
      numeratorSum2 = 0;
      numeratorSum3 = 0;
      tempX = {};
      tempY = {};
      n = 0;

      /**
       * TODO: Figure out how to get rid of some loops.
       */

      for (var scoreName in x) {
        if (x.hasOwnProperty(scoreName) && y.hasOwnProperty(scoreName)) {
          tempX[scoreName] = x[scoreName];
          tempY[scoreName] = y[scoreName];
          n = n + 1;
        }
      }

      x = tempX;
      y = tempY;

      for (var scoreName in x) {
        if (x.hasOwnProperty(scoreName) && y.hasOwnProperty(scoreName)) {
          numeratorSum1 = numeratorSum1 + (x[scoreName] * y[scoreName]);
        }
      }

      for (var scoreName in x) {
        if (x.hasOwnProperty(scoreName)) {
          numeratorSum2 = numeratorSum2 + x[scoreName];
        }
      }


      for (var scoreName in y) {
        if (y.hasOwnProperty(scoreName)) {
          numeratorSum3 = numeratorSum3 + y[scoreName];
        }
      }

      numerator = numeratorSum1 - ((numeratorSum2 * numeratorSum3) / n);

      for (var scoreName in x) {
        if (x.hasOwnProperty(scoreName)) {
          denominatorSum1 = denominatorSum1 + Math.pow(x[scoreName], 2);
        }
      }

      denominatorSum2 = numeratorSum2;

      for (var scoreName in y) {
        if (y.hasOwnProperty(scoreName)) {
          denominatorSum3 = denominatorSum3 + Math.pow(y[scoreName], 2);
        }
      }

      denominatorSum4 = numeratorSum3;

      denominator = Math.sqrt(denominatorSum1 - (
        Math.pow(denominatorSum2, 2) / n
      )) * Math.sqrt(denominatorSum3 - (
        Math.pow(denominatorSum4, 2) / n
      ));

      r = numerator / denominator;

      return r;
    },
    writable: false
  },
  _computeExact: {
    configurable: false,
    enumerable: false,
    value: function (x, y) {
      // TODO: Implement this function.
    },
    writable: false
  },
  compute: {
    configurable: false,
    enumerable: false,
    value: function (x, y) {
      var
        r
      ;

      switch (this.type) {
        case PCC.types.APPROXIMATE:
          r = this._computeApproximate(x, y);

          break;
        case PCC.types.EXACT:
          r = this._computeExact(x, y);

          break;
      }

      return r;
    },
    writable: false
  }
});

module.exports = PCC;