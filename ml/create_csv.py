import pandas as pd

data = {
    "text": [
        "India launches new satellite",
        "Aliens attacked Mumbai",
        "Government announces new policy"
    ],
    "label": [1, 0, 1]
}

df = pd.DataFrame(data)

df.to_csv("news.csv", index=False)

print("CSV file created ✅")
