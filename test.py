import json
import csv

names = []
data = {}

with open("C:/Users/jkids\Documents/community_crime_here.csv", encoding='utf-8') as csvf:
        csvReader = csv.DictReader(csvf)
        for i, rows in enumerate(csvReader):
            row = {"community": rows["community"], "Year": rows["Year"], "primary_type": rows["primary_type"], "count": rows["count"]}
            if rows["community"] in data.keys():
                    data[rows["community"]].append(row)
            else:
                    data[rows["community"]] = [row]

with open('crime_data.json', 'w') as f:
    json.dump(data, f)