async function search_rows()
{
	let rowCount = searchTable.rows.length
	for(let i = 0; i < rowCount; ++i)
		searchTable.deleteRow(0)

	const url = '/search/api_search'
	const data = {id_house: houseSelect.value, emailSelect: emailSelect.value, lastnameSelect: lastnameSelect.value}
	const response = await fetch(url, 
		{
			method:'POST',
			headers:{'Content-Type':'application/json'},
			body: JSON.stringify(data)
		})
	const characters = await response.json()
	console.log(characters)
							
	rowCount = characters.length
	for(let i = 0; i < rowCount; ++i)
	{
		let row = searchTable.insertRow()
		let cellLastName = row.insertCell()
		let cellFirstName = row.insertCell() 
		let cellEmail = row.insertCell() 
		let cellHouse = row.insertCell() 
		cellLastName.innerHTML = characters[i].lastname
		cellFirstName.innerHTML = characters[i].firstname 
		cellEmail.innerHTML = `<input value='${characters[i].email}' size=25 onchange='addEmailToDb(this.value, ${characters[i].id})'>`;
		cellHouse.innerHTML = characters[i].house
	}

}

async function addEmailToDb(email, char_id)
{
	const check = prompt('Вы уверены, что хотите именить email? Если да то введите change.', 'no')
	if(check == 'change')
	{
		const url = '/search/api_update_email' 
		const data = {email: email, char_id: char_id} 
		const response = await fetch(url, 
			{ 
				method:'POST', 
				headers:{'Content-Type':'application/json'}, 
				body: JSON.stringify(data) 
			})
	}
}



document.addEventListener('DOMContentLoaded', ()=>
	{
		var searchTable = document.querySelector('#searchTable')
		var emailSelect = document.querySelector('#emailSelect')
		var lastnameSelect = document.querySelector('#lastnameSelect')
		var houseSelect = document.querySelector('#houseSelect')
		var searchBtn = document.querySelector('#searchBtn')

		searchBtn.addEventListener('click', search_rows)
	}
)
	
