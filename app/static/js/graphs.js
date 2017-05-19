
$(function(){
    $('#plot').click(function(e){

        addLoader();

        var repository = $('#repository').val();
        var yaml_root = $('#yaml_root').val();
        var graph = $('input[name=graph_type]:checked').val();
        var files = $('#files').val();

        var rank_dir = $("input[name=rank_dir]:checked").val();
        var legend = $("input[name=legend]").is(':checked');

        var update_repository = $('input[name=update-repository]').is(':checked');

        var call_display = $('input[name=call_display]:checked').val();
        var call_parameters = $('#call_parameters').val();

        var checkout_target = $('#checkout_target').val();

        $.getJSON(SCRIPT_ROOT + '/api/graphs', {
            repository: repository,
            yaml_root: yaml_root,
            graph: graph,
            files: files,
            rank_dir: rank_dir,
            legend: legend,
            call_display: call_display,
            call_parameters: call_parameters,
            update_repository: update_repository,
            checkout_target: checkout_target
        }, function(data){
            $('#results').empty();
            $('#results').append(data.graph);

            var svg = $('#results').children()[0];

            svg.setAttribute('width', '100%');
            svg.setAttribute('height', '80%');

        });
    });

    // Don't submit the form
    $('#form').submit(function(e){
        e.preventDefault(e);
    });
});

function graphTypeChange(el){
    if(el.value === 'call'){
        $('#call-graph-options').show();
    } else {
        $('#call-graph-options').hide();
    }
}

function fillInExample(){
    if(!confirm("This action will clear the form and fill in example data. Do you wish to proceed?")){
        return;
    }

    $('#repository').val('github.com/mariadb-corporation/maxscale-jenkins-jobs');
    $('#yaml_root').val('maxscale_jobs');
    $('#call_parameters').val("same-node");
    $('#files').val("maxscale_jobs/build_all.yaml");
    $("input[name=legend]").click();
}
