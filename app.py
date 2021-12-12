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

import storedata 

#################################################
# Database Setup
#################################################

# read in csv file
path = "Data/clean_populations.csv"
clean_pop = pd.read_csv(path)


engine = create_engine(f'postgresql://postgres:{password}@localhost:5432')

app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():

    # creat connection
    
    conn = engine.connect()
    conn.execute("commit")
    # try:
    conn.execution_options(isolation_level="AUTOCOMMIT").execute("create database populations")
    clean_pop.to_sql(name="population", con = engine,if_exists = "append", index = False )
    # except:
    #     conn.execute("drop database populations")
    #     conn.execution_options(isolation_level="AUTOCOMMIT").execute("drop database populations")
    
    #Read from postgresql
    query = "select *  from population "
    query_df=pd.read_sql_query(query,engine)

    return render_template("index.html", 
                          data = query_df)

# Returns the jsonified  data  
@app.route('/api/v1.0/population')
def popdata(): 
    #Read from postgresql
    query = "select *  from population "
    queryresult=pd.read_sql_query(query,engine)
    return queryresult.to_json(orient='records')

 #4. Define main behavior
if __name__ == "__main__":
    app.run(debug = True)