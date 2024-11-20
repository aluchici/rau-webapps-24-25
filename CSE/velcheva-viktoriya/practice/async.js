async function uploadFile(){
    const fileInput=document.getElementById("fileInput");
    const file=fileInput.files[0];

    if(!file){
        alert("Please select a file!");
        return;
    }

    const formData=new FormData();
    formData.append("selfieFile",file);
    formData.append("idFile",file);
    formData.append("userId",1);

    try {
        const url="http://localhost:5001/upload";
        const options={
            method: "POST",
            body: formData
        };
        const response=await fetch(url, options);
        const result=await response.json();
        alert(result.message || result.error);
    } catch(error){
        console.error("Error uploading file: ", error);
        alert("File upload failed");
    }
}