const baseOptions = {
    plugins: {
        legend: {
            display: false
        }
    },
    layout: {
        padding: 10
    },
    animation: true
}

const charts = [
    // Humidity chart
    {
        elementID: 'humidity_chart',
        dataProp: 'humidity',
        instance: null,
        type: 'line',
        baseDataSet: {
            label: 'Humedad',
            backgroundColor: '#2563eb',
            borderColor: '#2563eb',
            data: [],
            tension: 0.1
        },
        options: baseOptions
    },
    // Temperature_c chart
    {
        elementID: 'temperature_c_chart',
        dataProp: 'temperature_c',
        type: 'line',
        instance: null,
        baseDataSet: {
            label: 'Temperatura °C',
            backgroundColor: '#4f46e5',
            borderColor: '#4f46e5',
            data: [],
            tension: 0.1
        },
        options: baseOptions
    },
    // Temperature_F chart
    {
        elementID: 'temperature_f_chart',
        dataProp: 'temperature_f',
        type: 'line',
        instance: null,
        baseDataSet: {
            label: 'Temperatura °F',
            backgroundColor: '#059669',
            borderColor: '#059669',
            data: [],
            tension: 0.1,
        },
        options: baseOptions
    },
]
  
// render all charts
const renderCharts = () => {
    charts.forEach(chart => {
        const chartInit= new Chart(
            document.getElementById(chart.elementID), 
            { 
                type: chart.type, 
                data: { 
                    labels: [], 
                    datasets: [chart.baseDataSet]  
                },
                options: chart.options
            }
        );
        chart.instance = chartInit
    });
}
    
// update an individual chart
const updateChart = (chart, labels, data) => {
    chart.data.labels = labels;
    chart.data.datasets.forEach((dataset) => {
        dataset.data = data;
    });
    chart.update();
}
  
// update every chart
const updateCharts = (data) => {
    const dates = data.map(data => { return data.date });
    charts.forEach(chart => {
        const messure = data.map(data => { return data[chart.dataProp] });
        updateChart(chart.instance, dates, messure)
    })
}