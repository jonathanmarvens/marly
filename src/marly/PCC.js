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
        numeratorSum3
      ;

      denominatorSum1 = 0;
      denominatorSum2 = 0;
      denominatorSum3 = 0;
      denominatorSum4 = 0;
      n = 0;
      numeratorSum1 = 0;
      numeratorSum2 = 0;
      numeratorSum3 = 0;

      for (var scoreName in x) {
        if (x.hasOwnProperty(scoreName) && y.hasOwnProperty(scoreName)) {
          n = n + 1;
          numeratorSum1 = numeratorSum1 + (x[scoreName] * y[scoreName]);
          numeratorSum2 = numeratorSum2 + x[scoreName];
          numeratorSum3 = numeratorSum3 + y[scoreName];
          denominatorSum1 = denominatorSum1 + Math.pow(x[scoreName], 2);
          denominatorSum3 = denominatorSum3 + Math.pow(y[scoreName], 2);
        }
      }

      numerator = numeratorSum1 - ((numeratorSum2 * numeratorSum3) / n);
      denominatorSum2 = numeratorSum2;
      denominatorSum4 = numeratorSum3;

      denominator = Math.sqrt(denominatorSum1 - (
        Math.pow(denominatorSum2, 2) / n
      )) * Math.sqrt(denominatorSum3 - (
        Math.pow(denominatorSum4, 2) / n
      ));

      return (numerator / denominator);
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
      switch (this.type) {
        case PCC.types.APPROXIMATE:
          return this._computeApproximate(x, y);

          break;
        case PCC.types.EXACT:
          return this._computeExact(x, y);

          break;
      }
    },
    writable: false
  }
});

module.exports = PCC;