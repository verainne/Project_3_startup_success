// Function to create the income chart
function createIncomeChart(cityNames, incomeData) {
    console.log(cityNames);

    let trace = {
        x: cityNames,
        y: incomeData,
        type: 'bar',
        marker: {
            color: 'black'
        }
    };
    
    let data = [trace];

    let layout = {
        title: {
            text: 'Adjusted Gross Income Chart',
            font: {
                family: "HelveticaNeue-Light, Helvetica Neue Light, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif",
                size: 20
            } 
        },
        xaxis: {
            title: {
                text: 'Cities',
                font: {
                    family: "HelveticaNeue-Light, Helvetica Neue Light, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif",
                    size: 16,
                    color: 'black'
                },
                standoff: 5
            },
            tickangle: -45
        },
        yaxis: {
            title: {
                text: 'Adjusted Gross Income',
                font: {
                    family: "HelveticaNeue-Light, Helvetica Neue Light, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif",
                    size: 16,
                    color: 'black'
                }
            }
        },
        font: {
            family: "HelveticaNeue-Light, Helvetica Neue Light, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif",
            size: 12,
            color: 'black'
        }
    };

    Plotly.newPlot('incomeChart', data, layout);
}