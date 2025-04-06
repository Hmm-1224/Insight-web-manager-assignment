document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    const menu = document.querySelector('#mobile-menu');
    const menuLinks = document.querySelector('.navbar__menu');

    menu.addEventListener('click', function () {
        menu.classList.toggle('is-active');
        menuLinks.classList.toggle('active');
    });

    // Chart options
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: { beginAtZero: true }
        }
    };

    // Chart data
    const chartData = {
        labels: ['1', '2', '3', '4', '5'],
        datasets: [
            { label: '7 < CPI < 8', backgroundColor: '#072B44', data: [6, 24, 29, 10, 3] },
            { label: '8 < CPI < 9', backgroundColor: '#205378', data: [4, 6, 29, 50, 19] },
            { label: 'CPI < 7', backgroundColor: '#6C92AE', data: [13, 14, 9, 3, 1] },
            { label: 'CPI > 9', backgroundColor: '#E0E3E6', data: [0, 1, 5, 22, 41] },
            { label: 'CPI not chosen', backgroundColor: '#1E4460', data: [0, 1, 1, 0, 0] }
        ]
    };

    // Store original data for reset functionality
    const originalChartData = JSON.parse(JSON.stringify(chartData));

    // Initialize chart
    const chartContainer = document.getElementById('chartContainer3');
    let chart;
    if (chartContainer) {
        const ctx = chartContainer.getContext('2d');
        chart = new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: chartOptions
        });
    } else {
        console.error('Chart container not found: chartContainer3');
    }

    // Add event listeners to legend buttons
    document.querySelectorAll('.legend').forEach((button, index) => {
        button.addEventListener('click', () => {
            if (chart) {
                chart.data.datasets.forEach((dataset, i) => {
                    dataset.hidden = i !== index;
                });
                chart.update();

                // Toggle active class for selected button
                document.querySelectorAll('.legend').forEach((btn, idx) => {
                    btn.classList.toggle('active', idx === index);
                });
            }
        });
    });

    // Reset button functionality
    document.querySelector('.reset-button').addEventListener('click', () => {
        if (chart) {
            chart.data.datasets.forEach((dataset, datasetIndex) => {
                dataset.data = [...originalChartData.datasets[datasetIndex].data];
                dataset.hidden = false;
            });
            chart.update();

            // Remove active class from legend buttons
            document.querySelectorAll('.legend').forEach((btn) => {
                btn.classList.remove('active');
            });
        }
    });
});
