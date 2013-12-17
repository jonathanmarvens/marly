'use strict';

function MinkowskiDistance() {
  Object.defineProperties(this, {
    type: {
      configurable: true,
      enumerable: false,
      value: MinkowskiDistance.types.MANHATTAN,
      writable: true
    }
  });
}

Object.defineProperties(MinkowskiDistance, {
  types: {
    configurable: false,
    enumerable: false,
    value: {
      EUCLIDEAN: 2,
      MANHATTAN: 1
    },
    writable: false
  }
});

Object.defineProperties(MinkowskiDistance.prototype, {
  compute: {
    configurable: false,
    enumerable: false,
    value: function (x, y) {
      var
        commonScores,
        sum
      ;

      commonScores = false;
      sum = 0;

      for (var scoreName in x) {
        if (y.hasOwnProperty(scoreName)) {
          commonScores = true;

          sum = sum + Math.pow(
            Math.abs(x[scoreName] - y[scoreName]), this.type
          );
        }
      }

      if (commonScores) {
        return Math.pow(sum, (1 / this.type));
      } else {
        return 0;
      }
    },
    writable: false
  },
  recommend: {
    configurable: false,
    enumerable: false,
    value: function (id, objects) {
      var
        neighborId,
        neighborScores,
        recommendations,
        subjectScores
      ;

      neighborId = this.sortedNeighbors(id, objects)[0].id;
      neighborScores = objects[neighborId];
      recommendations = [];
      subjectScores = objects[id];

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
    },
    writable: false
  },
  sortedNeighbors: {
    configurable: false,
    enumerable: false,
    value: function (id, objects) {
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
    },
    writable: false
  }
});

module.exports = MinkowskiDistance;