async function lectures_options()
		{
			const url = '/presences/api_lectures';
			const data = {id_house: houseSelect.value};
			const response = await fetch(url, 
			{
				method:'POST',
				headers:{'Content-Type':'application/json'},
				body: JSON.stringify(data)
			})
			const lectures = await response.json()
			lectureSelect.options.length = 1
			for(let row of lectures)
			{
				lectureSelect.options[lectureSelect.options.length] = new Option(row.name + " " + row.date, row.id)
			}
			
			let rowCount = presencesTable.rows.length;
			for(let i = 0; i < rowCount; ++i)
				gradesTable.deleteRow(0);

		}
		
async function presences_rows()
{
	let rowCount = presencesTable.rows.length
	for(let i = 0; i < rowCount; ++i)
		presencesTable.deleteRow(0)

	const url = '/presences/api_presences'
	const data = {id_lecture: lectureSelect.value}
	const response = await fetch(url, 
		{
			method:'POST',
			headers:{'Content-Type':'application/json'},
			body: JSON.stringify(data)
		})
	const presences = await response.json()
							
	rowCount = presences.length
	for(let i = 0; i < rowCount; ++i)
	{
		let row = presencesTable.insertRow();
		let cellLastName = row.insertCell();
		let cellFirstName = row.insertCell() ;
		let cellPresence = row.insertCell();
		cellLastName.innerHTML = presences[i].lastname;
		cellFirstName.innerHTML = presences[i].firstname ;
		if(presences[i].is_present) 
			cellPresence.innerHTML = `<input type=checkbox  value='${presences[i].id}' checked onchange='addPresenceToDb(this.checked, this.value)' >`;
		else
			cellPresence.innerHTML = `<input type=checkbox  value='${presences[i].id}'  onchange='addPresenceToDb(this.checked, this.value)' >`; 
	}
}

async function addPresenceToDb(is_present, id_presence)
{
	const data = {is_present: is_present, id_presence: id_presence};
	const url = '/presences/api_addPresenceToDb';
	await fetch(url, 
		{
			method:'POST',
			headers:{'Content-Type':'application/json'},
			body: JSON.stringify(data)
		}
	);
}


		
document.addEventListener('DOMContentLoaded', ()=>
	{
		var lecturesTable = document.querySelector('#lecturesTable');
		var lectureSelect = document.querySelector('#lectureSelect');
		var houseSelect = document.querySelector('#houseSelect');
		houseSelect.addEventListener('input', lectures_options);
		lectureSelect.addEventListener('input', presences_rows);
	}
)
	
