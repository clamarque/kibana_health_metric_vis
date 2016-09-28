/* jshint esversion: 6 */

define(function (require) {
  // we need to load the css ourselves
  require('plugins/health_metric_vis/health_metric_vis.less');

  // we also need to load the controller and used by the template
  require('plugins/health_metric_vis/health_metric_vis_controller');

  // register the provider with the visTypes registry
  require('ui/registry/vis_types').register(HealthMetricVisProvider);

  function HealthMetricVisProvider(Private) {
    const TemplateVisType = Private(require('ui/template_vis_type/TemplateVisType'));
    const Schemas = Private(require('ui/Vis/Schemas'));

    // return the visType object, which kibana will use to display and configure new
    // Vis object of this type.
    return new TemplateVisType({
      name: 'health-metric',
      title: 'Health Color Metric',
      description: 'Displays a metric with a color according to the planned state of health.',
      icon: 'fa-calculator',
      template: require('plugins/health_metric_vis/health_metric_vis.html'),
      params: {
        defaults: {
          handleNoResults: true,
          fontSize: 60,
          fontColor: 'white',
          invertScale: false,
          redThreshold: 0,
          greenThreshold: 0,
          redColor: "#fd482f",
          yellowColor: "#ffa500",
          greenColor: "#6dc066"
        },
        editor: require('plugins/health_metric_vis/health_metric_vis_params.html')
      },
      schemas: new Schemas([
        {
          group: 'metrics',
          name: 'metric',
          title: 'Metric',
          min: 1,
          max: 1,
          defaults: [
            { type: 'count', schema: 'metric' }
          ]
        }
      ])
    });
  }

  // export the provider so that the visType can be required with Private()
  return HealthMetricVisProvider;
});
