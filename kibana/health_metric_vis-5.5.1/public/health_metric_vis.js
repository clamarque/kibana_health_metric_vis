import 'plugins/health_metric_vis/health_metric_vis.less';
import 'plugins/health_metric_vis/health_metric_vis_controller';
import VisVisTypeProvider from 'ui/vis/vis_type';
import TemplateVisTypeTemplateVisTypeProvider from 'ui/template_vis_type/template_vis_type';
import VisSchemasProvider from 'ui/vis/schemas';
import healthMetricVisTemplate from 'plugins/health_metric_vis/health_metric_vis.html';
import healthMetricVisParamsTemplate from 'plugins/health_metric_vis/health_metric_vis_params.html';
import visTypesRegistry from 'ui/registry/vis_types';
import image from './images/icon-number.svg';

// Register the provider with the visTypes registry
visTypesRegistry.register(HealthMetricVisProvider);

function HealthMetricVisProvider(Private) {
  const VisType = Private(VisVisTypeProvider)
  const TemplateVisType = Private(TemplateVisTypeTemplateVisTypeProvider);
  const Schemas = Private(VisSchemasProvider);

  // return the visType object, which kibana will use to display and configure new
  // Vis object of this type.
  return new TemplateVisType({
    name: 'health-metric',
    title: 'Health Metric',
    image,
    description: 'Displays a metric with a color according to the planned state of health.',
    category: VisType.CATEGORY.DATA,
    template: healthMetricVisTemplate,
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
      editor: healthMetricVisParamsTemplate
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

// export the provider so that the visType can be required with Private()
export default HealthMetricVisProvider;
