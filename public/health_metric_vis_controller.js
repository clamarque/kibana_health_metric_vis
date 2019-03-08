import _ from 'lodash';
import React, { Component } from 'react';

export class HealthMetricVisComponent extends Component {

  _setColor(val, visParams) {
    const isPercentageMode = visParams.percentageMode;
    const min = visParams.colorsRange[0].from;
    const max = _.last(visParams.colorsRange).to;  

    if (isPercentageMode) {
      const percentage = Math.round(100 * (val - min) / (max - min));
      val = percentage;
    } else {
      val = val;
    }

    if (!visParams.style.invertScale) {
      if (val <= visParams.style.redThreshold) {
        return visParams.style.redColor;
      } else if (val <= visParams.style.yellowThreshold && val > visParams.style.redThreshold) {
        return visParams.style.yellowColor;
      } else {
        return visParams.style.greenColor;
      }
    } else {
      if (val >= visParams.style.redThreshold) {
        return visParams.style.redColor;
      } else if (val >= visParams.style.yellowThreshold && val < visParams.style.redThreshold) {
        return visParams.style.yellowColor;
      } else {
        return visParams.style.greenColor;
      }
    }
  }

  _processTableGroups(tableGroups) {
    const config = this.props.vis.params.metric;
    const isPercentageMode = config.percentageMode;  
    const min = config.colorsRange[0].from;
    const max = _.last(config.colorsRange).to;
    const metrics = [];

    tableGroups.tables.forEach((table) => {
      let bucketAgg;
      let rowHeaderIndex;

      table.columns.forEach((column, i) => {
        const aggConfig = column.aggConfig;

        if (aggConfig && aggConfig.schema.group === 'buckets') {
          bucketAgg = aggConfig;
          // Store the current index, so we later know in which position in the
          // row array, the bucket agg key will be, so we can create filters on it.
          rowHeaderIndex = i;
          return;
        }

        table.rows.forEach(row => {

          let title = column.title;
          let value = row[i];
          const updateColor = this._setColor(value, config);

          if (isPercentageMode) {
            const percentage = Math.round(100 * (value - min) / (max - min));
            value = `${percentage}%`;
          }

          if (aggConfig) {
            if (!isPercentageMode) value = aggConfig.fieldFormatter('html')(value);
            if (bucketAgg) {
              const bucketValue = bucketAgg.fieldFormatter('text')(row[0]);
              title = `${bucketValue} - ${aggConfig.makeLabel()}`;
            } else {
              title = aggConfig.makeLabel();
            }
          }

          metrics.push({
            label: title,
            value: value,
            colorThreshold: updateColor
          });
        });
      });
    });

    return metrics;
  }

  _renderMetric = (metric, index) => {
    const metricValueStyle = {
      fontSize: `${this.props.vis.params.metric.style.fontSize}pt`,
      color: `${this.props.vis.params.metric.style.fontColor}`,
    };

    return (
      <div
        className="metric-vis-container"
        style={{ backgroundColor: metric.colorThreshold }}
      >
        <div
          key={index}
          className="metric-container"
          style={{ backgroundColor: metric.bgColor }}
        >
          <div
            className="metric-value"
            style={metricValueStyle}
            dangerouslySetInnerHTML={{ __html: metric.value }}
          />
          {this.props.vis.params.metric.labels.show &&
            <div>{metric.label}</div>
          }
        </div>
      </div>
    );
  };

  render() {
    let metricsHtml;
    if (this.props.visData) {
      const metrics = this._processTableGroups(this.props.visData);
      metricsHtml = metrics.map(this._renderMetric);
    }
    return (<div className="metric-vis">{metricsHtml}</div>);
  }

  componentDidMount() {
    this.props.renderComplete();
  }

  componentDidUpdate() {
    this.props.renderComplete();
  }
}
