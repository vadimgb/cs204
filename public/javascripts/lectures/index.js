async function lectures_list()
	{
		let rowCount = lecturesTable.rows.length
		for(let i = 0; i < rowCount; ++i)
			lecturesTable.deleteRow(0)

		const url = '/lectures/api_list'
		const data = {id_house: houseSelect.value}
		if(data.id_house){
			const response = await fetch(url, 
			{
				method:'POST',
				headers:{'Content-Type':'application/json'},
				body: JSON.stringify(data)
			})
			const lectures = await response.json()
								
			rowCount = lectures.length
			for(let i = 0; i < rowCount; ++i)
			{
				let row = lecturesTable.insertRow()
				let cellName = row.insertCell()
				let cellDate = row.insertCell()
				let cellRemove = row.insertCell() 
				cellName.innerHTML = lectures[i].name;
				cellDate.innerHTML = lectures[i].date;
				cellRemove.innerHTML = `<input class=messageCheckbox type=checkbox name='remove_list[]' value=${lectures[i].id} /> `
			}
		}
	}

async function addLecture() 
	{
		const url ='/lectures/api_add'
		const data = {'id_subject': subjectSelect.value, 'id_house': houseSelect.value}
		const response = await fetch(url, 
			{
				method:'POST',
				headers:{'Content-Type':'application/json'},
				body: JSON.stringify(data)
			})
		if(!response.ok)
			alert('Повтороне значение')
		lectures_list()
	}

async function deleteLectures()
	{
		const url = '/lectures/api_delete'
		const remove_list = [] 
		const chboxes = document.getElementsByName('remove_list[]')
		const len = chboxes.length
		for(let i = 0; i < len; ++i)
		{
			if(chboxes[i].checked) remove_list.push(chboxes[i].value)
		}
		if(remove_list.length)
		{
			const data = {'remove_list': remove_list, 'id_house': houseSelect.value}
			await fetch(url, 
			{
				method:'POST',
				headers:{'Content-Type':'application/json'},
				body: JSON.stringify(data)
			})
			await lectures_list()
		}
	}




document.addEventListener('DOMContentLoaded', ()=> 
	{
		var subjectSelect = document.querySelector('#subjectSelect')
		var houseSelect = document.querySelector('#houseSelect')
		var lecturesTable = document.querySelector('#lecturesTable') 
		var deleteForm = document.querySelector('#deleteForm')
		var addForm = document.querySelector('#addForm')
		deleteForm.addEventListener('click', deleteLectures)
		addForm.addEventListener('click', addLecture)
		houseSelect.addEventListener('input', lectures_list)

	}
)
