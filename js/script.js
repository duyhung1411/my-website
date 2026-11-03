// Dữ liệu tĩnh mảng object
const skills = [
    { name: "HTML5 & SCSS", level: "Tốt" },
    { name: "JavaScript", level: "Khá" },
    { name: "Python (Flask) & MySQL", level: "Khá" },
    { name: "Lightroom Classic", level: "Tốt" }
];

// Thao tác DOM để tạo danh sách kỹ năng
const renderSkills = () => {
    const tbody = document.getElementById("skills-body");
    tbody.innerHTML = skills.map(skill => `
        <tr>
            <td>${skill.name}</td>
            <td>${skill.level}</td>
        </tr>
    `).join('');
};

// Fetch API kết hợp async/await & try/catch
const fetchProjects = async () => {
    try {
        const response = await fetch('js/data.json');
        if (!response.ok) throw new Error('Network response was not ok');
        
        const projects = await response.json();
        const grid = document.getElementById("projects-grid");
        
        grid.innerHTML = projects.map(proj => `
            <div class="project-card">
                <h3>${proj.ten}</h3>
                <p><strong>Công nghệ:</strong> ${proj.congNghe}</p>
                <p><strong>Năm hoàn thành:</strong> ${proj.namHoanThanh}</p>
            </div>
        `).join('');
    } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
        document.getElementById("projects-grid").innerHTML = `<p style="color: red;">Đã xảy ra lỗi khi tải danh sách dự án.</p>`;
    }
};

// LocalStorage lưu trạng thái Dark Mode
const initTheme = () => {
    const toggleBtn = document.getElementById("theme-toggle");
    const isDark = localStorage.getItem("darkMode") === "true";
    
    if (isDark) document.body.classList.add("dark-mode");

    toggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
    });
};

// Xử lý sự kiện submit Form bổ sung validate
const handleFormSubmit = () => {
    const form = document.getElementById("contact-form");
    const msg = document.getElementById("form-msg");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const name = document.getElementById("name").value.trim();
        if (name.length < 3) {
            msg.style.color = "red";
            msg.textContent = "Tên phải có ít nhất 3 ký tự.";
            return;
        }

        msg.style.color = "green";
        msg.textContent = `Cảm ơn bạn, thông tin đã được ghi nhận!`;
        form.reset();
    });
};

document.addEventListener("DOMContentLoaded", () => {
    renderSkills();
    fetchProjects();
    initTheme();
    handleFormSubmit();
});