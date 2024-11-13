// Function to fetch JSON data and render the CMS table
async function loadCMSData() {
    try {
        const response = await fetch('cmsData.json');  // Fetch the JSON file
        const data = await response.json();            // Parse JSON data

        const tableContainer = document.getElementById('cmsTable');
        
        // Create the table with headers
        let tableHTML = `
            <table border="1" cellspacing="0" cellpadding="5">
                <thead>
                    <tr>
                        <th>System</th>
                        <th>Produced/Sold by</th>
                        <th>Technology Base</th>
                        <th>Major Capabilities</th>
                        <th>Major Limitations</th>
                        <th>Example Site</th>
                    </tr>
                </thead>
                <tbody>
        `;

        // Loop through each CMS entry and add rows to the table
        data.forEach(cms => {
            tableHTML += `
                <tr>
                    <td>${cms.name}</td>
                    <td>${cms.support}</td>
                    <td>${cms.technology}</td>
                    <td>${cms.capabilities.join(", ")}</td>
                    <td>${cms.limitations.join(", ")}</td>
                    <td><a href="${cms.example}" target="_blank">${cms.example}</a></td>
                </tr>
            `;
        });

        tableHTML += `</tbody></table>`;  // Close the table structure
        tableContainer.innerHTML = tableHTML;  // Insert table into the container

    } catch (error) {
        console.error("Error loading CMS data:", error);
    }
}

// Load the data when the page loads
window.onload = loadCMSData;
