async function pset_list()
	{
		let rowCount = psetTable.rows.length
		for(let i = 0; i < rowCount; ++i)
			psetTable.deleteRow(0)

		const url = '/plan/api_list'
		const data = {id_house: houseSelect.value}
		if(data.id_house){
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
	}

async function addProblem() 
	{
		const url ='/plan/api_add'
		const data = {'id_pset': psetSelect.value, 'id_house': houseSelect.value}
		const response = await fetch(url, 
			{
				method:'POST',
				headers:{'Content-Type':'application/json'},
				body: JSON.stringify(data)
			})
		if(!response.ok)
			alert('Повтороне значение')
		pset_list()
	}

async function deleteProblems()
	{
		const url = '/plan/api_delete'
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
			await pset_list()
		}
	}




document.addEventListener('DOMContentLoaded', ()=> 
	{
		var psetSelect = document.querySelector('#psetSelect')
		var houseSelect = document.querySelector('#houseSelect')
		var psetTable = document.querySelector('#psetTable') 
		var deleteForm = document.querySelector('#deleteForm')
		var addForm = document.querySelector('#addForm')
		deleteForm.addEventListener('click', deleteProblems)
		addForm.addEventListener('click', addProblem)
		houseSelect.addEventListener('input', pset_list)

	}
)
