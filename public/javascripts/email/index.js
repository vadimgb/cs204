async function sendEmails() 
		{
			const url ='/email/api_email';
			const data = {id_house: houseSelect.value, subject: subject.value, message: message.value};
			const result1 = await fetch(url, 
				{
					method:'POST',
					headers:{'Content-Type':'application/json'},
					body: JSON.stringify(data)
				})
			const email_info = await result1.json()
			resMsg.innerHTML = 'List of errors:'
			for(const err of email_info.errors)
			{
				
				resMsg.innerHTML += `<br>  ${JSON.stringify(err)}`
			}
			resMsg.innerHTML += '<br>List of info:'
			for(const info1 of email_info.infos)
			{
				const str1 = "<br>" + JSON.stringify(info1) 
				resMsg.innerHTML += str1 
			}
			message.value = ''
			subject.value = ''
		}



document.addEventListener('DOMContentLoaded', ()=>
	{
		var subject = document.querySelector('#subject')
		var message = document.querySelector('#message')
		var houseSelect = document.querySelector('#houseSelect')
		var sendBtn = document.querySelector('#send')
		var resMsg = document.querySelector('#resMsg')
		sendBtn.addEventListener('click', sendEmails)
	}
)

