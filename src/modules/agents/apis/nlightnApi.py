import psycopg2
from psycopg2.extras import RealDictCursor
import json
from datetime import datetime
import requests
from tabulate import tabulate

environment = production
base_url = "https://nlightnlabs.net/nlightn/db/table/industries"

def serialize_datetime(obj):
    if isinstance(obj, datetime):
        return obj.isoformat()
    raise TypeError("Type not serializable")

def getData(table):
    username = "dbadmin"
    password = "Dbadmin03"
    database = "main"
    host = "nlightnlabsdev01-postgres.clwbltzci0fj.us-west-1.rds.amazonaws.com"
    port = "5432"

    try:
        connection = psycopg2.connect(f"dbname={database} user={username} password={password} host={host} port={port}")
        cur = connection.cursor(cursor_factory=RealDictCursor)
        query_sql = f"SELECT * FROM {table}" 
        cur.execute(query_sql)
        results = cur.fetchall()

        # Serialize datetime objects before JSON serialization
        serialized_results = json.dumps(results, default=serialize_datetime)
        return serialized_results

    except (Exception, psycopg2.Error) as error:
        print("Error while fetching data from PostgreSQL", error)
        exit()



def fetch_data(url):
    try:
        response = requests.get(url)
        # Check if the request was successful (status code 200)
        if response.status_code == 200:
            # Return the JSON data if the request was successful
            return response.json()
        else:
            # Print an error message if the request was not successful
            print(f"Error: Unable to fetch data. Status code: {response.status_code}")
            return None
    except requests.exceptions.RequestException as e:
        # Print an error message if there was an exception during the request
        print(f"Error: {e}")
        return None

# Example API endpoint to fetch data from
api_url = "https://nlightnlabs.net/nlightn/db/table/industries"

# Fetch data from the API endpoint
data = fetch_data(api_url)

# Print the fetched data
if data:
    print(data)

#Format output in table format
table = tabulate(data, headers="firstrow", tablefmt="html")
print(table)