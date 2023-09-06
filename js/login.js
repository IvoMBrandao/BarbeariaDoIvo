let email = document.getElementById("email")
let senha = document.getElementById("senha")
let buttonLogin= document.getElementById("btn-entrar")


buttonLogin.addEventListener('click', () => {
  
    let userEmail  = email.value;
    let userSenha= senha.value;
    if(!userEmail || !userSenha){
      
      alert('login e senha obrigatorios')
        return;
    }

   autenticar(userEmail,userSenha)

 window.open('usuario.html', '_selfe')
   
});

function autenticar(email,senha){
 const url=`http://localhost:3400`;
 fetch(`${url}/login`,{
  method:'POST',
  body: JSON.stringify({email,senha})
 }).then(response => response.json())
 .then(response => console.log(response))
 .catch(erro = console.log(erro))
}