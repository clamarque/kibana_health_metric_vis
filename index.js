export default function (kibana) {
    return new kibana.Plugin({
        uiExports: {
            visTypes: [
                'plugins/health_metric_vis/health_metric_vis'
            ],
            styleSheetPaths: `${__dirname}/public/index.scss`,
        }
    });
};