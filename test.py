import json
import csv

names = []
data = {}

with open("C:/Users/jkids\Documents/health_atlas.csv", encoding='utf-8') as csvf:
        csvReader = csv.DictReader(csvf)
        for i, rows in enumerate(csvReader):
            if(len(rows["Name"]) == 0):
                  continue
            row = {"community": rows["Community"], "poverty": rows["POV_2018-2022"], "licenses": rows["CHANVYI_2023"], "diversity": rows["EDX_2018-2022"], "hardship": rows["HDX_2018-2022"], "income": rows["INC_2018-2022"], "capita_Income": rows["PCI_2018-2022"], "trees": rows["CHAKUCW_2017"], "cleanliness": rows["HCSNLP_2021-2022"], "particulates": rows["PMC_2023"], "traffic": rows["TRF_2023"]}
            if rows["Community"] in data.keys():
                    data[rows["Community"]].append(row)
            else:
                    data[rows["Community"]] = [row]

with open('other_data.json', 'w') as f:
    json.dump(data, f)