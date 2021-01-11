async function pset_options()
		{
			const url = '/gradebook/api_pset'
			const data = {id_house: houseSelect.value}
			const response = await fetch(url, 
			{
				method:'POST',
				headers:{'Content-Type':'application/json'},
				body: JSON.stringify(data)
			})
			const pset = await response.json()
			psetSelect.options.length = 1
			for(let row of pset)
			{
				psetSelect.options[psetSelect.options.length] = new Option(row.name, row.id)
			}
			
			let rowCount = gradesTable.rows.length
			for(let i = 0; i < rowCount; ++i)
				gradesTable.deleteRow(0)

		}
		
async function grades_rows()
{
	let rowCount = gradesTable.rows.length
	for(let i = 0; i < rowCount; ++i)
		gradesTable.deleteRow(0)

	const url = '/gradebook/api_grades'
	const data = {id_house: houseSelect.value, id_pset: psetSelect.value}
	const response = await fetch(url, 
		{
			method:'POST',
			headers:{'Content-Type':'application/json'},
			body: JSON.stringify(data)
		})
	const grades = await response.json()
							
	rowCount = grades.length
	for(let i = 0; i < rowCount; ++i)
	{
		let row = gradesTable.insertRow()
		let cellLastName = row.insertCell()
		let cellFirstName = row.insertCell() 
		let cellUrl = row.insertCell()
		let cellGrade = row.insertCell()
		let cellNotes = row.insertCell()
		cellLastName.innerHTML = grades[i].lastname
		cellFirstName.innerHTML = grades[i].firstname 
		if(grades[i].is_done) 
			cellUrl.innerHTML = `<a href=${grades[i].url} >__________</a>`
		else cellUrl.innerHTML = ''
		cellGrade.innerHTML = `<input size=1 value='${grades[i].grade}' onchange='addGradeToDb(this.value, ${grades[i].id_character}, ${grades[i].id_problemset})'>`
		cellNotes.innerHTML = `<input size=20 value='${grades[i].notes}' onchange='addNotesToDb(this.value, ${grades[i].id_character}, ${grades[i].id_problemset})'>`
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

async function addNotesToDb(notes, id_character, id_problemset)
{
	const data = {notes: notes, id_character: id_character, id_problemset: id_problemset}
	const url = '/gradebook/api_addNotesToDb'
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
		var psetSelect = document.querySelector('#psetSelect')
		var houseSelect = document.querySelector('#houseSelect')
		houseSelect.addEventListener('input', pset_options)
		psetSelect.addEventListener('input', grades_rows)
	}
)
	
