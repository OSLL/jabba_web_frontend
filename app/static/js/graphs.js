
$(function(){
    $('#plot').click(function(e){
        var repository = $('#repository').val();
        var yaml_root = $('#yaml_root').val();
        var graph = $('#graph').val();
        var files = $('#files').val();

        $.getJSON(SCRIPT_ROOT + '/api/graphs', {
            repository: repository,
            yaml_root: yaml_root,
            graph: graph,
            files: files
        }, function(data){
            $('#graph_display').empty();
            $('#graph_display').append(data.graph);

            var svg = $('#graph_display').children()[0];

            console.log(svg);

            svg.setAttribute('width', '100%');
            svg.setAttribute('height', '80%');

        });
    });

    // Don't submit the form
    $('#form').submit(function(e){
        e.preventDefault(e);
    });
});
