import pandas as pd
import time
import os
import pymysql
from sqlalchemy import create_engine

# Function to upload CSV to MySQL table
def upload_csv_to_mysql(csv_file):
    try:
        # Connect to MySQL
        engine = create_engine("mysql+pymysql://" + "root" + ":" + "12345" + "@" + "ec2-122-248-214-86.ap-southeast-1.compute.amazonaws.com" + "/" + "urmi_cfg")
        

        # Read CSV into a DataFrame
        df = pd.read_csv(csv_file, encoding='utf-8')
        
        df.to_sql('Student_Details', con = engine, if_exists = 'append',index = False, chunksize = 1000)
        
        print("Uploaded csv file to Student_Details successfully.")
    except Exception as e:
        print("Error uploading CSV to MySQL:", e)

# Specify the CSV file path and MySQL table name
csv_file = 'data.csv'

# Store the last modified time of the CSV file
last_modified_time = 0

# Infinite loop to run the script every 2 minutes
while True:
    # Check if the CSV file has been modified
    current_modified_time = os.path.getmtime(csv_file)
    if current_modified_time > last_modified_time:
        upload_csv_to_mysql(csv_file)
        last_modified_time = current_modified_time
        print("CSV file has been updated. Uploading to MySQL.")
    else:
        print("CSV file has not been modified. Skipping upload.")
    
    time.sleep(2592000)  # Wait for 30 days before running again