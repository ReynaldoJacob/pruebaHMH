<template>
<div>
    <br>
    <center>
        <h2 class="title">To Do List</h2>
    </center>

    <div class="container">
        <b-field label="New Task">
            <b-input type="text" v-model="newTaskTitle" placeholder="Add new task" rounded></b-input>
        </b-field>
        <b-button type="is-success" @click="addTask"><b-icon icon="plus" size="is-small"></b-icon></b-button>
    </div>
    <div class="container">
        <table class="table" style="width: 100%;">
            <thead>
                <tr>
                    <th><abbr title="Position">ID</abbr></th>
                    <th width="70%"><abbr title="Played">Title</abbr></th>
                    <th><abbr>Status</abbr></th>
                    <th><abbr title="Won">Actions</abbr></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="task in sortedTasks" :key="task.id">
                    <td>{{task.id}}</td>
                    <td><span class="taskPending" :class="{ 'task-done': task.done, 'task-completed': task.done }">{{ task.title }}</span></td>
                    <td>
                        <div class="taskPending" :class="{ 'task-done': task.done, 'task-completed': task.done }">{{ task.done ? 'Complete' : 'Pending' }}</div>
                    </td>
                    <b-dropdown :triggers="['hover']" aria-role="list">
                        <template #trigger>
                            <b-button label="Actions" type="is-info" icon-right="menu-down" />
                        </template>
                        <b-dropdown-item aria-role="listitem" @click="toggleTaskDone(task.id)">{{ task.done ? 'Pending' : 'Complete' }}</b-dropdown-item>
                        <b-dropdown-item aria-role="listitem" @click="modalEdit(task.id)">Edit</b-dropdown-item>
                        <b-dropdown-item aria-role="listitem" @click="deleteTask(task.id)">Delete</b-dropdown-item>
                    </b-dropdown>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</template>

<script>
import {
    DialogProgrammatic as Dialog
} from 'buefy'

export default {
    data() {
        return {
            tasks: [],
            newTaskTitle: '',
            nextTaskId: 1,
            editingTaskId: null,
            editedTaskTitle: ''
        };
    },
    computed: {
        sortedTasks() {
            const sorted = [...this.tasks];
            sorted.sort((a, b) => {
                // Ordenar primero por estado pendiente y luego por ID
                if (a.done && !b.done) {
                    return 1;
                } else if (!a.done && b.done) {
                    return -1;
                } else {
                    return a.id - b.id;
                }
            });
            return sorted;
        }
    },
    methods: {
        modalEdit(taskId) {
            const task = this.tasks.find(task => task.id === taskId);
            if (task) {
                this.editingTaskId = task.id;
                this.editedTaskTitle = task.title;
            }
            Dialog.prompt({

                message: `Edit Text`,
                inputAttrs: {
                    value: this.editedTaskTitle,
                    maxlength: 50
                },
                trapFocus: true,
                onConfirm: (value) => {
                    this.$buefy.toast.open(`The new text is: ${value}`)
                    console.log(value);
                    this.saveTask(value);
                }

            })
        },
        addTask() {
            if (this.newTaskTitle.trim() !== '') {
                const newTask = {
                    id: this.nextTaskId++,
                    title: this.newTaskTitle,
                    done: false
                };
                this.tasks.push(newTask);
                this.newTaskTitle = '';
            }
        },
        toggleTaskDone(taskId) {
            const task = this.tasks.find(task => task.id === taskId);
            if (task) {
                task.done = !task.done;
            }
        },
        editTask(taskId) {
            const task = this.tasks.find(task => task.id === taskId);
            if (task) {
                this.editingTaskId = task.id;
                this.editedTaskTitle = task.title;
            }
        },
        saveTask(value) {
            const task = this.tasks.find(task => task.id === this.editingTaskId);
            if (task) {
                task.title = value;
                this.cancelEdit();
            }
        },
        cancelEdit() {
            this.editingTaskId = null;
            this.editedTaskTitle = '';
        },
        deleteTask(taskId) {
            const index = this.tasks.findIndex(task => task.id === taskId);
            if (index !== -1) {
                this.tasks.splice(index, 1);
            }
        }
    }
};
</script>

<style>
.taskPending {
    border-radius: 13px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 1s ease;
}

.task-done {
    border-radius: 13px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 1s ease;

}

.task-completed {
    background-color: #17A589;
    color: white;
    transition: all 1s ease;
}
</style>
