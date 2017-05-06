
var expanded = false;

function expandButton(){
    if(expanded){
        $('#form-wrapper').show();
        $('#graph-wrapper').removeClass('col-md-12');
        $('#graph-wrapper').addClass('col-md-9');

        expanded = false;
    } else {
        $('#form-wrapper').hide();
        $('#graph-wrapper').addClass('col-md-12');
        $('#graph-wrapper').removeClass('col-md-9');

        expanded = true;
    }
}
