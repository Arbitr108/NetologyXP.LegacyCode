//Dependency break: Extract Interface
var FakeReportPlugin = {
    ///......////
};

function createReportPlugin(isTestMode) {
    if (isTestMode)
        return FakeReportPlugin;
    return ReportPlugin;
}
function _updateReportParametersFunctions(type, parameters, isTestMode) {
    if (isTestMode)
    //invoke our function
        console.log("invoking our test function");
    else
        updateReportParametersFunctions[type](parameters);
}

function formSetEditReport(idReport, isTestMode) {
    isTestMode = isTestMode || false;
    var ReportPlugin = createReportPlugin(isTestMode);
    var report = {
        'type': ReportPlugin.defaultReportType,
        'format': ReportPlugin.defaultReportFormat,
        'description': '',
        'period': ReportPlugin.defaultPeriod,
        'hour': ReportPlugin.defaultHour,
        'reports': []
    };


    if (idReport > 0) {
        report = ReportPlugin.reportList[idReport];
        $('#report_submit').val(ReportPlugin.updateReportString);
    }
    else {
        $('#report_submit').val(ReportPlugin.createReportString);
    }

    toggleReportType(report.type);

    $('#report_description').html(report.description);
    $('#report_segment').find('option[value=' + report.idsegment + ']').prop('selected', 'selected');
    $('#report_type').find('option[value=' + report.type + ']').prop('selected', 'selected');
    $('#report_period').find('option[value=' + report.period + ']').prop('selected', 'selected');
    $('#report_hour').val(report.hour);
    $('[name=report_format].' + report.type + ' option[value=' + report.format + ']').prop('selected', 'selected');

    $('[name=reportsList] input').prop('checked', false);

    var key;
    for (key in report.reports) {
        $('.' + report.type + ' [report-unique-id=' + report.reports[key] + ']').prop('checked', 'checked');
    }
    _updateReportParametersFunctions(report.type, report.parameters, isTestMode);

    $('#report_idreport').val(idReport);
}