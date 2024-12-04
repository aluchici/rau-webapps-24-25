document.getElementById('form').addEventListener('submit',function(event){
    event.preventDefault();

    const username=document.getElementById('username').value;
    const password=document.getElementById('password').value;
    const confirm_password=document.getElementById('confirm_password').value;
    const errormessage=document.getElementById('error-message');

    if(password!=confirm_password){
        errormessage.textContent="Parolite ne suvpadat!";
        return;
    }

    alert("Registraciqta beshe uspeshna!");
})