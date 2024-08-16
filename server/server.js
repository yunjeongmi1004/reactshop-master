const express = require('express');
const path = require('path');
const app = express();

app.listen(8080, function () {
  console.log('listening on 8080')
}); 

app.use(express.json());
var cors = require('cors');
app.use(cors()); // 해당 3줄 추가해놔야 ajax 잘됩니다.
// 이거 쓰려면 서버프로젝트 터미널에서 npm install cors 설치해야합니다.
// express.json()은 유저가 보낸 array/object 데이터를 출력해보기 위해 필요하고
// cors는 다른 도메인주소끼리 ajax 요청 주고받을 때 필요합니다.

app.use(express.static(path.join(__dirname, 'my-app/build')));

app.get('/', function(요청, 응답){
  응답.sendFile(path.join(__dirname, 'my-app/build/index.html'));
})

// DB에 있던 상품명을 보여주려면?
// 리액트파일에서 상품데이터필요하면 /product로 get요청하면 끝
app.get('/product', function(요청, 응답){
  응답.json({name : 'black shoes'});
})

// 리액트라우터 쓰는 경우 이거 최하단에 추가해놓는게 좋음
app.get('*', function(요청, 응답){
  응답.sendFile(path.join(__dirname, 'my-app/build/index.html'));
})