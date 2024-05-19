var dataset_text = document.getElementById("dataset_context")

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

function selectAll(){
    const textBox = document.getElementById("textbox");
    textBox.value = "ARSON, ASSAULT, BATTERY, BURGLARY, CONCEALED CARRY LICENSE VIOLATION, CRIMINAL DAMAGE, CRIMINAL SEXUAL ASSAULT, CRIMINAL TRESPASS, DECEPTIVE PRACTICE, DOMESTIC VIOLENCE, GAMBLING, HOMICIDE, HUMAN TRAFFICKING, INTERFERENCE WITH PUBLIC OFFICER, INTIMIDATION, KIDNAPPING, LIQUOR LAW VIOLATION, MOTOR VEHICLE THEFT, NARCOTICS, NON-CRIMINAL, OBSCENITY, OFFENSE INVOLVING CHILDREN, OTHER NARCOTIC VIOLATION, OTHER OFFENSE, PROSTITUTION, PUBLIC INDECENCY, PUBLIC PEACE VIOLATION, RITUALISM, ROBBERY, SEX OFFENSE, STALKING, THEFT, WEAPONS VIOLATION";
    find_min_max_crime_vals();
}

function deselectAll(){
    const textBox = document.getElementById("textbox");
    textBox.value = "";
    find_min_max_crime_vals();
}

function toggleMinimize() {
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

function updateTextBox() {
    const selectElement = document.getElementById("options");
    const textBox = document.getElementById("textbox");

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
    find_min_max_crime_vals();
}

function find_min_max_crime_vals(){
    let data = current_dataset[0]

    let max = -1;
    let min = -1;
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
            if(parseInt(neighborhood[dataset_label]) > max){
                max = parseInt(neighborhood[dataset_label])
            }
            else if(parseInt(neighborhood[dataset_label]) < min || min == -1){
                min = parseInt(neighborhood[dataset_label])
            }
        }
        maxVal = max;
        minVal = min;
        lyr_Communities_1.changed();
    }
}

function add_second_map(){
    let theMap = document.getElementById("map")
    let theMap2 = document.getElementById("map2")
    let container = document.getElementById("mapControlsContainer")
    let container2 = document.getElementById("mapControlsContainer2")
    if(second_map){
        theMap.classList.remove("duo");
        theMap.classList.add("solo");
        theMap2.classList.remove("shown");
        theMap2.classList.add("hidden");
        container.style.right = "0%"
        container2.classList.add("hidden");
    }
    else{
        theMap.classList.add("duo");
        theMap.classList.remove("solo");
        theMap2.classList.add("shown");
        theMap2.classList.remove("hidden");
        container.style.right = "50%"
        container2.classList.remove("hidden");
    }
    second_map = !second_map
    this.map.updateSize();
}

function change_dataset(dataset){
    let container = document.getElementById("mapControlsContainer")
    let container2 = document.getElementById("mapControlsContainer2")
    dataset_label = dataset;
    if(dataset == "crime"){
        dataset_text.innerHTML = crime_context;
        current_dataset = [crime_data]
        container.classList.remove("hidden");
        container2.classList.remove("hidden");
    }
    else{
        current_dataset = [community_data]
        container.classList.add("hidden");
        container2.classList.add("hidden");
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

    find_min_max_crime_vals()
    
    lyr_Communities_1.changed();
}

find_min_max_crime_vals()
slider.noUiSlider.on('end', () => find_min_max_crime_vals());
slider2.noUiSlider.on('end', () => find_min_max_crime_vals2());

dataset_text.innerHTML = crime_context