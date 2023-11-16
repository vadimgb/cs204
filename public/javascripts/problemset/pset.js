var psetTable 
var nameInput 
var addForm 
var deleteForm
		
async function pset_list()
		{
			let rowCount = psetTable.rows.length
			for(let i = 0; i < rowCount; ++i)
				psetTable.deleteRow(0)

			const url = '/problemset/api_list'
			const data = {}
			const response = await fetch(url, 
			{
				method:'POST',
				headers:{'Content-Type':'application/json'},
				body: JSON.stringify(data)
			})
			const pset = await response.json()
							
			rowCount = pset.length
			for(let i = 0; i < rowCount; ++i)
			{
				let row = psetTable.insertRow()
				let cellName = row.insertCell()
				let cellRemove = row.insertCell() 
				cellName.innerHTML = pset[i].name
				cellRemove.innerHTML = `<input class=messageCheckbox type=checkbox name='remove_list[]' value=${pset[i].id} /> `
			}
		}

async function addProblem() 
		{
			const url ='/problemset/api_add';
			const data = {name: nameInput.value, description: description.value};
			const result = await fetch(url, 
				{
					method:'POST',
					headers:{'Content-Type':'application/json'},
					body: JSON.stringify(data)
				})
			pset_list()
		}


async function deleteProblems()
		{
			const url = '/problemset/api_delete'
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
				await pset_list()
			}
		}


document.addEventListener('DOMContentLoaded', ()=>
	{
	psetTable = document.querySelector('#psetTable')
	nameInput = document.querySelector('#nameInput')
	addForm = document.querySelector('#addForm')
	deleteForm = document.querySelector('#deleteForm')

			
	addForm.addEventListener('click', addProblem)
	deleteForm.addEventListener('click', deleteProblems)
	pset_list()	
})
