<?php 

    if(isset($_POST['btn-send']))
    {
       $Name = $_POST['name'];
       $Surnmae = $_POST['surname']
       $Email = $_POST['email'];
       $Phonenumber = $_POST['number'];
       $Request = $_POST['request'];

       if(empty($Name) || empty($Email) || empty($Phonenumber) || empty($Request))
       {
           header('location:contacts.php?error');
       }
       else
       {
           $to = "ogoayorindeshekinah@gmail.com";

           if(mail($to,$Phonenumber,$Request,$Email))
           {
               header("location:contacts.php?success");
           }
       }
    }
    else
    {
        header("location:index.php");
    }
?>