Vue.component('kanban-board', {
    template: `
        <div>
            <h1>Kanban Board</h1>
            <div class="board">
            </div>
        </div>
    `
});

Vue.component('kanban-column', {
    props: ['title', 'tasks', 'index'],
    template: `
        <div class="column">
            <h2>{{ title }}</h2>
            <button v-if="index === 0" class="add-task-btn" @click="$emit('add-click')">
                Добавить задачу
            </button>
        </div>
    `
});

new Vue({
    el: '#app',
    template: '<kanban-board></kanban-board>'
});