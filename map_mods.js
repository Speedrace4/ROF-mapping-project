var dataset_text = document.getElementById("dataset_context")
var dataset_text2 = document.getElementById("dataset_context2")

var slider = document.getElementById('slider');

noUiSlider.create(slider, {
    start: [2001, 2024],
    connect: true,
    range: {
        'min': 2001,
        'max': 2024
    },
    tooltips: true,
    format: {
        to: (v) => parseFloat(v).toFixed(0),
        from: (v) => parseFloat(v).toFixed(0)
    }
});

var slider_tags = document.getElementsByClassName('noUi-tooltip');

slider_tags[0].classList.add("top_tag")
slider_tags[1].classList.add("bottom_tag")

var slider2 = document.getElementById('slider2');

noUiSlider.create(slider2, {
    start: [2001, 2024],
    connect: true,
    range: {
        'min': 2001,
        'max': 2024
    },
    tooltips: true,
    format: {
        to: (v) => parseFloat(v).toFixed(0),
        from: (v) => parseFloat(v).toFixed(0)
    }
});

var slider_tags = document.getElementsByClassName('noUi-tooltip');

slider_tags[2].classList.add("top_tag")
slider_tags[3].classList.add("bottom_tag")

let allCrimes = []
let allCrimes2 = []

function selectAll(){
    const textBox = document.getElementById("textbox");
    textBox.value = "ARSON, ASSAULT, BATTERY, BURGLARY, CONCEALED CARRY LICENSE VIOLATION, CRIMINAL DAMAGE, CRIMINAL SEXUAL ASSAULT, CRIMINAL TRESPASS, DECEPTIVE PRACTICE, DOMESTIC VIOLENCE, GAMBLING, HOMICIDE, HUMAN TRAFFICKING, INTERFERENCE WITH PUBLIC OFFICER, INTIMIDATION, KIDNAPPING, LIQUOR LAW VIOLATION, MOTOR VEHICLE THEFT, NARCOTICS, NON-CRIMINAL, OBSCENITY, OFFENSE INVOLVING CHILDREN, OTHER NARCOTIC VIOLATION, OTHER OFFENSE, PROSTITUTION, PUBLIC INDECENCY, PUBLIC PEACE VIOLATION, RITUALISM, ROBBERY, SEX OFFENSE, STALKING, THEFT, WEAPONS VIOLATION";
    find_min_max_crime_vals(1);
}

function selectAll2(){
    const textBox = document.getElementById("textbox2");
    textBox.value = "ARSON, ASSAULT, BATTERY, BURGLARY, CONCEALED CARRY LICENSE VIOLATION, CRIMINAL DAMAGE, CRIMINAL SEXUAL ASSAULT, CRIMINAL TRESPASS, DECEPTIVE PRACTICE, DOMESTIC VIOLENCE, GAMBLING, HOMICIDE, HUMAN TRAFFICKING, INTERFERENCE WITH PUBLIC OFFICER, INTIMIDATION, KIDNAPPING, LIQUOR LAW VIOLATION, MOTOR VEHICLE THEFT, NARCOTICS, NON-CRIMINAL, OBSCENITY, OFFENSE INVOLVING CHILDREN, OTHER NARCOTIC VIOLATION, OTHER OFFENSE, PROSTITUTION, PUBLIC INDECENCY, PUBLIC PEACE VIOLATION, RITUALISM, ROBBERY, SEX OFFENSE, STALKING, THEFT, WEAPONS VIOLATION";
    find_min_max_crime_vals(2);
}

function deselectAll(){
    const textBox = document.getElementById("textbox");
    textBox.value = "";
    find_min_max_crime_vals(1);
}

function deselectAll2(){
    const textBox = document.getElementById("textbox2");
    textBox.value = "";
    find_min_max_crime_vals(2);
}

function toggleMinimize(type) {
    if(type == 1){
        const mapControls = document.getElementById("mapControls");
        const minimizeButton = document.getElementById("minimizeButton");

        if (mapControls.classList.contains("minimized")) {
            mapControls.classList.remove("minimized");
            minimizeButton.textContent = "Minimize";
        } else {
            mapControls.classList.add("minimized");
            minimizeButton.textContent = "Maximize";
        }
    }
    else{
        const mapControls = document.getElementById("mapControls2");
        const minimizeButton = document.getElementById("minimizeButton2");

        if (mapControls.classList.contains("minimized")) {
            mapControls.classList.remove("minimized");
            minimizeButton.textContent = "Minimize";
        } else {
            mapControls.classList.add("minimized");
            minimizeButton.textContent = "Maximize";
        }
    }
}

