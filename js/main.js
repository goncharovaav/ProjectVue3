Vue.component('kanban-board', {
    template: `
        <div>
            <h1>Kanban Board</h1>
            <div class="board">
            </div>
        </div>
    `
});

new Vue({
    el: '#app',
    template: '<kanban-board></kanban-board>'
});