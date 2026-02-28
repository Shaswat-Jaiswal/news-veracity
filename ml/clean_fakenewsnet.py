import pandas as pd

df = pd.read_csv("data/FakeNewsNet.csv")

# Check columns
print(df.columns)

# Required columns only
df = df[['title', 'real']]

# Rename for ML standard
df.columns = ['text', 'label']

# Save clean file
df.to_csv("data/fakenewsnet_clean.csv", index=False)

print("Dataset cleaned successfully ✅")
print(df.head())
