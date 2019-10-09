import _ from 'lodash';
import React, { Component } from 'react';
import { getFormat } from 'ui/visualize/loader/pipeline_helpers/utilities';

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

  _getFormattedValue(fieldFormatter, value, format = 'text') {
    if (_.isNaN(value)) return '-';
    return fieldFormatter(value, format);
  }

  _processTableGroups(table) {
    console.log('PROPS', this.props);
    const config = this.props.visParams.metric;
    const dimensions = this.props.visParams.dimensions;
    console.log('DIMENSIONS', dimensions);
    const isPercentageMode = config.percentageMode;  
    const min = config.colorsRange[0].from;
    const max = _.last(config.colorsRange).to;
    const metrics = [];

    let bucketColumnId;
    let bucketFormatter;

    if (dimensions.bucket) {
      bucketColumnId = table.columns[dimensions.bucket.accessor].id;
      bucketFormatter = getFormat(dimensions.bucket.format);
    }

    dimensions.metrics.forEach(metric => {
      const columnIndex = metric.accessor;
      const column = table.columns[columnIndex];
      const formatter = getFormat(metric.format);

      table.rows.forEach((row, rowIndex) => {

        let title = column.name;
        let value = row[column.id];

        if (isPercentageMode) {
          const percentage = Math.round(100 * (value - min) / (max - min));
          value = `${percentage}%`;
        } else {
          value = this._getFormattedValue(formatter, value, 'html');
        }

        if (bucketColumnId) {
          const bucketValue = this._getFormattedValue(bucketFormatter, row[bucketColumnId]);
          title = `${bucketValue} - ${title}`;
        }

        metrics.push({
          label: title,
          value: value,
          colorThreshold: updateColor,
          rowIndex: rowIndex,
        });
      });
    });

    return metrics;
  }

  _filterBucket = (metric) => {
    const dimensions = this.props.visParams.dimensions;
    if (!dimensions.bucket) {
      return;
    }

    const table = this.props.visData;
    this.props.vis.API.events.filter({ table, column: dimensions.bucket.accessor, row: metric.rowIndex });
  }

  _renderMetric = (metric, index) => {
    return (
      <MetricVisValue
      key={index}
      metric={metric}
      fontSize={this.props.visParams.metric.style.fontSize}
      onFilter={metric.filterKey && metric.bucketAgg ? this._filterBucket : null}
      showLabel={this.props.visParams.metric.labels.show}
      color={this.props.vis.params.metric.style.fontColor}
      />
    );
  }

  render() {
      let metricsHtml;
      if (this.props.visData) {
        const metrics = this._processTableGroups(this.props.visData);
        metricsHtml = metrics.map(this._renderMetric);
      }
      return (<div className="mtrVis">{metricsHtml}</div>);
  }
  

    // const metricValueStyle = {
    //   fontSize: `${this.props.vis.params.metric.style.fontSize}pt`,
    //   color: `${this.props.vis.params.metric.style.fontColor}`,
    // };

    // return (
    //   <div
    //     className="mtrVis__container"
    //     style={{ backgroundColor: metric.colorThreshold }}
    //   >
    //     <div
    //       key={index}
    //       className="mtrVis__container"
    //       style={{ backgroundColor: metric.bgColor }}
    //     >
    //       <div
    //         className="mtrVis__value"
    //         style={metricValueStyle}
    //         dangerouslySetInnerHTML={{ __html: metric.value }}
    //       />
    //       {this.props.vis.params.metric.labels.show &&
    //         <div>{metric.label}</div>
    //       }
    //     </div>
    //   </div>
    // );


  // render() {
  //   let metricsHtml;
  //   if (this.props.visData) {
  //     const metrics = this._processTableGroups(this.props.visData);
  //     metricsHtml = metrics.map(this._renderMetric);
  //   }
  //   return (<div className="mtrVis">{metricsHtml}</div>);
  // }

  componentDidMount() {
    this.props.renderComplete();
  }

  componentDidUpdate() {
    this.props.renderComplete();
  }
}
