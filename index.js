module.exports = function (kibana) {
    return new kibana.Plugin({
        uiExports: {
            visTypes: [
                'plugins/health_metric_vis/health_metric_vis'
            ]
        }
    });
};