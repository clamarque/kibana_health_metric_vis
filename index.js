import { resolve } from 'path';

export default function (kibana) {
    return new kibana.Plugin({
        uiExports: {
            visTypes: [
                'plugins/health_metric_vis/health_metric_vis'
            ],
            styleSheetPaths: resolve(__dirname, 'public/index.scss'),
        }
    });
};