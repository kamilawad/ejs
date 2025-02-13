$(function() {
    // DataGrid
    $("#dataGrid").dxDataGrid({
        dataSource: [
            { id: 1, name: "John Doe", age: 29, city: "New York", salary: 85000 },
            { id: 2, name: "Jane Smith", age: 34, city: "Los Angeles", salary: 92000 },
            { id: 3, name: "Sam Johnson", age: 41, city: "Chicago", salary: 78000 },
            { id: 4, name: "Emma Davis", age: 28, city: "Houston", salary: 88000 }
        ],
        columns: [
            "id",
            "name",
            "age",
            "city",
            {
                dataField: "salary",
                format: "currency",
                headerFilter: { allowSearch: true }
            }
        ],
        showBorders: true,
        filterRow: { visible: true },
        searchPanel: { visible: true },
        groupPanel: { visible: true },
        columnChooser: { enabled: true },
        export: { enabled: true },
        paging: { pageSize: 10 },
        pager: {
            showPageSizeSelector: true,
            allowedPageSizes: [5, 10, 20]
        }
    });

    // Bar Chart
    $("#chartBar").dxChart({
        dataSource: [
            { month: "Jan", sales: 3000 },
            { month: "Feb", sales: 3500 },
            { month: "Mar", sales: 3200 },
            { month: "Apr", sales: 4000 }
        ],
        series: {
            argumentField: "month",
            valueField: "sales",
            name: "Sales",
            type: "bar",
            color: "#3498db"
        },
        legend: {
            visible: true
        },
        title: "Monthly Sales",
        export: {
            enabled: true
        }
    });

    // Pie Chart
    $("#chartPie").dxPieChart({
        dataSource: [
            { region: "North", sales: 3000 },
            { region: "South", sales: 3500 },
            { region: "East", sales: 3200 },
            { region: "West", sales: 4000 }
        ],
        series: [{
            argumentField: "region",
            valueField: "sales",
            label: {
                visible: true,
                connector: {
                    visible: true
                }
            }
        }],
        title: "Regional Sales Distribution",
        palette: "Soft Pastel"
    });

    // Form
    $("#form").dxForm({
        formData: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            notes: ""
        },
        items: [{
            itemType: "group",
            caption: "Personal Information",
            items: [{
                dataField: "firstName",
                validationRules: [{ type: "required" }]
            }, {
                dataField: "lastName",
                validationRules: [{ type: "required" }]
            }, {
                dataField: "email",
                validationRules: [{ type: "required" }, { type: "email" }]
            }, {
                dataField: "phone",
                editorOptions: {
                    mask: "+1 (X00) 000-0000",
                    maskRules: { X: /[02-9]/ }
                }
            }, {
                dataField: "notes",
                editorType: "dxTextArea",
                editorOptions: {
                    height: 90
                }
            }]
        }, {
            itemType: "button",
            horizontalAlignment: "left",
            buttonOptions: {
                text: "Submit",
                type: "success",
                useSubmitBehavior: false,
                onClick: function(e) {
                    const form = $("#form").dxForm("instance");
                    const formData = form.option("formData");
                    const loadPanel = $("#loadPanel").dxLoadPanel("instance");
                    
                    // Validate form
                    const result = form.validate();
                    
                    if (result.isValid) {
                        // Show loading indicator
                        loadPanel.show();
                        
                        // Make API call
                        fetch('/api/submit-form', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(formData)
                        })
                        .then(response => response.json())
                        .then(data => {
                            // Hide loading indicator
                            loadPanel.hide();
                            
                            if (data.success) {
                                // Show success message
                                DevExpress.ui.notify({
                                    message: "Form submitted successfully",
                                    position: {
                                        my: "center top",
                                        at: "center top"
                                    },
                                    type: "success",
                                    displayTime: 3000
                                });
                                
                                // Reset form
                                form.resetValues();
                            } else {
                                throw new Error(data.message || 'Submission failed');
                            }
                        })
                        .catch(error => {
                            // Hide loading indicator
                            loadPanel.hide();
                            
                            // Show error message
                            DevExpress.ui.notify({
                                message: error.message || "An error occurred during submission",
                                position: {
                                    my: "center top",
                                    at: "center top"
                                },
                                type: "error",
                                displayTime: 3000
                            });
                        });
                    }
                }
            }
        }]
    });

    // Scheduler
    $("#scheduler").dxScheduler({
        dataSource: [{
            text: "Team Meeting",
            startDate: new Date("2024-02-04T09:00:00.000"),
            endDate: new Date("2024-02-04T10:30:00.000")
        }, {
            text: "Project Review",
            startDate: new Date("2024-02-04T14:00:00.000"),
            endDate: new Date("2024-02-04T15:30:00.000")
        }],
        views: ["day", "week", "month"],
        currentView: "day",
        currentDate: new Date("2024-02-04"),
        startDayHour: 9,
        height: 600
    });

    // Gauge
    $("#gauge").dxCircularGauge({
        scale: {
            startValue: 0,
            endValue: 100,
            tickInterval: 10
        },
        rangeContainer: {
            ranges: [
                { startValue: 0, endValue: 30, color: "#ff5722" },
                { startValue: 30, endValue: 70, color: "#ffc107" },
                { startValue: 70, endValue: 100, color: "#4caf50" }
            ]
        },
        value: 75,
        title: {
            text: "Performance Meter",
            font: { size: 16 }
        }
    });

    // PivotGrid
    $("#pivotGrid").dxPivotGrid({
        allowSortingBySummary: true,
        allowSorting: true,
        allowFiltering: true,
        showBorders: true,
        dataSource: {
            fields: [{
                caption: "Region",
                width: 120,
                dataField: "region",
                area: "row"
            }, {
                caption: "City",
                dataField: "city",
                width: 150,
                area: "row"
            }, {
                dataField: "sales",
                dataType: "number",
                summaryType: "sum",
                format: "currency",
                area: "data"
            }],
            store: [{
                region: "North",
                city: "New York",
                sales: 12000
            }, {
                region: "North",
                city: "Boston",
                sales: 9000
            }, {
                region: "South",
                city: "Miami",
                sales: 11000
            }]
        }
    });

    $("#loadPanel").dxLoadPanel({
        shadingColor: "rgba(0,0,0,0.4)",
        position: { of: "#form" },
        visible: false,
        showIndicator: true,
        showPane: true,
        shading: true,
        closeOnOutsideClick: false,
        message: "Processing..."
    });
});