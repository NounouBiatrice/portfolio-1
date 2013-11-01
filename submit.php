<?php
    /*Jessica Wicksnin
    To Do List
    This page can delete or add items to a user's to do list.  This page
    redirects to the todo list OR to the start page if the page is
    accessed illegally.*/
    
    include("common.php"); 
    session_start();
    if (isset($_SESSION["username"])) {
        $username = $_SESSION["username"];
        $password = $_SESSION["password"];
        # adds an item if they pressed "add"
        if (isset($_POST["action"])) {
            $action = $_POST["action"];
            if ($action == "add") {
                $newitem = $_POST["item"];
                if (isset($_COOKIE["deleted"])) {
                    $deleted = $_COOKIE["deleted"];
                    if ($deleted == "yes") {
                        file_put_contents("todo_$username.txt", "\n" . $newitem . "\n", FILE_APPEND);
                    } else {
                        file_put_contents("todo_$username.txt", $newitem . "\n", FILE_APPEND);
                    }
                } else {
                    file_put_contents("todo_$username.txt", $newitem . "\n", FILE_APPEND);
                }
                setcookie("deleted", "no");
                header("Location: todolist.php");
                die();
            #delets an item if the user pressed "delete"
            } else if ($action == "delete") {
                $index = $_POST["index"];
                $lines = file("todo_$username.txt", FILE_IGNORE_NEW_LINES);
                unset($lines[$index]);
                if (count($lines) > 0) {
                    $newtext = implode($lines, "\n");
                    setcookie("deleted", "yes");
                } else {
                    $newtext = implode($lines);
                    setcookie("deleted", "no");
                }
                file_put_contents("todo_$username.txt", $newtext);
                header("Location: todolist.php");
                die();
             } 
        }
    #redirects the user back to start if they aren't logged in
    } else {
        back_to_start();
    }
?> 