function updateTextBox(type) {
    let selectElement;
    let textBox;
    if(type == 1){
        selectElement = document.getElementById("options");
        textBox = document.getElementById("textbox");
    }
    else{
        selectElement = document.getElementById("options2");
        textBox = document.getElementById("textbox2");
    }

    // Get selected options
    const selectedOptions = Array.from(selectElement.selectedOptions).map(option => option.text);

    // Get the current value of the text box
    let currentText = textBox.value;

    // Toggle the presence of each selected option in the text box
    selectedOptions.forEach(option => {
        if (currentText.includes(option)) {
            // Remove the option from the current text box value if it's already present
            if(currentText.endsWith(option)){
                currentText = currentText.replace(new RegExp(", " + option), '');
                currentText = currentText.replace(new RegExp(option), '');
            }
            else{
                currentText = currentText.replace(new RegExp(option + ",?\\s*"), '');
            }
        } else {
            // Append the option to the current text box value if it's not already present
            if (currentText.length > 0) {
                currentText += ", ";
            }
            currentText += option;
        }
    });

    // Update the text box value with the updated options
    textBox.value = currentText;
    selectElement.selectIndex = -1;
    Array.from(selectElement.selectedOptions).forEach((e) => e.selected = false)
    find_min_max_crime_vals(type);
}

function find_min_max_crime_vals(type){
    let data = current_dataset[0]
    let data2 = current_dataset2[0]

    let max = -1;
    let min = -1;
    if(type == 1){
        if(dataset_label == "crime"){

            yearMin = parseInt(slider_tags[0].innerHTML)
            yearMax = parseInt(slider_tags[1].innerHTML)
            const textBox = document.getElementById("textbox");

            for(const [key, neighborhood] of Object.entries(data)){
                let thisCount = 0;
                for (let n in neighborhood){
                    if(!(allCrimes.includes(neighborhood[n]["primary_type"]))){
                        allCrimes.push(neighborhood[n]["primary_type"])
                    }
                    if(parseInt(neighborhood[n]["Year"]) >= yearMin && parseInt(neighborhood[n]["Year"]) <= yearMax && ((textBox.value.startsWith(neighborhood[n]["primary_type"]) && textBox.value.length == neighborhood[n]["primary_type"].length) || textBox.value.startsWith(neighborhood[n]["primary_type"] + ",") || textBox.value.endsWith(", " + neighborhood[n]["primary_type"]) || textBox.value.includes(", " + neighborhood[n]["primary_type"] + ",") || (textBox.value.includes("NON-CRIMINAL") && neighborhood[n]["primary_type"].includes("NON") && neighborhood[n]["primary_type"].includes("CRIMINAL")) || (textBox.value.includes("CRIMINAL SEXUAL ASSAULT") && neighborhood[n]["primary_type"].includes("SEXUAL ASSAULT")) || textBox.value.includes("ALL CRIMES"))){
                        thisCount += parseInt(neighborhood[n]["count"])
                    }
                }
                if(thisCount > max){
                    max = thisCount;
                }
                if(thisCount < min || min == -1){
                    min = thisCount;
                }
            }

            maxVal = max;
            minVal = min;
            lyr_Communities_1.changed();
        }
        else{
            for(const [key, neighborhood] of Object.entries(data)){
                if(parseFloat(neighborhood[dataset_label]) > max){
                    max = parseFloat(neighborhood[dataset_label])
                }
                else if(parseFloat(neighborhood[dataset_label]) < min || min == -1){
                    min = parseFloat(neighborhood[dataset_label])
                }
            }
            maxVal = max;
            minVal = min;
            lyr_Communities_1.changed();
        }
    }
    else{
        max = -1;
        min = -1;
        if(dataset_label2 == "crime"){

            yearMin2 = parseInt(slider_tags[2].innerHTML)
            yearMax2 = parseInt(slider_tags[3].innerHTML)
            const textBox = document.getElementById("textbox2");

            for(const [key, neighborhood] of Object.entries(data2)){
                let thisCount = 0;
                for (let n in neighborhood){
                    if(!(allCrimes2.includes(neighborhood[n]["primary_type"]))){
                        allCrimes2.push(neighborhood[n]["primary_type"])
                    }
                    if(parseInt(neighborhood[n]["Year"]) >= yearMin2 && parseInt(neighborhood[n]["Year"]) <= yearMax2 && ((textBox.value.startsWith(neighborhood[n]["primary_type"]) && textBox.value.length == neighborhood[n]["primary_type"].length) || textBox.value.startsWith(neighborhood[n]["primary_type"] + ",") || textBox.value.endsWith(", " + neighborhood[n]["primary_type"]) || textBox.value.includes(", " + neighborhood[n]["primary_type"] + ",") || (textBox.value.includes("NON-CRIMINAL") && neighborhood[n]["primary_type"].includes("NON") && neighborhood[n]["primary_type"].includes("CRIMINAL")) || (textBox.value.includes("CRIMINAL SEXUAL ASSAULT") && neighborhood[n]["primary_type"].includes("SEXUAL ASSAULT")) || textBox.value.includes("ALL CRIMES"))){
                        thisCount += parseInt(neighborhood[n]["count"])
                    }
                }
                if(thisCount > max){
                    max = thisCount;
                }
                if(thisCount < min || min == -1){
                    min = thisCount;
                }
            }

            maxVal2 = max;
            minVal2 = min;
            lyr_Communities_2.changed();
        }
        else{
            for(const [key, neighborhood] of Object.entries(data2)){
                if(parseFloat(neighborhood[dataset_label2]) > max){
                    max = parseFloat(neighborhood[dataset_label2])
                }
                else if(parseFloat(neighborhood[dataset_label2]) < min || min == -1){
                    min = parseFloat(neighborhood[dataset_label2])
                }
            }
            maxVal2 = max;
            minVal2 = min;
            lyr_Communities_2.changed();
        }
    }
}

