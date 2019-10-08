import { resolve } from 'path';
import { existsSync } from 'fs';

export default function (kibana) {
    console.log('getCSS', resolve(__dirname, 'public/index.scss'));
    return new kibana.Plugin({
        uiExports: {
            visTypes: [
                'plugins/health_metric_vis/health_metric_vis'
            ],
            styleSheetPaths: [resolve(__dirname, 'public/index.scss'),resolve(__dirname, 'public/index.css')].find(p => existsSync(p))
        }
    });
};