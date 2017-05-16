
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

        $.getJSON(SCRIPT_ROOT + '/api/graphs', {
            repository: repository,
            yaml_root: yaml_root,
            graph: graph,
            files: files,
            rank_dir: rank_dir,
            legend: legend,
            call_display: call_display,
            call_parameters: call_parameters,
            update_repository
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
