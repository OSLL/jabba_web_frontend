
$(function(){
    $('#analyze').click(function(e){
        var inputs = $('input[name=analysis-checkbox]');

        var options = {};

        inputs.each(function(index, input){
            var input = $(input);
            if(input.is(':checked')){
                var optionValue = $('#' + input.val()).val();

                if(optionValue === undefined){
                    optionValue = true;
                }

                options[input.val()] = optionValue;
            }
        });

        var repository = $('#repository').val();
        var yaml_root = $('#yaml_root').val();
        var synonyms = $('#synonyms').val();
        var update_repository = $('input[name=update-repository]').is(':checked');

        options.repository = repository;
        options.yaml_root = yaml_root;
        options.synonyms = synonyms;
        options.update_repository = update_repository;

        $.getJSON(SCRIPT_ROOT + '/api/analysis', 
            options,
            function(data){
                var data = data.result;
                $('#results').empty();

                data.forEach(function(result){
                    result.body = result.body.replace(/\n+/g, '<br>');

                    var panel = $('<div class="panel panel-default"></div>');
                    var panelHeading = $('<div class="panel-heading">' + result.header + '</div>');
                    var panelBody = $('<div class="panel-body">' + result.body + '</div>');

                    panel.append(panelHeading);
                    panel.append(panelBody);

                    $('#results').append(panel);
                });
            }
        );
    });

    // Don't submit the form
    $('#form').submit(function(e){
        e.preventDefault(e);
    });
});


function toggleAnalysisFunction(input){
    input = $(input);
    
    if(input.is(':checked')){
        createAnalysisOptions(input.val());
    } else {
        removeAnalysisOptions(input.val());
    }
}

function createAnalysisOptions(name){
    if(analysisOptions[name] === undefined){
        throw Exception("Cannot find analysis with name" + name);
    }

    var result = analysisOptions[name]();

    $('#analysis-options').append(result);
}

analysisOptions = {
    'depends_on': function(){
        var wrapper = $('<div>', {
            class: 'form-group',
            id: 'dependsOn'
        });

        wrapper.append('<label for="depends_on"> Depends on </label>');
        wrapper.append('<input class="form-control" type="text" id="depends_on" placeholder="Configs" name="analysis-input">');

        return wrapper;
    },

    'unused_configs': function(){
        var wrapper = $('<div>', {
            class: 'form-group',
            id: 'unusedConfigs'
        });

        wrapper.append("<label> Unused configs </label><br>");
        wrapper.append("<span>No additional options</span>");

        return wrapper;
    }
};

function removeAnalysisOptions(name){
    $('#' + name).remove();
}
