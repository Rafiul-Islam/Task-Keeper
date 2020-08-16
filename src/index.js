import './index.css';

window.onload = function () {
    let taskInputField = document.querySelector("#taskInputField");
    let taskList = document.querySelector("#taskList");
    let addTaskButton = document.querySelector("#addTaskButton");

    taskInputField.addEventListener("keypress", (event) => {
        if (event.keyCode === 13) {
            taskList.appendChild(createNewTask(taskList, event.target.value));
            event.target.value = "";
        }
    });

    addTaskButton.addEventListener('click', () => {
        taskList.appendChild(createNewTask(taskList, taskInputField.value));
        taskInputField.value = "";
    })

}

function createNewTask(taskList, task) {

    let col = create({'class': 'col-sm-3'})
    let singleTask = create({'class': 'single-task d-flex '})
    let singleTaskP = create('p')
    singleTaskP.innerHTML = task;
    singleTask.appendChild(singleTaskP)

    let closeButton = create('span', {'class': 'ml-auto'})
    closeButton.innerHTML = `<i class="fas fa-times-circle" title="Remove task"></i>`;
    closeButton.style.cursor = 'pointer';
    closeButton.addEventListener("click", () => {
        taskList.removeChild(col);
    });
    singleTask.appendChild(closeButton)

    let taskController = createTaskController(singleTask);
    taskController.style.visibility = 'hidden'
    singleTask.appendChild(taskController)
    singleTask.onmouseenter = () => {
        taskController.style.visibility = 'visible'
    }
    singleTask.onmouseleave = () => {
        taskController.style.visibility = 'hidden'
    }

    col.appendChild(singleTask)
    taskList.appendChild(col)

    return col
}

function createTaskController(singleTask) {
    let controlPanel = create({'class': 'task-control-panel d-flex align-items-center '});

    controlPanel.appendChild(selectTaskBackgroundColor(singleTask))
    controlPanel.appendChild(onEditButtonClick(singleTask))

    return controlPanel
}

function selectTaskBackgroundColor(singleTask) {
    const colors = ['salmon', 'LightGrey', 'MediumTurquoise', 'Gold', 'Aquamarine']

    let colorDiv = create({'class': 'd-flex'})

    colors.forEach(color => {
        let div = create({'class': 'color-circle'})
        div.style.background = color;
        div.style.cursor = 'pointer';
        div.addEventListener('click', () => {
            singleTask.style.background = color;
        })
        colorDiv.appendChild(div)
    })

    return colorDiv;
}

function onEditButtonClick(singleTask){

    let editButton = create('span', {'class': 'ml-auto mr-2'})
    editButton.innerHTML = `<i class="fas fa-edit" style="color: white;" title="Edit task"></i>`;
    editButton.style.cursor = 'pointer';

    editButton.addEventListener('click', ()=>{
        let p = singleTask.querySelector('p')
        let textArea = create('textarea', {'class': 'inner-textarea'})
        textArea.style.width = singleTask.offsetWidth + 'px';
        textArea.style.height = singleTask.offsetHeight+ 'px';
        textArea.innerHTML = p.innerHTML;

        textArea.addEventListener("keypress", (event) => {
            if (event.keyCode === 13) {
                event.stopPropagation()
                if (event.target.value){
                    p.innerHTML = event.target.value;
                    singleTask.removeChild(textArea)
                }else {
                    alert('Empty task. Please put some data.')
                }
            }
        });

        singleTask.appendChild(textArea)
    })

    return editButton
}

window.create = function () {

    if (arguments.length === 0) {
        return document.createElement('div');
    }

    if (arguments.length === 1 && typeof arguments[0] != 'object') {
        return document.createElement(arguments[0]);
    }

    var tag = arguments[0];
    var attr = arguments[1] || arguments[0];

    if (arguments.length === 1 && typeof arguments[0] === 'object') {
        tag = 'div';
    }

    var element = document.createElement(tag);

    for (var i in attr) {
        element.setAttribute(i, attr[i]);
    }

    return element;
}

