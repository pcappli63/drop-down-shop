// app.js
$(function (){
	
	//초기에 json 업로드
	jsonupload();
	
	//사용할 변수명
		//arr  = 선택한 제품 정보 저장
		//id = 선택한 제품 id
		//name = 선택한 제품 name
		//price = 선택한 제품 price
		//detail = 선택한 제품 정보
		//ok = 있는지 없는지 확인
		//no = 있을 경우 index번호
		//count = 개수
		//newprice = 개수 * 가격
		//con2 = 삽입할 정보
		//realtotal =  상품 가격에 쉼표 더한것
		//addrealtotal = 총 가격에 쉼표 제거
	arr = new Array();
	$("#cartbox").droppable({
		drop:function (event, ui){
			var id = ui.draggable.data("id")
			var name = ui.draggable.context.children[0].innerHTML;
			var price = ui.draggable.context.children[1].innerHTML;
			var detail = ui.draggable.context.children[2].innerHTML;
			var ok = true;
			var no;
			var count = 1;
			for(var k=0; k<arr.length; k++){
				if(arr[k][0] == name){
					ok = false;
					no = k;
				}
			}
			if(ok==true){
				arr.push([name, price, detail,count, id,price]);	
			}else{
				count = arr[no][3];
				count ++;
				arr[no][3] = count;
				newprice = arr[no][1].replace(",","");
				var total = newprice * arr[no][3];
				arr[no][5] = total;
			};
			var con2  = "";
			for(var g=0; g<arr.length; g++){
				con2 += '<tr>';
				con2 += '<th>'+arr[g][4]+'</th>';
				con2 += '<th>'+arr[g][0]+'</th>';
				con2 += '	<th>'+arr[g][2]+'</th>';
				con2 += '<th>'+arr[g][1]+'</th>';
				con2 += '<th>'+arr[g][3]+'</th>';
				realtotal  = comma(arr[g][5]);
				con2 += '<th>'+realtotal+'</th>';
				con2 += '<th><button class="delete" value="'+arr[g][4]+'">삭제</button></th>';
				con2 += '</tr>';
			}
			$(".table-bordered tbody").html(con2);
			
			$(".delete").on('click', function (){
				$(this).val();
				for(var t=0; t<arr.length; t++){
					if(arr[t][4] == $(this).val()){
						arr.splice(t,1);
						console.log(arr);
						var con2  = "";
						for(var g=0; g<arr.length; g++){
							con2 += '<tr>';
							con2 += '<th>'+arr[g][4]+'</th>';
							con2 += '<th>'+arr[g][0]+'</th>';
							con2 += '	<th>'+arr[g][2]+'</th>';
							con2 += '<th>'+arr[g][1]+'</th>';
							con2 += '<th>'+arr[g][3]+'</th>';
							realtotal  = comma(arr[g][5]);
							con2 += '<th>'+realtotal+'</th>';
							con2 += '<th><button class="delete" value="'+arr[g][4]+'">삭제</button></th>';
							con2 += '</tr>';
						}
						$(".table-bordered tbody").html(con2);
						var realtotal = 0;
						for(var g=0; g<arr.length; g++){
							var addrealtotal = uncomma(arr[g][5]);
							addrealtotal = Number(addrealtotal);
							realtotal += addrealtotal;
						}
						realtotal  = comma(realtotal);
						$("#total").html(realtotal+"원")
					}
				}
			});
			var realtotal = 0;
			for(var g=0; g<arr.length; g++){
				var addrealtotal = uncomma(arr[g][5]);
				addrealtotal = Number(addrealtotal);
				realtotal += addrealtotal;
			}
			realtotal  = comma(realtotal);
			$("#total").html(realtotal+"원")
		}
	});	
});

function deletee(val){
	console.log(arr[0][4]);
	console.log(val);
	for(var t=0; t<arr.length; t++){
		if(arr[t][4] == $(this).val()){
			arr.split(t,1);
			console.log(arr);
		}
	}
}

function uncomma(str) {
    str = String(str);
    return str.replace(/[^\d]+/g, '');
}

function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

function jsonupload(){	
	var con = "";
	$.getJSON("data/products.json", function (data){
		for(i=0; i<data.length; i++){
			con += '<div class="product" data-id="'+data[i]['id']+'">';
			con += '<p class="product-name">'+data[i]['product']+'</p>';
			con += '<p class="product-price">'+data[i]['price']+'</p>';
			con += '<p class="product-detail">'+data[i]['detail']+'</p>';
			con += '<p class="product-btns">';
			con += '	<button class="btn btn-warning btn-sm"><span class="glyphicon glyphicon-trash"></button>';
			con += '</p>';
			con += '</div>';
		}
		$("#productsbox").html(con);
		$(".product").draggable({
			cursor: "move",
			revert: true,
			start: function (event, ui){
				$(".card-name").css({"z-index":1});
				$(this).css({	"z-index":999});
			}
		});
		
		$(".btn-sm").on('click', function (){
			$(this).parent().parent().remove();
		});
	});	
}