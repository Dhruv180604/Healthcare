import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import joblib

# Load your dataset
data = pd.read_csv("mentalhealthintech.csv")

# Preview it
print(data.head())
print(data.columns)

# Drop rows with missing values for simplicity (can be handled better later)
data = data.dropna()

# Define input features and target variable
features = ["Age", "Gender", "family_history", "benefits", "care_options"]
target = "treatment"

# Encode categorical features
data_encoded = pd.get_dummies(data[features])
y = data[target].apply(lambda x: 1 if x == "Yes" else 0)  # Binary classification

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(data_encoded, y, test_size=0.2, random_state=42)

# Train model
clf = RandomForestClassifier()
clf.fit(X_train, y_train)

# Save model and columns
joblib.dump(clf, "mental_health_model.pkl")
joblib.dump(data_encoded.columns.tolist(), "model_features.pkl")

print("✅ Model and features saved successfully.")
