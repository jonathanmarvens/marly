'use strict';

function CosineSimilarity() {}

CosineSimilarity.prototype.compute = function (x, y) {
  var
    denominator,
    dotProductXYScores,
    numerator,
    xLength,
    xLengthSum,
    yLength,
    yLengthSum
  ;

  dotProductXYScores = 0;
  xLengthSum = 0;
  yLengthSum = 0;

  for (var scoreName in x) {
    if (x.hasOwnProperty(scoreName)) {
      if (! y.hasOwnProperty(scoreName)) {
        y[scoreName] = 0;
      }

      dotProductXYScores = dotProductXYScores + (x[scoreName] * y[scoreName]);
      xLengthSum = xLengthSum + Math.pow(x[scoreName], 2);
      yLengthSum = yLengthSum + Math.pow(y[scoreName], 2);
    }
  }

  xLength = Math.sqrt(xLengthSum);
  yLength = Math.sqrt(yLengthSum);
  denominator = xLength * yLength;
  numerator = dotProductXYScores;

  return (numerator / denominator);
};

Object.defineProperties(CosineSimilarity.prototype, {
  compute: {
    configurable: false,
    enumerable: false,
    value: CosineSimilarity.prototype.compute,
    writable: false
  }
});

module.exports = CosineSimilarity;