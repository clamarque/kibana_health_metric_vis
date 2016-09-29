
define(function (require) {
  let _ = require('lodash');
  const module = require('ui/modules').get('health_metric_vis');

  module.controller('KbnHealthMetricVisController', function ($scope, Private) {
    const tabifyAggResponse = Private(require('ui/agg_response/tabify/tabify'));

    const metrics = $scope.metrics = [];

    function isInvalid(val) {
      return _.isUndefined(val) || _.isNull(val) || _.isNaN(val);
    }
    
    function getColor(val, visParams) {
      console.log('function getColor');
      if (!visParams.invertScale) {
        if (val <= visParams.redThreshold) {
          return visParams.redColor;
        }
        else if (val <= visParams.yellowThreshold && val > visParams.redThreshold ) {
          return visParams.yellowColor;
        }
        else {
          return visParams.greenColor;
        }
      }
      else {
          if (val >= visParams.redThreshold) {
              return visParams.redColor;
          }
          else if (val >= visParams.yellowThreshold && val < visParams.redThreshold) {
              return visParams.yellowColor;
          }
          else {
              return visParams.greenColor;
          }
      }
    }
    function getFontColor(val,visParams){
      console.log('function getFontcolor');
      if(val != null) {
        return visParams.fontColor;
      }
      else{
        alert("You can't change the color if there is no value.")
      }
    }

    $scope.processTableGroups = function (tableGroups) {
      tableGroups.tables.forEach(function (table) {
        table.columns.forEach(function (column, i) {
          const fieldFormatter = table.aggConfig(column).fieldFormatter();
          let value = table.rows[0][i];
          let formattedValue = isInvalid(value) ? '?' : fieldFormatter(value);
          let color = getColor(value, $scope.vis.params);
          let fontColor = getFontColor(value, $scope.vis.params);
          
          metrics.push({
            label: column.title,
            formattedValue: formattedValue,
            color: color,
            fontColor: fontColor
          });
        });
      });
    };

    $scope.$watch('esResponse', function (resp) {
      if (resp) {
        metrics.length = 0;
        $scope.processTableGroups(tabifyAggResponse($scope.vis, resp));
      }
    });
  });
});
