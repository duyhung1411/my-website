// ==========================================
// PHẦN 3: JAVASCRIPT CƠ BẢN
// ==========================================

// 1. Khai báo mảng object dữ liệu tĩnh (Skills)
const skills = [
    { name: "HTML5 & SCSS", level: "Tốt" },
    { name: "JavaScript", level: "Khá" },
    { name: "Python (Flask) & MySQL", level: "Khá" },
    { name: "Lightroom Classic", level: "Tốt" }
];

// 2. Thao tác DOM để render danh sách kỹ năng (Arrow function)
const renderSkills = () => {
    const tbody = document.getElementById("skills-body");
    // Sử dụng map để tạo chuỗi HTML
    tbody.innerHTML = skills.map(skill => `
        <tr>
            <td>${skill.name}</td>
            <td>${skill.level}</td>
        </tr>
    `).join('');
};

// ==========================================
// PHẦN 4: JAVASCRIPT NÂNG CAO
// ==========================================

// 1 & 2 & 4. Fetch API kết hợp async/await & try/catch
const fetchProjects = async () => {
    try {
        // Lưu ý: Phải chạy qua Live Server (http://) mới fetch được file local
        const response = await fetch('js/data.json');
        if (!response.ok) throw new Error('Không thể tải dữ liệu dự án');
        
        const projects = await response.json();
        const grid = document.getElementById("projects-grid");
        
        // Render dữ liệu ra DOM
        grid.innerHTML = projects.map(proj => `
            <div class="project-card">
                <h3>${proj.ten}</h3>
                <p><strong>Công nghệ:</strong> ${proj.congNghe}</p>
                <p><strong>Năm hoàn thành:</strong> ${proj.namHoanThanh}</p>
            </div>
        `).join('');
    } catch (error) {
        // 4. Xử lý lỗi không làm crash trang
        console.error("Lỗi khi tải dữ liệu:", error);
        document.getElementById("projects-grid").innerHTML = `<p style="color: red;">Đã xảy ra lỗi khi tải danh sách dự án. Vui lòng kiểm tra Console.</p>`;
    }
};

// 3. LocalStorage lưu trạng thái Dark Mode
const initTheme = () => {
    const toggleBtn = document.getElementById("theme-toggle");
    const isDark = localStorage.getItem("darkMode") === "true";
    
    // Kiểm tra trạng thái đã lưu khi tải trang
    if (isDark) document.body.classList.add("dark-mode");

    // Xử lý sự kiện click
    toggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        // Lưu trạng thái vào LocalStorage
        const currentMode = document.body.classList.contains("dark-mode");
        localStorage.setItem("darkMode", currentMode);
    });
};

// ==========================================
// PHẦN 3 (TIẾP): XỬ LÝ SỰ KIỆN FORM
// ==========================================
const handleFormSubmit = () => {
    const form = document.getElementById("contact-form");
    const msg = document.getElementById("form-msg");

    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Ngăn load lại trang
        
        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();

        // Validate bổ sung bằng JS (ngoài HTML5)
        if (name.length < 3) {
            msg.style.color = "red";
            msg.textContent = "Tên phải có ít nhất 3 ký tự.";
            return;
        }

        if (!/^[0-9]{10,11}$/.test(phone)) {
            msg.style.color = "red";
            msg.textContent = "Số điện thoại phải là 10-11 chữ số.";
            return;
        }

        // Thành công
        msg.style.color = "green";
        msg.textContent = `Cảm ơn ${name}, thông tin đã được ghi nhận!`;
        form.reset();
    });
};

// Khởi chạy khi DOM đã tải xong
document.addEventListener("DOMContentLoaded", () => {
    renderSkills();
    fetchProjects();
    initTheme();
    handleFormSubmit();
});