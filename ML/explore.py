import pandas as pd

df = pd.read_csv(
    "styles.csv",
    on_bad_lines="skip",
    encoding="utf-8"
)

print("Rows:", len(df))
print("Columns:", df.columns.tolist())
print(df.head(2))
