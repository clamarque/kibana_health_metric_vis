import 'plugins/health_metric_vis/health_metric_vis.less';
import 'plugins/health_metric_vis/health_metric_vis_controller';
import image from './images/icon-number.svg';

import { VisFactoryProvider } from 'ui/vis/vis_factory';
import { CATEGORY } from 'ui/vis/vis_category';
import { VisTypesRegistryProvider } from 'ui/registry/vis_types';
import { VisSchemasProvider } from 'ui/vis/editors/default/schemas';

import healthMetricVisTemplate from 'plugins/health_metric_vis/health_metric_vis.html';
import healthMetricVisParams from 'plugins/health_metric_vis/health_metric_vis_params.html';
// register the provider with the visTypes registry so that other know it exists
VisTypesRegistryProvider.register(HealthMetricVisProvider);

export default function HealthMetricVisProvider(Private) {
  const Schemas = Private(VisSchemasProvider);
  const VisFactory = Private(VisFactoryProvider);

  // return the visType object, which kibana will use to display and configure new
  // Vis object of this type.
  return VisFactory.createAngularVisualization({
    name: 'health-metric',
    title: 'Health Metric',
    image,
    description: 'Displays a metric with a color according to the planned state of health.',
    category: CATEGORY.DATA,
    visConfig: {
      defaults: {
        handleNoResults: true,
        fontSize: 60,
        fontColor: 'white',
        invertScale: false,
        redThreshold: 0,
        yellowThreshold: 0,
        redColor: "#fd482f",
        yellowColor: "#ffa500",
        greenColor: "#6dc066"
      },
      template: healthMetricVisTemplate
    },
    implementsRenderComplete: true,
    editorConfig: {
      optionsTemplate: healthMetricVisParams,
      schemas: new Schemas([
        {
          group: 'metrics',
          name: 'metric',
          title: 'Metric',
          min: 1,
          max: 1,
          aggFilter: ['!derivative', '!geo_centroid'],
          defaults: [
            { type: 'count', schema: 'metric' }
          ]
        }
      ])
    }
  });
}
