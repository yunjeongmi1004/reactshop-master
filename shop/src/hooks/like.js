import {useState} from "react"


//custom hook
export function useLike(){
    // custom hook 함수 코드명을  use로 시작하는 이유 : 코드에 use어쩌구()가 들어있으면 함수 이름이 use로 시작해야함

    let[like, setLike] = useState(0);
    function addLike(){
    setLike(a => a + 1)
    }

    return [like, addLike];
}





