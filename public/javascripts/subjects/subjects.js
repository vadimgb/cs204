var subjectsTable 
var nameInput 
var addForm 
var deleteForm
		
async function subjects_list()
		{
			let rowCount = subjectsTable.rows.length
			for(let i = 0; i < rowCount; ++i)
				subjectsTable.deleteRow(0)

			const url = '/subjects/api_list'
			const data = {}
			const response = await fetch(url, 
			{
				method:'POST',
				headers:{'Content-Type':'application/json'},
				body: JSON.stringify(data)
			})
			const subjects = await response.json()
							
			rowCount = subjects.length
			for(let i = 0; i < rowCount; ++i)
			{
				let row = subjectsTable.insertRow()
				let cellName = row.insertCell()
				let cellRemove = row.insertCell() 
				cellName.innerHTML = subjects[i].name
				cellRemove.innerHTML = `<input class=messageCheckbox type=checkbox name='remove_list[]' value=${subjects[i].id} /> `
			}
		}

async function addSubject() 
		{
			const url ='/subjects/api_add';
			const data = {name: nameInput.value};
			const result = await fetch(url, 
				{
					method:'POST',
					headers:{'Content-Type':'application/json'},
					body: JSON.stringify(data)
				})
			if(!result.ok)
				alert('Повтороне значение')
			subjects_list()
		}


async function deleteSubjects()
		{
			const url = '/subjects/api_delete'
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
				await subjects_list()
			}
		}


document.addEventListener('DOMContentLoaded', ()=>
	{
	subjectsTable = document.querySelector('#subjectsTable')
	nameInput = document.querySelector('#nameInput')
	addForm = document.querySelector('#addForm')
	deleteForm = document.querySelector('#deleteForm')

			
	addForm.addEventListener('click', addSubject)
	deleteForm.addEventListener('click', deleteSubjects)
	subjects_list()	
})
