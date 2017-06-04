
$(function(){
    $('#analyze').click(function(e){
        addLoader();

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
        var checkout_target = $('#checkout_target').val();
        var synonyms = $('#synonyms').val();
        var update_repository = $('input[name=update-repository]').is(':checked');

        options.repository = repository;
        options.yaml_root = yaml_root;
        options.synonyms = synonyms;
        options.update_repository = update_repository;
        options.checkout_target = checkout_target;

        $.getJSON(SCRIPT_ROOT + '/api/analysis', 
            options,
            function(data){
                var data = data.result;
                $('#results').empty();

                // Sort results such that failed ones come first
                data.sort(function byOk(r1, r2){
                    r1 = r1.ok;
                    r2 = r2.ok;

                    if(r1 && !r2){
                        return 1;
                    }

                    if(r2 && !r1){
                        return -1;
                    }

                    return 0;
                });

                data.forEach(function(result){
                    result.body = result.body.replace(/\n+/g, '<br>');

                    var panelStyle = result.ok ? 'panel-success' : 'panel-danger';

                    var errorNums = '. ' + result.errors_num + (result.errors_num == 1 ? 'error' : ' errors');
                    var headerErrors = result.ok ? '' : errorNums;

                    var panel = $('<div class="panel ' + panelStyle + '"></div>');
                    var panelHeading = $('<div class="panel-heading">' + result.header + headerErrors + '</div>');
                    var panelBody = $('<div class="panel-body">' + result.body + '</div>');

                    panelHeading.click(onPanelHeadingClick);

                    panelBody.hide();

                    panel.append(panelHeading);
                    panel.append(panelBody);

                    $('#results').append(panel);
                });
            }
        );
    });

    function onPanelHeadingClick(){
        var parent = $(this).parent();

        parent.find(".panel-body").toggle();
    }

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
            class: 'form-group depends_on',
        });

        wrapper.append('<label for="depends_on"> <a href="https://github.com/OSLL/jabba/wiki/Analysis#what-depends-on-this-config"> Depends on </a> </label>');
        wrapper.append('<input class="form-control" type="text" id="depends_on" placeholder="Configs" name="analysis-input">');

        return wrapper;
    },

    'unused_configs': function(){
        var wrapper = $('<div>', {
            class: 'form-group unused_configs',
        });

        wrapper.append('<label> <a href="https://github.com/OSLL/jabba/wiki/Analysis#unused-configs"> Unused configs </a> </label><br>');
        wrapper.append('<span>No additional options</span>');

        return wrapper;
    },

    'parameters_present': function(){
        var wrapper = $('<div>', {
            class: 'form-group parameters_present',
        });

        wrapper.append('<label> <a href="https://github.com/OSLL/jabba/wiki/Analysis#missing-call-parameters"> Missing call parameters </a> </label>');
        wrapper.append('<input class="form-control" type="text" id="parameters_present" placeholder="Parameters" name="analysis-input">');

        return wrapper;
    },

    'cyclic_deps': function(){
        var wrapper = $('<div>', {
            class: 'form-group cyclic_deps'
        });

        wrapper.append('<label> <a href="https://github.com/OSLL/jabba/wiki/Analysis#cyclic-dependencies"> Cyclic dependencies </a> </label><br>');
        wrapper.append("<span>No additional options</span>");

        return wrapper;
    }
};

function removeAnalysisOptions(name){
    $('.' + name).remove();
}
