$(document).ready(function() {

	for (i=0; i < $('.section .button').length; i++) {
		var section = $('.section')[i];

		$(section).click(function() {
            if ( $(this).children('.button').text() == '-' ) {
            	$(this).children('.content').hide();
            	$(this).children('.button').text('+');
            } else if ( $(this).children('.button').text() == '+' ) {
            	$(this).children('.content').show();
            	$(this).children('.button').text('-');
            }
        });
	}
});