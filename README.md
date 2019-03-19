# kibana_health_metric_vis
A kibana plugin  to change color of metric depending to the planned state of health 

This plugin is inspired by the plugin [health_metric_vis](https://github.com/DeanF/health_metric_vis)

<p align="center">
<img src="https://rawgit.com/clamarque/kibana_health_metric_vis/master/assets/images/demo.gif" alt="demo">
</p>

## Quick Start

You can install this plugin in Kibana 4/5/6 by doing the following instructions:

Note: Every release package includes a Plugin version (X.Y.Z) and a Kibana version (A.B.C).

### Simple installation

For kibana 5/6:

`$KIBANA_HOME/bin/kibana-plugin install https://github.com/clamarque/kibana_health_metric_vis/releases/download/vX.Y/kibana_health_metric_vis-A.B.C.zip `

Note: You can also look in [releases](https://github.com/clamarque/kibana_health_metric_vis/releases) for another version than this one!

For kibana 4:

`$KIBANA_HOME/bin/kibana plugin --install health-metric-vis -u https://github.com/clamarque/kibana_health_metric_vis/releases/download/v4.2/kibana_health_metric_vis-4.2.zip`

### Offline

For kibana 5/6:

* Download the plugin [here](https://github.com/clamarque/kibana_health_metric_vis/releases)
* `$KIBANA_HOME/bin/kibana-plugin install file:///$HOME_DIRECTORY/kibana_health_metric_vis-A.B.C.zip`


For kibana 4:

* Download the plugin [here](https://github.com/clamarque/kibana_health_metric_vis/releases/download/v4.2/kibana_health_metric_vis-4.2.zip)
* `$KIBANA_HOME/bin/kibana plugin --install health-metric-vis -u file:///$HOME_DIRECTORY/kibana_health_metric_vis-4.2.zip`

You can find the command for Windows [here](https://github.com/clamarque/Kibana_health_metric_vis/wiki#install-plugin-with-windows)

**Warning:** If you download or clone the directory directly, the installation will not work. In fact since kibana 5, it is necessary to put all the files under a folder empty called kibana (This does not apply to version 4).

## How to use

Click on the button **'Visualize'** and create a new visualization to select **'Health Metric'**

> In options, you can change the colors you want with hexadecimal color code **(#FFFFFF)** or by the color name **(white)**. If you change the color indicating the name of the color, the color indicator **will not update** and display **the black color by default**.

You can also specify a maximum threshold **(critical)** that is not exceeded but also an alert threshold **(warning)**. The color will be modified according to the state of health of the metric.

[See more details, the conception of plugin](https://github.com/clamarque/Kibana_health_metric_vis/wiki)

## Update 

If the version doesn't match yours, you can create a issue with the needed version.

## Others plugins

You can see others plugins listed by Elastic [here](https://www.elastic.co/guide/en/kibana/current/known-plugins.html)

## Author

clamarque
