var size = 0;
var placement = 'point';

var the_color = 0;

function mapValueToRGB(value, minRGB, maxRGB, type) {
    // Ensure the value is within the specified range
    let data;
    let textBox;
    if(type == 1){
        data = current_dataset[0]
    }
    else{
        data = current_dataset2[0]
    }
    if(type == 1 && dataset_label == "crime"){
        textBox = document.getElementById("textbox");
    }
    else if(type == 2 && dataset_label2 == "crime"){
        textBox = document.getElementById("textbox2");
    }

    let neighborhood = data[value];
    let overallCount = 0;

    if(type == 1 && dataset_label == "crime" && (maxVal == 0 || textBox.value == "")){
        return "rgba(36, 30, 201,0.9)"
    }
    else if(type == 1 && maxVal == 0){
        return "rgba(36, 30, 201,0.9)"
    }
    else if(type == 2 && dataset_label2 == "crime" && (maxVal2 == 0 || textBox.value == "")){
        return "rgba(36, 30, 201,0.9)"
    }
    else if(type == 2 && maxVal2 == 0){
        return "rgba(36, 30, 201,0.9)"
    }

    if(type == 1 && dataset_label == "crime"){
        for (let n in neighborhood){
                if(parseInt(neighborhood[n]["Year"]) >= yearMin && parseInt(neighborhood[n]["Year"]) <= yearMax && ((textBox.value.startsWith(neighborhood[n]["primary_type"]) && textBox.value.length == neighborhood[n]["primary_type"].length) || textBox.value.startsWith(neighborhood[n]["primary_type"] + ",") || textBox.value.endsWith(", " + neighborhood[n]["primary_type"]) || textBox.value.includes(", " + neighborhood[n]["primary_type"] + ",") || (textBox.value.includes("NON-CRIMINAL") && neighborhood[n]["primary_type"].includes("NON") && neighborhood[n]["primary_type"].includes("CRIMINAL")) || (textBox.value.includes("CRIMINAL SEXUAL ASSAULT") && neighborhood[n]["primary_type"].includes("SEXUAL ASSAULT")) || textBox.value.includes("ALL CRIMES"))){
                    overallCount += parseInt(neighborhood[n]["count"])
                }
        }
        console.log("First", overallCount, maxVal, minVal, yearMax, yearMin)
    }
    else if(type == 1){
        overallCount = neighborhood[dataset_label];
    }
    else if(type == 2 && dataset_label2 == "crime"){
        for (let n in neighborhood){
                if(parseInt(neighborhood[n]["Year"]) >= yearMin2 && parseInt(neighborhood[n]["Year"]) <= yearMax2 && ((textBox.value.startsWith(neighborhood[n]["primary_type"]) && textBox.value.length == neighborhood[n]["primary_type"].length) || textBox.value.startsWith(neighborhood[n]["primary_type"] + ",") || textBox.value.endsWith(", " + neighborhood[n]["primary_type"]) || textBox.value.includes(", " + neighborhood[n]["primary_type"] + ",") || (textBox.value.includes("NON-CRIMINAL") && neighborhood[n]["primary_type"].includes("NON") && neighborhood[n]["primary_type"].includes("CRIMINAL")) || (textBox.value.includes("CRIMINAL SEXUAL ASSAULT") && neighborhood[n]["primary_type"].includes("SEXUAL ASSAULT")) || textBox.value.includes("ALL CRIMES"))){
                    overallCount += parseInt(neighborhood[n]["count"])
                }
        }
        console.log(overallCount, maxVal2, minVal2, yearMax2, yearMin2)
    }
    else if(type == 2){
        overallCount = neighborhood[dataset_label2];
        console.log(overallCount, maxVal2, minVal2, yearMax2, yearMin2)
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
    if(type == 1){
        const red = Math.round((maxRed - minRed) * (value - minVal) / (maxVal - minVal) + minRed);
        const green = Math.round((maxGreen - minGreen) * (value - minVal) / (maxVal - minVal) + minGreen);
        const blue = Math.round((maxBlue - minBlue) * (value - minVal) / (maxVal - minVal) + minBlue);

        // Construct the RGBA string
        const rgbaString = `rgba(${red}, ${green}, ${blue}, 0.9)`;
    
        return rgbaString;
    }
    else{
        const red = Math.round((maxRed - minRed) * (value - minVal2) / (maxVal2 - minVal2) + minRed);
        const green = Math.round((maxGreen - minGreen) * (value - minVal2) / (maxVal2 - minVal2) + minGreen);
        const blue = Math.round((maxBlue - minBlue) * (value - minVal2) / (maxVal2 - minVal2) + minBlue);

        // Construct the RGBA string
        const rgbaString = `rgba(${red}, ${green}, ${blue}, 0.9)`;
    
        return rgbaString;
    }
}

minRGB = [237, 221, 221]
maxRGB = [207, 12, 12]

function categories_Communities_1(feature, value, size, resolution, labelText,
    labelFont, labelFill, bufferColor, bufferWidth,
    placement, color) {
        return [ new ol.style.Style({
            stroke: new ol.style.Stroke({color: 'rgba(35,35,35,1.0)', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 0.988}),fill: new ol.style.Fill({color: mapValueToRGB(value, minRGB, maxRGB, 1)}),
            text: createTextStyle(feature, resolution, labelText, labelFont,
                       labelFill, placement, bufferColor,
                       bufferWidth)
            })];
};

function categories_Communities_2(feature, value, size, resolution, labelText,
    labelFont, labelFill, bufferColor, bufferWidth,
    placement, color) {
        return [ new ol.style.Style({
            stroke: new ol.style.Stroke({color: 'rgba(35,35,35,1.0)', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 0.988}),fill: new ol.style.Fill({color: mapValueToRGB(value, minRGB, maxRGB, 2)}),
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

var style_Communities_2 = function(feature, resolution){
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
    var style = categories_Communities_2(feature, value, size, resolution, labelText,
        labelFont, labelFill, bufferColor,
        bufferWidth, placement, color);

    return style;
};