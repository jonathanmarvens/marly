'use strict';

function PCC() {
  this.type = PCC.types.APPROXIMATE;

  Object.defineProperties(this, {
    type: {
      configurable: true,
      enumerable: false,
      value: this.type,
      writable: true
    }
  });
}

PCC.prototype._computeApproximate = function (x, y) {
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
  n               = 0;
  numeratorSum1   = 0;
  numeratorSum2   = 0;
  numeratorSum3   = 0;

  for (var scoreName in x) {
    if (x.hasOwnProperty(scoreName) && y.hasOwnProperty(scoreName)) {
      n               = n + 1;
      denominatorSum1 = denominatorSum1 + Math.pow(x[scoreName], 2);
      denominatorSum3 = denominatorSum3 + Math.pow(y[scoreName], 2);
      numeratorSum1   = numeratorSum1 + (x[scoreName] * y[scoreName]);
      numeratorSum2   = numeratorSum2 + x[scoreName];
      numeratorSum3   = numeratorSum3 + y[scoreName];
    }
  }

  denominatorSum2 = numeratorSum2;
  denominatorSum4 = numeratorSum3;

  denominator = Math.sqrt(denominatorSum1 - (
    Math.pow(denominatorSum2, 2) / n
  )) * Math.sqrt(denominatorSum3 - (
    Math.pow(denominatorSum4, 2) / n
  ));

  numerator = numeratorSum1 - ((numeratorSum2 * numeratorSum3) / n);

  return (numerator / denominator);
};

PCC.prototype._computeExact = function (x, y) {
  var
    denominator,
    denominatorSum1,
    denominatorSum2,
    n,
    numerator,
    numeratorSum,
    xBar,
    yBar
  ;

  denominatorSum1 = 0;
  denominatorSum2 = 0;
  n               = 0;
  numeratorSum    = 0;
  xBar            = 0;
  yBar            = 0;

  for (var scoreName in x) {
    if (x.hasOwnProperty(scoreName) && y.hasOwnProperty(scoreName)) {
      n    = n + 1;
      xBar = xBar + x[scoreName];
      yBar = yBar + y[scoreName];
    }
  }

  xBar = xBar / n;
  yBar = yBar / n;

  for (var scoreName in x) {
    if (x.hasOwnProperty(scoreName) && y.hasOwnProperty(scoreName)) {
      denominatorSum1 = denominatorSum1 + Math.pow((x[scoreName] - xBar), 2);
      denominatorSum2 = denominatorSum2 + Math.pow((y[scoreName] - yBar), 2);
      numeratorSum    = numeratorSum + ((x[scoreName] - xBar) * (y[scoreName] - yBar));
    }
  }

  denominator = Math.sqrt(denominatorSum1) * Math.sqrt(denominatorSum2);
  numerator   = numeratorSum;

  return (numerator / denominator);
};

PCC.prototype.compute = function (x, y) {
  switch (this.type) {
    case PCC.types.APPROXIMATE:
      return this._computeApproximate(x, y);

      break;
    case PCC.types.EXACT:
      return this._computeExact(x, y);

      break;
  }
};

PCC.types = {
  APPROXIMATE: 0,
  EXACT: 1
};

Object.defineProperties(PCC, {
  types: {
    configurable: false,
    enumerable: false,
    value: PCC.types,
    writable: false
  }
});

Object.defineProperties(PCC.prototype, {
  _computeApproximate: {
    configurable: false,
    enumerable: false,
    value: PCC.prototype._computeApproximate,
    writable: false
  },
  _computeExact: {
    configurable: false,
    enumerable: false,
    value: PCC.prototype._computeExact,
    writable: false
  },
  compute: {
    configurable: false,
    enumerable: false,
    value: PCC.prototype.compute,
    writable: false
  }
});

module.exports = PCC;