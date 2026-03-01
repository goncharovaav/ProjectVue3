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

Vue.component('task-card', {
    props: ['task', 'columnIndex'],
    template: `
        <div class="card">
            <div class="card-content">
                <h3>{{ task.title }}</h3>
                <p class="card-description">{{ task.description }}</p>
                <p class="card-meta">Создана: {{ formatDate(task.createdAt) }}</p>
                <p class="card-meta">Дедлайн: {{ formatDate(task.deadline) }}</p>
            </div>
        </div>
    `,
    methods: {
        formatDate(dateString) {
            if (!dateString) return '';
            return new Date(dateString).toLocaleString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            });
        }
    }
});
new Vue({
    el: '#app',
    template: '<kanban-board></kanban-board>'
});