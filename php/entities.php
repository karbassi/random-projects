<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN">
<html lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <title>Entities</title>
  <style type="text/css" media="screen">
    ul { list-style-type:none; }
    li { width:200px; margin:15px 0 0 0; line-height:10px; float:left; }
    li span { width: 30px; padding: 0 3px; display: inline-block;}
    li.odd{ color:#888; }
  </style>
</head>
<body>
  <ul>
    <?php
    $s = $_GET['s'] || 0;
    $e = $_GET['e'] || 1000;
    for ($i=$_GET['s']; $i <= $_GET['e']; $i++) { 
      echo '<li><span>&#', $i, ';</span> = <span>&amp;#', i, ';</span></li>', "\n";
    }
    ?>
  </ul>

</body>
</html>
