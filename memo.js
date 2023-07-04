	const note = Cookies.get('note');
	const textarea = document.getElementById( "note" );
	console.log(note);
	



let canvas = document.querySelector('#canvas');
let context = canvas.getContext('2d');

const dpr = window.devicePixelRatio || 1;
function onWindowResize() {
	const canvas = document.querySelector('#canvas');
	const ctx = canvas.getContext('2d');	
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    ctx.scale(dpr,dpr);

    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
}
onWindowResize();



if(note) {
	textarea.value = note;
	drawText(note);
}

//キャンバスに文字を描く
function drawText(note){
	const canvas = document.querySelector('#canvas');
	const ctx = canvas.getContext('2d');
	const row_string_cnt = 18; //一行あたりの文字数
	
ctx.clearRect(0, 0, canvas.width, canvas.height);
//background color
context.beginPath();
context.fillStyle = 'rgb( 0, 0, 0)';
context.fillRect(0, 0, canvas.width, canvas.height);


	//横幅と1行あたりの文字数から、文字サイズを算出
	const font_size = Math.round( (canvas.width) / (row_string_cnt + 2));
	
	ctx.textBaseline = 'hanging';
	//文字のスタイルを指定
	ctx.font = font_size + 'px meiryo';
	ctx.fillStyle = '#ffffff';
	//文字の配置を指定（左上基準にしたければtop/leftだが、文字の中心座標を指定するのでcenter
	ctx.textBaseline = 'top';
	ctx.textAlign = 'left';
	/*
	//座標を指定して文字を描く（座標は画像の中心に）
	var x = 50;
	var y = 50;
	ctx.fillText(note, x, y);
	*/
	
	//入力文字を1文字毎に配列化
	var aryText = note.split('');
	
	//出力用の配列を用意
	var aryRow = [];
	aryRow[0] = '';
	var row_cnt = 0;
	
	//入力1文字毎にループ　改行コードもしくは折り返しで配列の添え字を足す
	for(var i = 0; i < aryText.length; i++){
		var text = aryText[i];
		if(aryRow[row_cnt].length >= 19){
			row_cnt++;
			aryRow[row_cnt] = '';
		}
		if(text == "\n"){
			row_cnt++;
			aryRow[row_cnt] = '';
			text = '';
		}
		aryRow[row_cnt] += text;
	}
	
	//文字の表示　y軸とx軸をループする
	for(var i = 0; i < aryRow.length; i++){
		aryStr = aryRow[i].split('');
		for(var j = 0; j < aryStr.length; j++){
			ctx.fillText(aryStr[j], (j * font_size) + font_size/2, (i * font_size * 1.7) + font_size/2 + 10);
		}
	}	
	
}


function saveOptions(e) {
	const textarea = document.getElementById( "note" );
	console.log(textarea.value);
	Cookies.set('note', textarea.value, { expires: 365 });
	
	drawText(textarea.value);
	
const a = document.createElement("a");
a.href = canvas.toDataURL("image/jpeg", 0.75); // PNGなら"image/png"
a.download = "memo.jpg";
document.body.append(a);
a.click();
	
	
	e.preventDefault();
}	
	document.querySelector("#save").addEventListener("click", saveOptions);
