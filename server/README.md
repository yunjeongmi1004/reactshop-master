# Node+Express 서버와 React 연동하려면

1. 구글검색해서 nodejs 설치
2. 작업폴더만들고 에디터로 오픈
3. server.js 파일을 만들고 아래 코드 작성

> const express = require('express');
> const path = require('path');
> const app = express();
> 
> app.listen(8080, function () {
>  console.log('listening on 8080')
> }); 

4. 터미널을 열어서 npm init -y 입력 
5. npm install express 이것도 입력  
6. 터미널열어서 nodemon server.js를 입력



> html을 서버가 만들면 server-side rendering
> html을 리액트가 만들면 client-side rendering

>> server.js : 어떤 놈이 메인페이지로 접속하면 저거 리액트로 build한 index.html 보내주셈