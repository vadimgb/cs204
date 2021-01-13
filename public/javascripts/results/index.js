async function grades_rows()
{
	let rowCount = gradesTable.rows.length
	for(let i = 0; i < rowCount; ++i)
		gradesTable.deleteRow(0)

	const url = '/results/api_grades'
	const data = {id_house: houseSelect.value}
	const response = await fetch(url, 
		{
			method:'POST',
			headers:{'Content-Type':'application/json'},
			body: JSON.stringify(data)
		})
	const result = await response.json()
							
	const grades = result.gradebook
	const pset = result.pset
	rowCount = grades.length
	for(let i = 0; i < rowCount; ++i)
	{
		let row = gradesTable.insertRow()
		let cellLastName = row.insertCell()
		let cellFirstName = row.insertCell() 
		let cellSurname = row.insertCell() 
		cellLastName.innerHTML = grades[i].lastname
		cellFirstName.innerHTML = grades[i].firstname 
		cellSurname.innerHTML = grades[i].surname
		for(let problem of pset)
		{
			let cellGrade = row.insertCell()
			if(problem['id_problemset'] == 1)
			{ 
				cellGrade.innerHTML = `<input size=1 value='${grades[i].grades[problem['id_problemset']]}' onchange='addGradeToDb(this.value, ${grades[i].id}, ${problem['id_problemset']})'>`;
			}
			else
			{ 
				cellGrade.innerHTML = grades[i].grades[problem['id_problemset']];
			}
		}

	}

	rowCount = psetTable.rows.length
	for(let i = 0; i < rowCount; ++i)
		psetTable.deleteRow(0)

	rowCount = pset.length
	for(let i = 0; i < rowCount; ++i)
	{
		let row = psetTable.insertRow()
		let cellId = row.insertCell()
		let cellName = row.insertCell()
		cellId.innerHTML = pset[i]['id_problemset']
		cellName.innerHTML = pset[i]['name']
	}
}

async function addGradeToDb(grade, id_character, id_problemset)
{
	const data = {grade: grade, id_character: id_character, id_problemset: id_problemset}
	const url = '/gradebook/api_addGradeToDb'
	await fetch(url, 
		{
			method:'POST',
			headers:{'Content-Type':'application/json'},
			body: JSON.stringify(data)
		})
}


document.addEventListener('DOMContentLoaded', ()=>
	{
		var gradesTable = document.querySelector('#gradesTable')
		var houseSelect = document.querySelector('#houseSelect')
		var psetTable = document.querySelector('#psetTable')
		houseSelect.addEventListener('input', grades_rows)
	}
)
	
