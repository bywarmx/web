$(document).ready(function(){
	$('#acortar').click(function(){
		var url = $('#url').val();
		if(url != ''){
			$.ajax({
				type: 'GET',
				url: 'http://tinyurl.com/api-create.php',
				data: {url: url},
				dataType: 'text',
				success: function(data){
					$('#resultado').text('La URL acortada es: ' + data);
				},
				error: function(){
					$('#resultado').text('Error al acortar la URL');
				}
			});
		}else{
			$('#resultado').text('Por favor ingresa una URL válida');
		}
	});
});
