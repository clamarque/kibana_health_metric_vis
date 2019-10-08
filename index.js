export default function (kibana) {
    console.log('getCSS', resolve(__dirname, 'public/index.scss'));
    return new kibana.Plugin({
        uiExports: {
            visTypes: [
                'plugins/health_metric_vis/health_metric_vis'
            ]
        }
    });
};