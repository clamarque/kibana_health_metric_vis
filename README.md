# kibana_health_metric_vis
A kibana plugin  to change color of metric depending to the planned state of health 

This plugin is inspired by the plugin [health_metric_vis](https://github.com/DeanF/health_metric_vis)

##Quick Start

You can install this plugin in Kibana ( >=4.5) by doing the following instructions: 

`git clone https://github.com/clamarque/kibana_health_metric_vis.git`

`zip -r kibana_health_metric_vis kibana_health_metric_vis`

`$KIBANA_HOME/bin/kibana plugin --install health-metric-vis -u file://$HOME_DIRECTORY/kibana_health_metric_vis.zip`

## How to use

Click on the button **'Visualize'** and create a new visualization to select **'Health Color Metric'**

In options, you can change the colors you want with hexadecimal color code **(#FFFFFF)** or by the color name **(white)**. If you change the color indicating the name of the color, the color indicator **will not update** and display **the black color by default**.
