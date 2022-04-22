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
				cellGrade.innerHTML = `<div title=${problem['name']}>${grades[i].grades[problem['id_problemset']]}</div>`;
			}
		}
		
		let cellRemove = row.insertCell() 
		cellRemove.innerHTML = `<input class=messageCheckbox type=checkbox name='remove_list[]' value='${grades[i].id}'/>`
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

async function deleteCharacters()
{
	const check = prompt('Вы уверены, что их надо удалить? Если да то введите kill.', 'no')
	if(check == 'kill')
	{
		const url = '/results/api_delete'
		const remove_list = [] 
		const chboxes = document.getElementsByName('remove_list[]')
		const len = chboxes.length
		for(let i = 0; i < len; ++i)
		{
			if(chboxes[i].checked) remove_list.push(chboxes[i].value)
		}
		if(remove_list.length)
		{
			const data = {'remove_list': remove_list}
			await fetch(url, 
			{
				method:'POST',
				headers:{'Content-Type':'application/json'},
				body: JSON.stringify(data)
			})
			await grades_rows()
		}
	}
}

document.addEventListener('DOMContentLoaded', ()=>
	{
		var gradesTable = document.querySelector('#gradesTable')
		var houseSelect = document.querySelector('#houseSelect')
		var psetTable = document.querySelector('#psetTable')
		var deleteBtn = document.querySelector('#deleteBtn')
		houseSelect.addEventListener('input', grades_rows)
		deleteBtn.addEventListener('click', deleteCharacters)
	}
)


