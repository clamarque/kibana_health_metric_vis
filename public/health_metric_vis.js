import './index.less';
import mainTemplate from './health_metric_vis_params.html';
import { i18n } from '@kbn/i18n';
import { VisFactoryProvider } from 'ui/vis/vis_factory';
import { Schemas } from 'ui/vis/editors/default/schemas';
import { VisTypesRegistryProvider } from 'ui/registry/vis_types';
import { HealthMetricVisComponent } from './health_metric_vis_controller';
// we need to load the css ourselves

// we also need to load the controller and used by the template

// register the provider with the visTypes registry 
VisTypesRegistryProvider.register(HealthMetricVisProvider);

function HealthMetricVisProvider(Private) {
  const VisFactory = Private(VisFactoryProvider);

  // return the visType object, which kibana will use to display and configure new
  // Vis object of this type.

  return VisFactory.createReactVisualization({
    name: 'health-metric',
    title: i18n.translate('metricVis.metricTitle', { defaultMessage: 'health-metric' }),
    icon: 'visMetric',
    description: i18n.translate('metricVis.metricDescription', { defaultMessage: 'Displays a metric with a color according to the planned state of health'}),
    visConfig: {
      component: HealthMetricVisComponent,
      defaults: {
        addTooltip: true,
        addLegend: false,
        type: 'metric',
        metric: {
          percentageMode: false,
          colorsRange: [
            { from: 0, to: 10000 }
          ],
          labels: {
            show: true
          },
          style: {
            fontSize: 60,
            fontColor: 'black',
            invertScale: false,
            redThreshold: 0,
            yellowThreshold: 0,
            redColor: "#fd482f",
            yellowColor: "#ffa500",
            greenColor: "#6dc066"
          }
        }
      }
    },
    editorConfig: {
      collections: {},
      optionsTemplate: mainTemplate,
      schemas: new Schemas([
        {
          group: 'metrics',
          name: 'metric',
          title: i18n.translate('metricVis.schemas.metricTitle', { defaultMessage: 'Metric' }),
          min: 1,
          aggFilter: [
            '!std_dev', '!geo_centroid',
            '!derivative', '!serial_diff', '!moving_avg', '!cumulative_sum', '!geo_bounds'],
          defaults: [
            { type: 'count', schema: 'metric' }
          ]
        }, {
          group: 'buckets',
          name: 'group',
          title: i18n.translate('metricVis.schemas.splitGroupTitle', { defaultMessage: 'Split Group' }),
          min: 0,
          max: 1,
          aggFilter: ['!geohash_grid', '!filter']
        }
      ])
    }
  });
}

export default HealthMetricVisProvider;
