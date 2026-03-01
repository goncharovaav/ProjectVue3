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
        <div class="card" :class="{'card-overdue': isOverdue, 'card-ontime': !isOverdue && task.status === 'completed'}">
            <div class="card-content">
                <h3>{{ task.title }}</h3>
                <p class="card-description">{{ task.description }}</p>
                <p class="card-meta">Создана: {{ formatDate(task.createdAt) }}</p>
                <p class="card-meta">Дедлайн: {{ formatDate(task.deadline) }}</p>
                <p v-if="task.updatedAt" class="card-meta">Изменена: {{ formatDate(task.updatedAt) }}</p>
                
                <div v-if="task.status === 'completed'" class="card-meta">
                    <span class="badge" :class="task.isOverdue ? 'overdue' : 'ontime'">
                        {{ task.isOverdue ? 'Просрочена' : 'В срок' }}
                    </span>
                </div>
                
                <div class="card-buttons" v-if="canEdit || canDelete || canMoveForward || canMoveBack">
                    <button v-if="canEdit" class="edit" @click="$emit('edit', task)">Редактировать</button>
                    <button v-if="canDelete" class="delete" @click="$emit('delete', task.id)">Удалить</button>
                    <button v-if="canMoveForward" class="move" @click="moveForward">Вперед</button>
                    <button v-if="canMoveBack" class="return" @click="moveBack">Назад</button>
                </div>
            </div>
        </div>
    `,
    computed: {
        isOverdue() {
            if (!this.task.deadline) return false;
            const deadline = new Date(this.task.deadline);
            const now = new Date();
            return deadline < now && this.task.status !== 'completed';
        },
        canEdit() {
            return this.columnIndex < 3;
        },
        canDelete() {
            return this.columnIndex === 0;
        },
        canMoveForward() {
            return this.columnIndex < 3;
        },
        canMoveBack() {
            return this.columnIndex === 2;
        }
    },
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
        },
        moveForward() {
            this.$emit('move', {
                taskId: this.task.id,
                from: this.columnIndex,
                to: this.columnIndex + 1
            });
        },
        moveBack() {
            const reason = prompt('Укажите причину возврата задачи:');
            if (reason) {
                this.$emit('move', {
                    taskId: this.task.id,
                    from: this.columnIndex,
                    to: this.columnIndex - 1,
                    reason: reason
                });
            }
        }
    }
});

Vue.component('modal-window', {
    props: ['show', 'title', 'task'],
    template: `
        <div class="modal" v-if="show" @click.self="$emit('close')">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>{{ title }}</h3>
                    <button class="modal-close" @click="$emit('close')">X</button>
                </div>
                <div class="modal-body">
                    <input type="text" v-model="localTask.title" placeholder="Заголовок задачи">
                    <textarea v-model="localTask.description" placeholder="Описание задачи"></textarea>
                    <input type="datetime-local" v-model="localTask.deadline">
                </div>
                <div class="modal-footer">
                    <button class="cancel" @click="$emit('close')">Отмена</button>
                    <button class="save" @click="$emit('save', localTask)">Сохранить</button>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            localTask: {
                title: '',
                description: '',
                deadline: ''
            }
        };
    },
    watch: {
        task: {
            handler(newVal) {
                if (newVal) {
                    this.localTask = { ...newVal };
                }
            },
            immediate: true
        }
    }
});
new Vue({
    el: '#app',
    template: '<kanban-board></kanban-board>'
});