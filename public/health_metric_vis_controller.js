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

  _getFormattedValue(fieldFormatter, value) {
    if (_.isNaN(value)) return '-';
    return fieldFormatter(value);
  }

  _processTableGroups(table) {
    const config = this.props.vis.params.metric;
    const isPercentageMode = config.percentageMode;  
    const min = config.colorsRange[0].from;
    const max = _.last(config.colorsRange).to;
    const metrics = [];

    let bucketAgg;
    let bucketColumnId;
    let rowHeaderIndex;

    table.columns.forEach((column, columnIndex) => {
      const aggConfig = column.aggConfig;

      if (aggConfig && aggConfig.type.type === 'buckets') {
        bucketAgg = aggConfig;
        // Store the current index, so we later know in which position in the
        // row array, the bucket agg key will be, so we can create filters on it.
        rowHeaderIndex = columnIndex;
        bucketColumnId = column.id;
        return;
      }

      table.rows.forEach((row, rowIndex) => {
        let title = column.name;
        let value = row[column.id];
        const updateColor = this._setColor(value, config);

        if (isPercentageMode) {
          const percentage = Math.round(100 * (value - min) / (max - min));
          value = `${percentage}%`;
        }

        if (aggConfig) {
          if (!isPercentageMode) value = this._getFormattedValue(aggConfig.fieldFormatter('html'), value);
          if (bucketAgg) {
            const bucketValue = bucketAgg.fieldFormatter('text')(row[bucketColumnId]);
            title = `${bucketValue} - ${aggConfig.makeLabel()}`;
          } else {
            title = aggConfig.makeLabel();
          }
        }

        metrics.push({
          label: title,
          value: value,
          colorThreshold: updateColor,
          rowIndex: rowIndex,
          columnIndex: rowHeaderIndex,
          bucketAgg: bucketAgg 
        });
      })
    })

    return metrics;
  }

  _renderMetric = (metric, index) => {
    const metricValueStyle = {
      fontSize: `${this.props.vis.params.metric.style.fontSize}pt`,
      color: `${this.props.vis.params.metric.style.fontColor}`,
    };

    return (
      <div
        className="mtrVis__container"
        style={{ backgroundColor: metric.colorThreshold }}
      >
        <div
          key={index}
          className="mtrVis__container"
          style={{ backgroundColor: metric.bgColor }}
        >
          <div
            className="mtrVis__value"
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
    return (<div className="mtrVis">{metricsHtml}</div>);
  }

  componentDidMount() {
    this.props.renderComplete();
  }

  componentDidUpdate() {
    this.props.renderComplete();
  }
}
