
var expanded = false;

function expandButton(){
    if(expanded){
        $('#form-wrapper').show();
        $('#result-wrapper').removeClass('col-md-12');
        $('#result-wrapper').addClass('col-md-9');

        expanded = false;
    } else {
        $('#form-wrapper').hide();
        $('#result-wrapper').addClass('col-md-12');
        $('#result-wrapper').removeClass('col-md-9');

        expanded = true;
    }
}
