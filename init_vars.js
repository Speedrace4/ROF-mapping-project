let maxVal = 0
let minVal = 0
let maxVal2 = 0
let minVal2 = 0

let yearMin = 2001;
let yearMax = 2024;
let yearMin2 = 2001;
let yearMax2 = 2024;

let current_dataset = [crime_data]
let current_dataset2 = [crime_data]
let dataset_label = "crime"
let dataset_label2 = "crime"

let second_map = false;

const crime_context = "This crime data measures the amount of each crime over the period of time selected. Data is 2001 up to April 2024."
const housing_context = "These are counts of the affordable rental housing developments that are supported by the City of Chicago to maintain affordability standards. Last updated May 15, 2024"
const libraries_context = "These are counts of the libraries in each neighborhood."
const broadband_context = "These are counts of the Broadband Innovation Zones. They are commercial and industrial corridors the City of Chicago has initially targeted for the private provision of gigabit or near-gigabit broadband speeds for businesses, universities and schools, hospitals, research institutions, and other community organizations. The City has solicited proposals from qualified vendors to provide these services."
const covid_context = "These are counts of the covid testing centers in each neighborhood."
const senior_context = "These are counts of the seniors centers in each neighborhood. Last updated April 17, 2019."
const school_context = "These are counts of the schools in each neighborhood. Last updated May 15, 2024."
const pothole_context = "These are counts of the potholes patched in each neighborhood. Last updated May 16, 2024."
const poverty_context = "Percentages of residents in families that are in poverty (below the Federal Poverty Level). Data is from 2018-2022.";
const licenses_context = "Counts of active business licenses per 1,000 residents.  Data is from October 24, 2023.";
const diversity_context = "The Economic Diversity Index measures the probability that any two residents of an area, chosen at random, belong to different family income levels, measured as multiples of the Federal Poverty Level. A score of 0 represents a perfectly homogenous community; the higher the score, the more economically diverse the area. The highest possible score is 0.833, not 1. Data is from 2018-2022.";
const hardship_context = "The Hardship Index is a composite score reflecting hardship in the community (higher values indicate greater hardship). It incorporates unemployment, age dependency, education, per capita income, crowded housing, and poverty into a single score that allows comparison between geographies. It is highly correlated with other measures of economic hardship, such as labor force statistics, and with poor health outcomes. Data is from 2018-2022.";
const income_context = "Median household income in the past 12 months. Data is from 2018-2022.";
const capita_income_context = "Per capita income in the past 12 months. Data is from 2018-2022.";
const trees_context = "Percent of Community Area shaded with tree foliage. Data is from 2017.";
const cleanliness_context = "Percent of adults who reported their neighborhood was generally free from litter. Data is from 2021-2022.";
const particulates_context = "Annual average concentration in micrograms per cubic meter. PM 2.5, or particulate matter smaller than 2.5 microns in diameter, is one of the most dangerous pollutants because the particles can penetrate deep into the alveoli of the lungs. Data is from 2023.";
const traffic_context = "A measure of proximity to vehicle traffic, defined as the annual average of the daily count of vehicles within 500 meters, divided by their distance in meters. Higher values indicate higher exposure to heavy traffic. Data is from 2023.";