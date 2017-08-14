import _ from 'lodash';
import AggResponseTabifyTabifyProvider from 'ui/agg_response/tabify/tabify';
import uiModules from 'ui/modules';

const module = uiModules.get('kibana/health_metric_vis', ['kibana']);

module.controller('KbnHealthMetricVisController', function ($scope, $element, Private) {
  const tabifyAggResponse = Private(AggResponseTabifyTabifyProvider);

  const metrics = $scope.metrics = [];

  function isInvalid(val) {
    return _.isUndefined(val) || _.isNull(val) || _.isNaN(val);
  }
  
  function getColor(val, visParams) {
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

  $scope.$watchMulti(['esResponse', 'vis.params'], function () {
    if ($scope.esResponse) {
      const options = {
        asAggConfigResults: true
      };

      metrics.length = 0;
      $scope.processTableGroups(tabifyAggResponse($scope.vis, $scope.esResponse, options));
      $element.trigger('renderComplete');
    }
  });
});
