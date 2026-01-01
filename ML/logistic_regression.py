import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
import pickle
import os


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CSV_PATH = os.path.join(BASE_DIR, "styles.csv")

df = pd.read_csv(
    CSV_PATH,
    on_bad_lines="skip",
    encoding="utf-8"
).fillna("")

df["text"] = (
    df["gender"] + " " +
    df["masterCategory"] + " " +
    df["subCategory"] + " " +
    df["baseColour"] + " " +
    df["season"] + " " +
    df["productDisplayName"]
)

# Target label
y = df["articleType"]

# TF-IDF Vectorization
vectorizer = TfidfVectorizer(
    max_features=5000,
    stop_words="english"
)
X = vectorizer.fit_transform(df["text"])

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Logistic Regression model
model = LogisticRegression(max_iter=1000)
model.fit(X_train, y_train)

# Evaluation
preds = model.predict(X_test)
print("Accuracy:", accuracy_score(y_test, preds))

# Save trained model
pickle.dump(model, open("style_model.pkl", "wb"))
pickle.dump(vectorizer, open("vectorizer.pkl", "wb"))
