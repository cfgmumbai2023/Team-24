from flask import Flask, jsonify, request
import pandas as pd
from sqlalchemy import create_engine
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins='*')

# Define the endpoint to receive the JSON data
@app.route('/api/data', methods=['POST'])
def receive_data():
  data = request.get_json()

  # Convert JSON to Pandas DataFrame
  df = pd.DataFrame(data)
  print(pd.head())

  # Store the DataFrame in a table using SQLAlchemy and a database (e.g., SQLite)
  # Connect to MySQL
  # engine = create_engine("mysql+pymysql://" + "root" + ":" + "12345" + "@" + "ec2-122-248-214-86.ap-southeast-1.compute.amazonaws.com" + "/" + "urmi_cfg")

  # df.to_sql('Student_Details', con = engine, if_exists = 'append',index = False, chunksize = 1000)

  # print("Uploaded csv file to Student_Details successfully.")

  return jsonify({'message': 'Data stored successfully.'})


if __name__ == '__main__':
  app.run()
