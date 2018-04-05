$(document).ready(function(){
	var iduser=null;

	function createTable(mas,container){
		$(container).empty();
		$("<table>").addClass("table").appendTo(container);
				$("<tr>").addClass("header_row").appendTo('.table');
			 	$("<td>").addClass("header").appendTo('.header_row').text('name');
			 	$("<td>").addClass("header").appendTo('.header_row').text('age');
			 	$("<td>").addClass("header").appendTo('.header_row').text('salary');

			 	for(var i=0;i<mas.length;i++){
			 	$("<tr>").addClass("tr").appendTo('.table');
			 		
			 	for(var key in mas[i]){
			 	$("<td>").appendTo(".tr:last")
			 	.text(mas[i][key]);
			 						}
			 		for(var j=1;j<=2;j++){
			 			$('<td>').appendTo('.td:last')
			 			var btn=$('<button>')
			 		
			 		if (j==1) {
			 			btn.text('Delete')
			 			.addClass('delete')
			 					}
			 			else{
			 				 btn.text('update')
			 				.addClass('update');
			 					}
			 	
			 		$(".table .tr td:last").append(btn);
			 		$('.tr').children().filter(':first-child').hide()
			 		$('.header').click(function(){
			 			var prop=$(this).text();
			 			sortprop(mas,prop);
			 			createTable(mas,"#mastable");
			 		})
			 	}

			 	}
		$('.delete').click(function(){
			console.log(this)
			var id=$(this).parent().parent()
			.children().filter(':first').text();
			console.log(id);
			var obj={id:id}
			$.post('/delete',obj,function(data){
				console.log(data);
				getUsers();

			})


		})
		$('.update').click(function(){
			console.log(this)
			var tds=$(this).parent().parent().children();
			console.log(tds);
			var name=$(tds[1]).text();
			console.log(name);
			$("#name").val(name);
			var age=$(tds[2]).text();
			console.log(age);
			$("#age").val(age);
			var salary=$(tds[3]).text();
			console.log(salary);
			$("#salary").val(salary);

			iduser=$(tds[0]).text();
			console.log(iduser);
			$('#btn').val('update user');


		})
		

			} 
	
	
	function getUsers(){
		$.get('/allusers',function(data){
			console.log(data);
			createTable(data,"#mastable")	
	})
}
	getUsers();

$('#btn').click(function(){
	var obj={
		name:$('#name').val(),
		age:$('#age').val(),
		salary:$('#salary').val()
	}
	if($(this).val()=='update user')
		obj.id=iduser
	$.post('/send',obj,function(data){
		console.log(data);
		getUsers();

})
	$(this).val("Send");
	})

 function sortprop(data,prop){
 	data.sort(function(a,b){
 		if (a[prop]>b[prop]) 
 			return 1;
 			return -1;

 	})

 }
 $('.header').click(function(){
 	var prop=$(this).text();
 	createTable(mas,'#mastable');
 })
})