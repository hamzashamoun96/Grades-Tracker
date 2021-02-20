'use strict';

var trigger;

var btn = document.getElementById('btn')
var table = document.getElementById('table');
var form = document.getElementById('form');
form.addEventListener('submit', AddStudent);



function AddStudent(evt) {
    evt.preventDefault();
    console.log(evt);

    var SName = evt.target.StudentName.value;
    var SCourse = evt.target.Course.value;

    var NewStudent = new Students(SName, SCourse);

    localStorage.setItem('StudentsDATA', JSON.stringify(StudentArray));

    if (trigger) {
        Render();
    }

    NewStudent.DataRender();
    trigger = false;
}

var ThArray = ['Students Name', 'Students Grades', 'Course','Staute']
var StudentArray = [];

function Students(StudentName, course) {
    this.StudeNtname = StudentName;
    this.course = course;
    this.StudentGrade = GenerateGrades();
    StudentArray.push(this);
}
Students.prototype.DataRender = function () {
    var StudentRow = document.createElement('tr');
    table.appendChild(StudentRow);

    var td = document.createElement('td');
    StudentRow.appendChild(td);
    td.textContent = this.StudeNtname;

    var td2 = document.createElement('td');
    StudentRow.appendChild(td2);
    td2.textContent = this.StudentGrade;

    var td3 = document.createElement('td');
    StudentRow.appendChild(td3);
    td3.textContent = this.course;

    if(this.StudentGrade >= 50){
        var td4 = document.createElement('td');
        StudentRow.appendChild(td4);
        td4.textContent = ' Pass ';
    }else{
        var td4 = document.createElement('td');
        StudentRow.appendChild(td4);
        td4.textContent = 'Fail';
    }
}

function GenerateGrades() {
    return Math.floor(Math.random() * 100);
}

function Render() {
    var trHead = document.createElement('tr');
    table.appendChild(trHead);

    for (var i = 0; i < ThArray.length; i++) {
        var th = document.createElement('th');
        trHead.appendChild(th);
        th.textContent = ThArray[i];
    }
}

function LocalStorage() {
    if (localStorage.getItem('StudentsDATA')) {
        Render();
        var DataFromLS = JSON.parse(localStorage.getItem('StudentsDATA'));
        var OldStudents;
        for (var i = 0; i < DataFromLS.length; i++) {
            OldStudents = new Students(DataFromLS[i].StudeNtname, DataFromLS[i].course);
            OldStudents.DataRender();
        }

    } else {
        trigger = true;
    }
}
LocalStorage();

btn.addEventListener('click' , ClearData);
function ClearData(event){
    event.preventDefault();
localStorage.removeItem('StudentsDATA');
table.innerHTML = '';
Render();
trigger = true;
}