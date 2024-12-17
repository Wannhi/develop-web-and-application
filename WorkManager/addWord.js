 // Lắng nghe phím bấm trên ô input
 document.getElementById('task').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') { // Kiểm tra xem phím bấm có phải là Enter không
        addTask(); // Gọi hàm thêm công việc
    }
});
function addTask() {
    // Lấy giá trị công việc từ ô nhập liệu
    let task = document.getElementById('task').value;
    if (task !== '') {
        // Truy xuất danh sách công việc
        let taskList = document.getElementById('taskList');
        
        // Tạo một mục mới trong danh sách
        let listItem = document.createElement('li');
        listItem.textContent = task;
        
        // Đánh dấu hoàn thành khi nhấp vào công việc
        listItem.onclick = function() {
            this.classList.toggle('Completed');
        };
        
        // Tạo nút xóa
        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Xóa';
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = function() {
            taskList.removeChild(listItem);
        };

        // Thêm nội dung và nút xóa vào mục danh sách
        //listItem.appendChild(taskText);
        listItem.appendChild(deleteBtn);

        // Thêm mục vào danh sách
        taskList.appendChild(listItem);

        // Xóa nội dung trong ô nhập liệu
        document.getElementById('task').value = '';
    }
}
