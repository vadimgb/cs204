async function grades_rows()
{
	let rowCount = gradesTable.rows.length
	for(let i = 0; i < rowCount; ++i)
		gradesTable.deleteRow(0)

	const url = '/pending/api_grades'
	const data = {}
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
		let cellHouse = row.insertCell()
		let cellPset = row.insertCell()
		let cellLastName = row.insertCell()
		let cellFirstName = row.insertCell() 
		let cellUrl = row.insertCell()
		let cellGrade = row.insertCell()
		let cellNotes = row.insertCell()
		cellHouse.innerHTML = grades[i].house
		//cellPset.innerHTML = grades[i].id_problemset
		cellPset.innerHTML = `<a href='${grades[i].description}'>${grades[i].name}</a>`
		cellLastName.innerHTML = grades[i].lastname
		cellFirstName.innerHTML = grades[i].firstname 
		if(grades[i].is_done) 
			cellUrl.innerHTML = `<a href='${grades[i].url}' >__________</a>`
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
		var btnPending = document.querySelector('#btnPending')
		btnPending.addEventListener('click', grades_rows)
	}
)
	
