import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, roc_auc_score
import pickle

# Load dataset
data = pd.read_csv('creditcard.csv')

# Print class balance
print("Class distribution:\n", data['Class'].value_counts())

# Separate features and label
X = data.drop('Class', axis=1)
y = data['Class']

# Stratified split for class balance
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# Train Random Forest with class weighting
model = RandomForestClassifier(random_state=42, class_weight='balanced')
model.fit(X_train, y_train)

# Evaluate model
y_pred = model.predict(X_test)
print("\nClassification Report:\n", classification_report(y_test, y_pred))
print("ROC AUC Score:", roc_auc_score(y_test, model.predict_proba(X_test)[:, 1]))

# Save the model
with open('model.pkl', 'wb') as file:
    pickle.dump(model, file)
