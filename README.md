# Project_3_startup_success

Overview

  This project aims to analyze startup success and funding patterns in the U.S., uncovering key factors that influence outcomes such as acquisition, funding levels, and geographic clustering. By integrating startup data with detailed ZIP code-level demographics and infrastructure data, we will explore how local economic and geographic conditions shape startup success. Through interactive visualizations, we will enable users to dive into the data and gain actionable insights, catering to entrepreneurs, investors, and policymakers. 



Ethical Considerations Made in the Project:

  When working with start up data it is essential to consider ethical implications in order to avoid potential harm. For example, avoiding the use of any sensitive information like exact locations, proprietary funding details, and personal identifiers is extremely important in order maintain data privacy and confidentiality. In order to achieve this, our group made sure to adhere to laws such as General Data Protection Regulations and the California Consumer Privacy Act by not scraping any unlawful data and simply sourcing all data used in the project from Kaggle. These links are provided next in the Data Sources Section.


Presentation

  https://docs.google.com/presentation/d/1w5Pea8wnUsD41hJ5EKiUXX8V4zElH30KxKLgAu0FRx0/edit?usp=sharing

Code Location

  Individual Notebooks used for presentation visualizations are located in individual branches. Main HTML/JS and CSS with Kelly and Philip's interactive visulaizations are located in Kelly's branch.


  Data Sources

  1) https://www.kaggle.com/datasets/manishkc06/startup-success-prediction
  2) https://www.kaggle.com/datasets/erdi28/zip-codes-demographics

Data Storage

  Data Housed in MondoDB 


Other Sources

  1) StartUp Information ------ https://startupgenome.com/
  2) Loading CSV data using D3 ----- https://www.tutorialsteacher.com/d3js/loading-data-from-file-in-d3js
  3) Leaflet Documentation ----- https://leafletjs.com/reference.html
  4) Lecture Materials ------ Class 1 to Present 
  5) Xpert Learning Assistant ----- Formating Legends Within Interactive JS, use of Array.from
        ----- issues selecting categories in interactive display "const selectedCategories = Array.from(document.querySelectorAll("#category-filters input:checked")).map(input => input.value);"
        ----- insure selected categories match the coordinates "selectedCategories.some"
        ----- missing values fix "if (!stateFunding[stateCode])" & " if (!isNaN(funding)) "
        ----- applying function to all layers of project "onEachFeature: function (feature, layer) ... "
        ----- parsing data from database
        ----- help with implementing heatmap code in zipcode_analysis2.js
        ----- help with visual customization in startup_charts.js
  7) Seaborn Heatmap for Correlations ----- https://seaborn.pydata.org/generated/seaborn.heatmap.html
  8) Stack Overflow and Chat GPT for Plot Aesthetics (grey scale & black backgrounds)  ----- https://stackoverflow.com/questions/62607663/black-white-gray-bar-charts-in-python
  9) Data cleaning utilized from machine learning project -----https://github.com/sumitjhaleriya/Startup-Success-Prediction-using-Machine-Learning/blob/main/startup-success-prediction-precision-recall-94.ipynb
  10) Presentation slides template ----- https://slidechef.net/templates/free-google-slides-apple-template/
  11) Startup statistics ----- https://www.upsilonit.com/blog/startup-success-and-failure-rate, https://www.embroker.com/blog/startup-statistics/
  12) Icon PNG in Income Distribution map: https://png.pngtree.com/png-vector/20220517/ourmid/pngtree-blank-round-sticker-template-png-image_4684569.png
