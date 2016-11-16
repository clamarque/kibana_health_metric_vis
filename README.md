# kibana_health_metric_vis
A kibana plugin  to change color of metric depending to the planned state of health 

This plugin is inspired by the plugin [health_metric_vis](https://github.com/DeanF/health_metric_vis)

<p align="center">
<img src="https://github.com/clamarque/Kibana_health_metric_vis/blob/master/assets/img/demo.PNG">
</p>

##Quick Start

You can install this plugin in Kibana 5.0.0 by doing the following instructions:

###Clone

`git clone https://github.com/clamarque/kibana_health_metric_vis.git`

`cd kibana_health_metric_vis.git`

`zip -r kibana kibana`

`$KIBANA_HOME/bin/kibana plugin --install health-metric-vis -u file://$HOME_DIRECTORY/kibana.zip`

###Download .zip

`unzip kibana_health_metric_vis-master.zip`

`cd kibana_health_metric_vis-master`

`zip -r kibana kibana`

`$KIBANA_HOME/bin/kibana plugin --install health-metric-vis -u file://$HOME_DIRECTORY/kibana.zip`

You can find the command for Windows [here](https://github.com/clamarque/Kibana_health_metric_vis/wiki#some-commands)

## How to use

Click on the button **'Visualize'** and create a new visualization to select **'Health Color Metric'**

> In options, you can change the colors you want with hexadecimal color code **(#FFFFFF)** or by the color name **(white)**. If you change the color indicating the name of the color, the color indicator **will not update** and display **the black color by default**.

You can also specify a maximum threshold **(critical)** that is not exceeded but also an alert threshold **(warning)**. The color will be modified according to the state of health of the metric.

[See more details, the conception of plugin](https://github.com/clamarque/Kibana_health_metric_vis/wiki)


