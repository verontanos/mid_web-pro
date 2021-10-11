const faculties = [
	{
		name:"Pascasarjana",
		sub: ['Magister Manajemen','Magister Teologi']
	},
	{
		name:"Fakultas Filsafat",
		sub: ['Ilmu Filsafat']
	},
	{
		name:"Fakultas Keguruan dan Ilmu Pendidikan",
		sub: [
			'Pendidikan Agama',
			'Pendidikan Bahasa Inggris',
			'Pendidikan Ekonomi',
			'Pendidikan Luar Sekolah'
			]
	},
	{
		name:"Fakultas Ekonomi dan Bisnis",
		sub: ['Akuntansi', 'Manejemen']
	},
	{
		name:"Fakultas Pertanian",
		sub: ['Agroteknologi']
	},
	{
		name:"Fakultas Ilmu Komputer",
		sub: ['Informatika', 'Sistem Informasi']
	},
	{
		name:"Fakultas Keperawatan",
		sub: ['Profesi Ners', 'Keperawatan']
	},
	{
		name:"Fakultas Filsafat",
		sub: ['Ilmu Filsafat']
	},
]

let students = [
	{
		nim: '105021810002',
		name: 'Mery Heather',
		gender: 'Female',
		facultys: 'Fakultas Ilmu Komputer',
		prody: 'Informatika',
	},
	{
		nim: '1032021910001',
		name: 'Jack Reacher',
		gender: 'Male',
		facultys: 'Fakultas Ekonomi dan Bisnis',
		prody: 'Manejemen',
	},
    {
		nim: '105011810001',
		name: 'John Doe',
		gender: 'Male',
		facultys: 'Fakultas Ilmu Komputer',
		prody: 'Sistem Informasi',
	},

]
//button
const show_hide_form = document.querySelector("#show-hide-button");
const form = document.querySelector("form");

    show_hide_form.addEventListener("click", function(){

	if(form.style.display === "none"){
		form.style.display = "block";
		show_hide_form.textContent = "Hide Form Add New Student";
	}
	else{
		form.style.display = "none";
		show_hide_form.textContent = "Show Form Add New Student";
	}
});

const facultys_option = document.querySelector("#facultys-form");
    for(facultys of faculties){
	let tag = document.createElement('option');
	let text = document.createTextNode(facultys.name);
	tag.appendChild(text);
	facultys_option.appendChild(tag);
}
    let prody = document.querySelector("#prody-form");

    facultys_option.addEventListener('change',function(e){
	let options = e.target.value;

	if(faculties.map((facultys) => facultys.name).indexOf(options) != -1){
	faculties.filter((i) => {
	if(i.name == options){
	prody.innerHTML = '';

	let tag = document.createElement('option');
	let text = document.createTextNode("-- SELECT PRODY --");
	tag.appendChild(text);
	prody.appendChild(tag);

	for(j of i.sub){
	let tag = document.createElement('option');
	let text = document.createTextNode(j);
	tag.appendChild(text);
	prody.appendChild(tag)
				}
			}
		});
	}
	else{
	prody.innerHTML = '';

	let tag = document.createElement('option');
	let text = document.createTextNode("-- SELECT PRODY --");
	tag.appendChild(text);
	prody.appendChild(tag);
	}
});
const submit_button = document.querySelector("#submit-button");
    submit_button.addEventListener('click',() => {
	let student_nim = document.querySelector("#NIM").value;
	let student_name = document.querySelector("#full-name").value;
	let student_gender = document.querySelector('input[name="gender"]:checked').value;
	let student_facultys = document.querySelector("#facultys-form").options[document.querySelector("#facultys-form").selectedIndex].value;
	let student_prody = document.querySelector("#prody-form").options[document.querySelector("#prody-form").selectedIndex].value;;
   

	students.push({
		nim: student_nim,
		name: student_name,
		gender: student_gender,
		facultys: student_facultys,
		prody: student_prody,
	});

	alert(`${student_name} added.`);
	update_student_list();
	document.querySelector("form").reset();
});

