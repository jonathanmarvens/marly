'use strict';

function MinkowskiDistance() {
  this.type = MinkowskiDistance.types.MANHATTAN;

  Object.defineProperties(this, {
    type: {
      configurable: true,
      enumerable: false,
      value: this.type,
      writable: true
    }
  });
}

MinkowskiDistance.prototype.compute = function (x, y) {
  var
    commonScores,
    sum
  ;

  commonScores = false;
  sum          = 0;

  for (var scoreName in x) {
    if (x.hasOwnProperty(scoreName) && y.hasOwnProperty(scoreName)) {
      commonScores = true;

      sum = sum + Math.pow(
        Math.abs(x[scoreName] - y[scoreName]), this.type
      );
    }
  }

  if (commonScores) {
    return Math.pow(sum, (1 / this.type));
  } else {
    return (-1);
  }
};

MinkowskiDistance.prototype.neighbors = function (id, objects) {
  var
    distances
  ;

  distances = [];

  for (var objectId in objects) {
    if (objects.hasOwnProperty(objectId) && (objectId !== id)) {
      var
        distance
      ;

      distance = this.compute(objects[objectId], objects[id]);

      distances.push({
        id: objectId,
        score: distance
      });
    }
  }

  distances.sort(function (a, b) {
    if (a.score < b.score) {
      return -1;
    } else if (a.score > b.score) {
      return 1;
    } else {
      return 0;
    }
  });

  return distances;
};

MinkowskiDistance.prototype.recommend = function (id, objects) {
  var
    neighborId,
    neighborScores,
    recommendations,
    subjectScores
  ;

  neighborId      = this.neighbors(id, objects)[0].id;
  neighborScores  = objects[neighborId];
  recommendations = [];
  subjectScores   = objects[id];

  for (var scoreName in neighborScores) {
    if (neighborScores.hasOwnProperty(scoreName) && (! subjectScores.hasOwnProperty(scoreName))) {
      recommendations.push({
        score: {
          name: scoreName,
          value: neighborScores[scoreName]
        }
      });
    }
  }

  recommendations.sort(function (a, b) {
    if (a.score.value > b.score.value) {
      return -1;
    } else if (a.score.value < b.score.value) {
      return 1;
    } else {
      return 0;
    }
  });

  return recommendations;
};

MinkowskiDistance.types = {
  EUCLIDEAN: 2,
  MANHATTAN: 1
};

Object.defineProperties(MinkowskiDistance, {
  types: {
    configurable: false,
    enumerable: false,
    value: MinkowskiDistance.types,
    writable: false
  }
});

Object.defineProperties(MinkowskiDistance.prototype, {
  compute: {
    configurable: false,
    enumerable: false,
    value: MinkowskiDistance.prototype.compute,
    writable: false
  },
  neighbors: {
    configurable: false,
    enumerable: false,
    value: MinkowskiDistance.prototype.neighbors,
    writable: false
  },
  recommend: {
    configurable: false,
    enumerable: false,
    value: MinkowskiDistance.prototype.recommend,
    writable: false
  }
});

module.exports = MinkowskiDistance;