const BASE_URL = "https://fakestoreapi.com";

const postData = async(path,data)=>{
    try {
        const response = await fetch(`${BASE_URL}/${path}`,{
            method:'POST',
            body:JSON.stringify(data),
            headers:{"Content-Type":"application/json"}
        });
        
        const json = await response.json();
        
        return json;
    } catch (error) {
        alert("An Error accured");
    }


};
const getData = async(path)=>{
    try {
        const response = await fetch(`${BASE_URL}/${path}`);
        const json = response.json();
        return json;
    } catch (error) {
        alert("The error is happend please try again");
    }
}

export {postData,getData} ;


