<?php 

include("insert.php");
//include("portfolio.php");

?>

<!DOCTYPE html>
<html>
	<head> 
		<title>Jessica's Page</title> 
		 <script src="jquery.js" type="text/javascript"></script>

		<script src="jessicafront.js" type="text/javascript"></script> 
		<link href="jessicafront.css" type="text/css" rel="stylesheet" />
	</head> 

	<body> 
		<?php showHeaders() ?>
		
		
		<?php showMiddle() ?>
		<section id="start" style="display: none;">
				<h2>Welcome!  I do web development...</h2>
				<p>...creatively, optimistically, and determinedly.</p>
				<p>Please check out my portfolio to see my work (Javascript, PHP, Java).</p>
				<p>Let me know if you have any questions or comments.</p>
				<p>Looking forward to talking to you soon!</p>
			</section>
		
		<?php showOptions() ?>
		
			
		

		<footer id="bottom">
			<div id="insidebottom">Design and Development<br>by Jessica Wicksnin 2013<br>(This is a work in progress, so if anything needs improvement, it's only because Downton Abbey came on just when I thought I couldn't type one more div)</div>
		</footer>
	</body>
</html>
