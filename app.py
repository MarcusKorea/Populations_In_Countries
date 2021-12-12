##############################################
#Imports
###############################################
# import numpy as np
#import datetime as dt
import pandas as pd
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from config import password

from flask import Flask, jsonify,render_template




#################################################
# Database Setup
#################################################

engine = create_engine(f'postgresql://postgres:{password}@localhost:5432/sql-challange_db')
query="""select *  from population"""
queryresult=pd.read_sql_query(query,engine)

app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    return render_template("index.html", 
                          data = queryresult)
    # return (
    #     f"Available Routes:<br/>"
    #     f"Population: /api/v1.0/population<br/>"
    # )

# # Returns the jsonified  data  
@app.route('/api/v1.0/population')
def popdata():
    # query="""select "Location", "Time", "PopMale","PopFemale","PopTotal"  from population """
    query="""select *  from population"""
    queryresult=pd.read_sql_query(query,engine)
    print(queryresult.values[0])

    # return queryresult.to_json()
    return queryresult.to_json(orient='records')

 #4. Define main behavior
if __name__ == "__main__":
    app.run(debug=True)