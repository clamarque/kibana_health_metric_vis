import 'plugins/health_metric_vis/health_metric_vis.less';
import 'plugins/health_metric_vis/health_metric_vis_controller';
import image from './images/icon-number.svg';

import { TemplateVisTypeProvider } from 'ui/template_vis_type';
import { VisVisTypeProvider } from 'ui/vis/vis_type';
import { VisTypesRegistryProvider } from 'ui/registry/vis_types';
import { VisSchemasProvider } from 'ui/vis/schemas';
// register the provider with the visTypes registry so that other know it exists
VisTypesRegistryProvider.register(HealthMetricVisProvider);

export default function HealthMetricVisProvider(Private) {
  const VisType = Private(VisVisTypeProvider)
  const TemplateVisType = Private(TemplateVisTypeProvider);
  const Schemas = Private(VisSchemasProvider);

  // return the visType object, which kibana will use to display and configure new
  // Vis object of this type.
  return new TemplateVisType({
    name: 'health-metric',
    title: 'Health Metric',
    image,
    description: 'Displays a metric with a color according to the planned state of health.',
    category: VisType.CATEGORY.DATA,
    template: require('plugins/health_metric_vis/health_metric_vis.html'),
    params: {
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
      editor: require('plugins/health_metric_vis/health_metric_vis_params.html')
    },
    implementsRenderComplete: true,
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
  });
}