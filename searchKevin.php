<?php include("common.php"); ?>
<?= heading1(); ?>
<!-- Jessica Wicksnin
CSE154 Section AH
May 15, 2013
Homework #6 Kevin Bacon 
This page shows the results for the actor's common films with Kevin Bacon
and allows the user to search again-->

<div id="frame">
	<?php top();
	# connect to the database
	$db = new PDO("mysql:dbname=imdb_small", "wicksnin", "password");
	$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	$firstname = $_GET["firstname"];
	$lastname = $_GET["lastname"];

	# searches for the actor's id and name in the database
	$rows = $db->query("SELECT id, first_name, last_name 
		FROM actors 
		WHERE first_name LIKE '$firstname%' AND last_name = '$lastname'
		ORDER BY film_count DESC, id 
		LIMIT 1;");
	?>
	<div id="main">
		<?php if ($rows->rowCount() > 0) { 
			foreach ($rows as $row) { 
				$actor_id = $row["id"];
			} 
			# searches for common movies between the actor and Kevin Bacon
			$rows2 = $db->query("SELECT DISTINCT m.name, m.year
				FROM movies m
				JOIN roles 1r ON 1r.movie_id = m.id
				JOIN actors 1a ON 1a.id = 1r.actor_id
				JOIN roles 2r ON 2r.movie_id = m.id
				JOIN actors 2a ON 2r.actor_id = 2a.id
				WHERE (1a.first_name = 'Kevin' AND 1a.last_name = 'Bacon' AND
				2a.id = '$actor_id')
				OR (1a.id = '$actor_id' AND 2a.first_name = 'Kevin' 
				AND 2a.last_name = 'Bacon')
				ORDER BY m.year DESC;");
			
			#displays common films if they exist
			if ($rows2->rowCount() > 0) { ?>
				<h2><?= $firstname ?> <?= $lastname ?>'s Movies with Kevin Bacon</h2>
				<table>
					<tr><th>#</th><th>Title</th><th>Year</th></tr>
					<?php 
					$count = 0;
					foreach ($rows2 as $row) { 
						$count++;
						if ($count%2 == 0) { ?>
							<tr class="row1">
								<td> <?= $count ?> </td>
								<td> <?= $row["name"] ?> </td>
								<td> <?= $row["year"] ?>  </td>
							</tr>
						<?php } else { ?>
							<tr class="row2">
								<td> <?= $count ?> </td>
								<td> <?= $row["name"] ?> </td>
								<td> <?= $row["year"] ?>  </td>
							</tr>
						<?php } 
					} ?>
				</table>
			<?php } else { ?>
				<!-- Displays if the actor hasn't worked with Keving Bacon -->
				<h2>Sorry!  <?= $firstname ?> <?= $lastname ?> hasn't had the privilege 
				of working with K.B.  Yet.</h2>
			<?php }
		} else { ?> 
			<!-- Displays if the person is not an actor in the database -->
			<h2>Sorry! <?= $firstname ?> <?= $lastname ?> is not real.</h2>
		<?php } 
		searchForms(); ?>
	</div>
	<?= bottom(); ?>
</div>
