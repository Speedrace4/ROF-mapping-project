var size = 0;
var placement = 'point';

var the_color = 0;

function mapValueToRGB(value, minRGB, maxRGB) {
    // Ensure the value is within the specified range
    let data = current_dataset[0]
    const textBox = document.getElementById("textbox");

    let neighborhood = data[value];
    let overallCount = 0;

    if(dataset_label == "crime" && (maxVal == 0 || textBox.value == "")){
        return "rgba(36, 30, 201,0.9)"
    }
    else if(maxVal == 0){
        return "rgba(36, 30, 201,0.9)"
    }

    if(dataset_label == "crime"){
        for (let n in neighborhood){
                if(parseInt(neighborhood[n]["Year"]) >= yearMin && parseInt(neighborhood[n]["Year"]) <= yearMax && ((textBox.value.startsWith(neighborhood[n]["primary_type"]) && textBox.value.length == neighborhood[n]["primary_type"].length) || textBox.value.startsWith(neighborhood[n]["primary_type"] + ",") || textBox.value.endsWith(", " + neighborhood[n]["primary_type"]) || textBox.value.includes(", " + neighborhood[n]["primary_type"] + ",") || (textBox.value.includes("NON-CRIMINAL") && neighborhood[n]["primary_type"].includes("NON") && neighborhood[n]["primary_type"].includes("CRIMINAL")) || (textBox.value.includes("CRIMINAL SEXUAL ASSAULT") && neighborhood[n]["primary_type"].includes("SEXUAL ASSAULT")) || textBox.value.includes("ALL CRIMES"))){
                    overallCount += parseInt(neighborhood[n]["count"])
                }
        }
    }
    else{
        overallCount = neighborhood[dataset_label];
    }

    value = overallCount

    // Extract RGBA components
    const minRed = minRGB[0],
          minGreen = minRGB[1],
          minBlue = minRGB[2];

    const maxRed = maxRGB[0],
          maxGreen = maxRGB[1],
          maxBlue = maxRGB[2];

    // Map the value to the corresponding RGBA components
    const red = Math.round((maxRed - minRed) * (value - minVal) / (maxVal - minVal) + minRed);
    const green = Math.round((maxGreen - minGreen) * (value - minVal) / (maxVal - minVal) + minGreen);
    const blue = Math.round((maxBlue - minBlue) * (value - minVal) / (maxVal - minVal) + minBlue);

    // Construct the RGBA string
    const rgbaString = `rgba(${red}, ${green}, ${blue}, 0.9)`;

    return rgbaString;
}

minRGB = [237, 221, 221]
maxRGB = [207, 12, 12]

function categories_Communities_1(feature, value, size, resolution, labelText,
    labelFont, labelFill, bufferColor, bufferWidth,
    placement, color) {
        return [ new ol.style.Style({
            stroke: new ol.style.Stroke({color: 'rgba(35,35,35,1.0)', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 0.988}),fill: new ol.style.Fill({color: mapValueToRGB(value, minRGB, maxRGB)}),
            text: createTextStyle(feature, resolution, labelText, labelFont,
                       labelFill, placement, bufferColor,
                       bufferWidth)
            })];
};

var style_Communities_1 = function(feature, resolution){
    var context = {
        feature: feature,
        variables: {}
    };
    var value = feature.get("community");
    var labelText = "";
    size = 0;
    var labelFont = "10px, sans-serif";
    var labelFill = "#000000";
    var bufferColor = "";
    var bufferWidth = 0;
    var textAlign = "left";
    var offsetX = 8;
    var offsetY = 3;
    var color = the_color;
    var placement = 'point';
    if ("" !== null) {
        labelText = String("");
    }
    var style = categories_Communities_1(feature, value, size, resolution, labelText,
        labelFont, labelFill, bufferColor,
        bufferWidth, placement, color);

    return style;
};