function add_second_map(){
    var context = document.getElementById("dataset_context_container2")
    var map2Dataset = document.getElementById("map2Datasets")
    let theMap = document.getElementById("map")
    let theMap2 = document.getElementById("map2")
    let container = document.getElementById("mapControlsContainer")
    let container2 = document.getElementById("mapControlsContainer2")
    if(second_map){
        theMap.classList.remove("duo");
        theMap.classList.add("solo");
        theMap2.classList.remove("shown");
        theMap2.classList.add("hidden");
        map2Dataset.classList.add("hidden");
        container.style.right = "0%"
        context.classList.add("hidden");
        if(dataset_label2 == "crime"){
            container2.classList.add("hidden");
        }
    }
    else{
        theMap.classList.add("duo");
        theMap.classList.remove("solo");
        theMap2.classList.add("shown");
        theMap2.classList.remove("hidden");
        map2Dataset.classList.remove("hidden");
        container.style.right = "50%"
        context.classList.remove("hidden");
        if(dataset_label2 == "crime"){
            container2.classList.remove("hidden");
        }
    }
    second_map = !second_map
    this.map.updateSize();
    this.map2.updateSize();

    map2.getView().fit([-9798650.124116, 5090505.780824, -9721601.855923, 5169624.836970], map2.getSize());
}

