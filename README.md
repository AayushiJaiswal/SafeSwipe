# Credit Card Fraud Detection

## Overview

This project focuses on detecting fraudulent credit card transactions using machine learning techniques. Given the increasing volume of online transactions, identifying and preventing fraud is crucial to maintaining customer trust and financial security.

## Dataset

The dataset used for this project contains credit card transactions made by European cardholders in September 2013. It comprises 284,807 transactions, out of which 492 are fraudulent, making it highly imbalanced. The features have been transformed using Principal Component Analysis (PCA) to maintain confidentiality. ([Dataset source](https://www.kaggle.com/datasets/mlg-ulb/creditcardfraud))

## Features

- **Time**: Seconds elapsed between this transaction and the first transaction in the dataset.
- **V1** to **V28**: Principal components obtained from PCA.
- **Amount**: Transaction amount.
- **Class**: Target variable (0 for non-fraudulent, 1 for fraudulent).

## Libraries Used

The following libraries are used in this project:

- **Flask**: For creating a backend API server.
- **Flask-CORS**: For enabling cross-origin requests between the backend and frontend.
- **scikit-learn**: For machine learning model implementation.
- **pandas**: For data manipulation and analysis.
- **numpy**: For numerical computations.

## Project Structure

- `creditcard.csv`: Contains the dataset files.
- `model.pkl`: Saved machine learning models.
- `fraud_detection.py`: Python scripts for data processing and model training.
- `api.py`: Backend API server for model predictions.
- `index.html`: Frontend for live usage.
- `README.md`: Project overview and instructions.

## Installation

1. **Clone the repository**:
   
   ```bash
   git clone https://github.com/pkpotter03/Credit-card-fraud-detection.git
   cd Credit-card-fraud-detection
   
3. **Create a virtual environment**:
   
   ```bash
   python -m venv venv
   source venv/bin/activate
   # On Windows: venv\Scripts\activate
   
5. **Install the required packages**:
   
   ```bash
   pip install -r requirements.txt

### Usage

1. **Train the model:** Run the following command to train the machine learning model:
   
   ```bash
   python fraud_detection.py

3. **Run the server:** Start the API server for model predictions:
   
   ```bash
   python api.py
   
5. **Go live:** Open index.html in a web browser to interact with the application.

### Models Used
- **Random Forest**: An ensemble method that uses multiple decision trees to improve performance, implemented using scikit-learn.
- **Logistic Regression**: A simple yet effective linear model for binary classification tasks.
- **Support Vector Machine (SVM)**: A supervised learning algorithm for classification tasks.
- **Data Preprocessing**: pandas and numpy are used for cleaning, normalizing, and preparing the data for machine learning models.

### Results
The models were evaluated using metrics suitable for imbalanced datasets, such as precision, recall, F1-score, and the Area Under the Precision-Recall Curve (AUPRC). The Random Forest model achieved the best performance with an AUPRC of 0.90.

![SafeSwipe Output](assets/safeswipe-output.png)
