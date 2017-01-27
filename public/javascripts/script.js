var idFoto;
function loadImagem(_src, _title, _idFoto) {
    jQuery('#modalFotoLabel').html(_title);
    jQuery('#imagemFoto').attr('src', '');
    jQuery('#imagemFoto').attr('src', _src);
    idFoto = _idFoto;
    if(jQuery('#foto-'+_idFoto).hasClass('bg-success')){
        jQuery('#btDesmarcar').removeClass('hidden');
        jQuery('#btSelecionar').addClass('hidden');
    } else {
        jQuery('#btDesmarcar').addClass('hidden');
        jQuery('#btSelecionar').removeClass('hidden');
    }
}

function selecionaImagem(){
    jQuery('#foto-' + idFoto).addClass('bg-success');
    totalSelecionados();
}

function desmarcaImagem(){
    jQuery('#foto-' + idFoto).removeClass('bg-success');
    totalSelecionados();
}

function totalSelecionados(){
    var _total = jQuery('.grid-imagens .bg-success').length;
    jQuery('#txtSelecionados').html(_total + ' selecionadas')
}