function change_dataset(dataset, type){
    if(type == 1){
        let container = document.getElementById("mapControlsContainer")
        dataset_label = dataset;
        if(dataset == "crime"){
            dataset_text.innerHTML = crime_context;
            current_dataset = [crime_data]
            container.classList.remove("hidden");
        }
        else if(["trees", "poverty", "licenses", "diversity", "hardship", "income", "capita_income", "cleanliness", "particulates", "traffic"].includes(dataset.toLowerCase())){
            current_dataset = [other_data]
            container.classList.add("hidden");
        }
        else{
            current_dataset = [community_data]
            container.classList.add("hidden");
        }

        if(dataset == "units"){
            dataset_text.innerHTML = housing_context;
        }
        else if(dataset == "libraries"){
            dataset_text.innerHTML = libraries_context;
        }
        else if(dataset == "innovations"){
            dataset_text.innerHTML = school_context;
        }
        else if(dataset == "testers"){
            dataset_text.innerHTML = covid_context;
        }
        else if(dataset == "seniors"){
            dataset_text.innerHTML = senior_context;
        }
        else if(dataset == "schools"){
            dataset_text.innerHTML = school_context;
        }
        else if(dataset == "potholes"){
            dataset_text.innerHTML = pothole_context;
        }
        else if(dataset == "poverty"){
            dataset_text.innerHTML = poverty_context;
        }
        else if(dataset == "diversity"){
            dataset_text.innerHTML = diversity_context;
        }
        else if(dataset == "licenses"){
            dataset_text.innerHTML = licenses_context;
        }
        else if(dataset == "hardship"){
            dataset_text.innerHTML = hardship_context;
        }
        else if(dataset == "trees"){
            dataset_text.innerHTML = trees_context;
        }
        else if(dataset == "income"){
            dataset_text.innerHTML = income_context;
        }
        else if(dataset == "capita_income"){
            dataset_text.innerHTML = capita_income_context;
        }
        else if(dataset == "cleanliness"){
            dataset_text.innerHTML = cleanliness_context;
        }
        else if(dataset == "particulates"){
            dataset_text.innerHTML = particulates_context;
        }
        else if(dataset == "traffic"){
            dataset_text.innerHTML = traffic_context;
        }

        find_min_max_crime_vals(1)
        
        lyr_Communities_1.changed();
    }
    else{
        let container = document.getElementById("mapControlsContainer2")
        dataset_label2 = dataset;
        if(dataset == "crime"){
            dataset_text2.innerHTML = crime_context;
            current_dataset2 = [crime_data]
            container.classList.remove("hidden");
        }
        else if(["trees", "poverty", "licenses", "diversity", "hardship", "income", "capita_income", "cleanliness", "particulates", "traffic"].includes(dataset.toLowerCase())){
            current_dataset2 = [other_data]
            container.classList.add("hidden");
        }
        else{
            current_dataset2 = [community_data]
            container.classList.add("hidden");
        }

        if(dataset == "units"){
            dataset_text2.innerHTML = housing_context;
        }
        else if(dataset == "libraries"){
            dataset_text2.innerHTML = libraries_context;
        }
        else if(dataset == "innovations"){
            dataset_text2.innerHTML = school_context;
        }
        else if(dataset == "testers"){
            dataset_text2.innerHTML = covid_context;
        }
        else if(dataset == "seniors"){
            dataset_text2.innerHTML = senior_context;
        }
        else if(dataset == "schools"){
            dataset_text2.innerHTML = school_context;
        }
        else if(dataset == "potholes"){
            dataset_text2.innerHTML = pothole_context;
        }
        else if(dataset == "poverty"){
            dataset_text2.innerHTML = poverty_context;
        }
        else if(dataset == "diversity"){
            dataset_text2.innerHTML = diversity_context;
        }
        else if(dataset == "licenses"){
            dataset_text2.innerHTML = licenses_context;
        }
        else if(dataset == "hardship"){
            dataset_text2.innerHTML = hardship_context;
        }
        else if(dataset == "trees"){
            dataset_text2.innerHTML = trees_context;
        }
        else if(dataset == "income"){
            dataset_text2.innerHTML = income_context;
        }
        else if(dataset == "capita_income"){
            dataset_text2.innerHTML = capita_income_context;
        }
        else if(dataset == "cleanliness"){
            dataset_text2.innerHTML = cleanliness_context;
        }
        else if(dataset == "particulates"){
            dataset_text2.innerHTML = particulates_context;
        }
        else if(dataset == "traffic"){
            dataset_text2.innerHTML = traffic_context;
        }

        find_min_max_crime_vals(2)
        
        lyr_Communities_2.changed();
    }
}

find_min_max_crime_vals(1)
find_min_max_crime_vals(2)
slider.noUiSlider.on('end', () => find_min_max_crime_vals(1));
slider2.noUiSlider.on('end', () => find_min_max_crime_vals(2));

dataset_text.innerHTML = crime_context

dataset_text2.innerHTML = crime_context