const student_list = document.querySelector("#student-list");
function update_student_list(){
	student_list.innerHTML = "";
	for(student of students){

		let tr = document.createElement("tr");

		for(key in student){

			let td = document.createElement("td");
			td.appendChild(document.createTextNode(student[key]));

			tr.appendChild(td);
		}


		let action = document.createElement("td");
		let trash_icon = `<button type="button" onclick="delete_row(this)" class="btn btn-danger"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/> </svg></button>`
		action.innerHTML = trash_icon;
		tr.appendChild(action);

		student_list.appendChild(tr);
	}
}
update_student_list();

function delete_row(btn) {

	var row = btn.parentNode.parentNode;

	student_name = row.getElementsByTagName("td")[1].textContent;
	student_nim = (row.querySelector("tr td").textContent);

	const confirm_delete = confirm(`Are You Sure To Delete ${student_name}?`);
 
	if(confirm_delete == true){		
		students = students.filter((s) =>{
			return s.nim != student_nim;
		});

		update_student_list();

		document.querySelector("#search-student-form").reset();
	}


}

let search_student = document.querySelector("#search-student");

search_student.addEventListener("input",() => {
	if(search_student.length == 0){
		update_student_list();
	}
	else{
		student_list.innerHTML = "";

		let filtered_students = students.filter((s) => {
			return s.name.toLowerCase().includes(search_student.value.toLowerCase());
		});

		for(student of filtered_students){

			let tr = document.createElement("tr");

			for(key in student){

				let td = document.createElement("td");
				td.appendChild(document.createTextNode(student[key]));

				tr.appendChild(td);
			}
			

			let action = document.createElement("td");
			let trash_icon = `<button type="button" onclick="delete_row(this)" class="btn btn-danger"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/> </svg></button>`
			action.innerHTML = trash_icon;
			tr.appendChild(action);

			student_list.appendChild(tr);
		}

	}
});


search_student.addEventListener('keydown',(e) =>{
	if(e.keyCode == 13){
		e.preventDefault();
	}
	return false;
});

const filter_facultys = document.querySelector("#filter-faculty");

for(i of faculties){
	const parent = document.createElement("option");
	const child = document.createTextNode(i.name);
	parent.append(child);
	filter_facultys.appendChild(parent);
}

const filter_facultys_button = document.querySelector("#filter-facultys-button");

filter_facultys_button.addEventListener("click",() => {
	const selected_facultys = filter_facultys.options[filter_facultys.selectedIndex].value

	if(selected_facultys == "-- SELECT FACULTY --"){
		update_student_list();
	}
	else{
		student_list.innerHTML = "";

		const filtered_students = students.filter((s) => {
			return s.facultys == selected_facultys;
		});

		for(student of filtered_students){

			let tr = document.createElement("tr");

			for(key in student){

				let td = document.createElement("td");
				td.appendChild(document.createTextNode(student[key]));

				tr.appendChild(td);
			}
			
			let action = document.createElement("td");
			let trash_icon = `<button type="button" class="btn btn-danger" disabled title="Students Filter Are Only For View Data"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/> </svg></button>`
			action.innerHTML = trash_icon;
			tr.appendChild(action);

			student_list.appendChild(tr);
		}
	}
});

const filter_prody = document.querySelector("#filter-by-prody");

for(i of faculties){

	for(j of i.sub){
		const parent = document.createElement("option");
		const child = document.createTextNode(j);
		parent.append(child);
		filter_prody.appendChild(parent);
	}
}

const filter_prody_button = document.querySelector("#filter-prody-button");

filter_prody_button.addEventListener("click",() => {
	const selected_prody = filter_prody.options[filter_prody.selectedIndex].value

	if(selected_prody == "-- SELECT PROGRAM STUDY --"){
		update_student_list();
	}
	else{
		student_list.innerHTML = "";

		const filtered_students = students.filter((s) => {
			return s.prody == selected_prody;
		});

		for(student of filtered_students){

			let tr = document.createElement("tr");

			for(key in student){

				let td = document.createElement("td");
				td.appendChild(document.createTextNode(student[key]));

				tr.appendChild(td);
			}
			
			let action = document.createElement("td");
			let trash_icon = `<button type="button" class="btn btn-danger" disabled title="Students Filter Are Only For View Data"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/> </svg></button>`
			action.innerHTML = trash_icon;
			tr.appendChild(action);

			student_list.appendChild(tr);
		}
	}
});