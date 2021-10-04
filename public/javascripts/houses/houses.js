var housesTable 
var houseInput 
var addForm 
var deleteForm
		
async function houses_list()
		{
			let rowCount = housesTable.rows.length
			for(let i = 0; i < rowCount; ++i)
				housesTable.deleteRow(0)

			const url = '/houses/api_list'
			const data = {}
			const response = await fetch(url, 
			{
				method:'POST',
				headers:{'Content-Type':'application/json'},
				body: JSON.stringify(data)
			})
			const houses = await response.json()
			console.log(houses)
							
			rowCount = houses.length
			for(let i = 0; i < rowCount; ++i)
			{
				let row = housesTable.insertRow()
				let cellName = row.insertCell()
				let cellIsActive = row.insertCell()
				let cellRemove = row.insertCell() 
				cellName.innerHTML = houses[i].house
				cellIsActive.innerHTML = houses[i].is_active
				cellRemove.innerHTML = `<input class=messageCheckbox type=checkbox name='remove_list[]' ${(houses[i].id == 1)?"disabled":""} value=${houses[i].id} /> `
			}
		}

async function addHouse() 
		{
			const url ='/houses/api_add';
			const data = {house: houseInput.value};
			const result = await fetch(url, 
				{
					method:'POST',
					headers:{'Content-Type':'application/json'},
					body: JSON.stringify(data)
				})
			houses_list()
		}


async function deleteHouses()
	{
		const check = prompt('Вы уверены, что их надо удалить? Если да то введите kill.', 'no')
		if(check == 'kill')
		{
			const url = '/houses/api_delete'
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
				await houses_list()
			}
		}
	}


document.addEventListener('DOMContentLoaded', ()=>
	{
	housesTable = document.querySelector('#housesTable')
	houseInput = document.querySelector('#houseInput')
	addForm = document.querySelector('#addForm')
	deleteForm = document.querySelector('#deleteForm')

			
	addForm.addEventListener('click', addHouse)
	deleteForm.addEventListener('click', deleteHouses)
	houses_list()	
})
