USERS       (id, name, email, password, role)                   // USUARIOS
COURSES     (id, title, description, price, instructor_id)      // CURSOS
LESSONS     (id, course_id, title, video_url, content)          // LECCIONES
PURCHASES   (id, user_id, course:id, purchase_date)             // COMPRAS
PROGRESS    (id, user_id, lesson_id, completed_id)              // PROGRESO 