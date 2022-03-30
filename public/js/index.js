const socket = io();

renderCharts()

// when get sensor data
socket.on('sensor_data', (data) => {
  
  const chartsData = data.slice(-20) // to show the last 20 elements in the charts
  updateCharts(chartsData)

  renderDataTable(data.reverse())

  console.log(data)
  
});