# Populations of the World
## **Projection**: 
- How are populations around the world projected to increase?
- Has there been a significant deviation between proportions of males and females in a particular country in the past and how is it forecast to change into the future.

## **Summary**:
### **Creation**
  Python was used to clean the data and PostgreSQL was used to store the data. A connection was made to PostgreSQL and the data was turned into an API on the Flask web app so it could be easily accessed. Once this was done an interactive dashboard was created using HTML/CSS/JavaScript and using the Pytho package Flask, a web application was created.

## **Using the Dashboard**:
### **NOTE: Instructions on how start the dashboard are at the end (after the screenshots)**
 To use the dashboard enter the year you would like to filter in the from and click "Choose Country". Then once the map displays click on the country you would like to see information for. Then a table and graph will appear underneath the map.

## **Languages used**:
- Python
- HTML
- CSS
- JavaScript

## **Database used**:
- PostgreSQL

## **Python Packages Used**:
- Pandas
- GeoPandas
- SQLAlchemy
- Flask
- Matplotlib

## **Javascript Libraries Used**:
- D3
- Leaflet
- ScrollReveal
- Plotly
  
## **Conclusions**
- Ukraine, Latvia and Estonia started off as the countries with greatest difference between gender. However, middle east took over this place and may stay on top in future.

- China started as the Most populated country in 1951 but, however, in future, India may become the most populated country with 1.44 Bn people

## **Screenshots**
## **Before Year is entered**
![Web application before entering year](/Screenshots/BeforeYear.png)
## **After Year is entered**
![Web application after entering year](/Screenshots/AfterYear.png)
## **After Country is entered**
![Web application after entering country](/Screenshots/AfterCountry.png)
## **API on the Flask Web App**
![API on the Flask Web App](/Screenshots/API.png)

## **Running all the code**
**NOTE: Make sure there is no database named *populations* in PGAdmin** 
## **Running the dashboard**
1. Set your path to this folder. (If you are using Visual Studio Code just click File > Open Folder > Populations_In_Countries
2. Enter your password for PostgreSQL in the config file.
3. Then run the file *app.py*.

## **Running the jupyter notebooks**
1. Before running any of the jupyter notebooks please install needed packages running the following code in the terminal.
         
        pip install pandas
        pip install sqlalchemy
        pip install geopandas
        pip install Flask-sqlalchemy
        pip install matplotlib
Or run this code in the first Jupyter Notebook

        ! pip install --user pandas
        ! pip install --user sqlalchemy
        ! pip install --user geopandas
        ! pip install --user Flask-sqlalchemy
2. Run the file *DataCleaning.ipynb* 


3. Run the file *Conclusions.ipynb* 
