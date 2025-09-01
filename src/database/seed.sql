-- Ensure using the right database and schema
\c postgres;
SET search_path TO public;

-- Empty all tables and reset ID counters
TRUNCATE TABLE submissions RESTART IDENTITY CASCADE;
TRUNCATE TABLE challenges RESTART IDENTITY CASCADE;
TRUNCATE TABLE progress RESTART IDENTITY CASCADE;
TRUNCATE TABLE lessons RESTART IDENTITY CASCADE;
TRUNCATE TABLE resources RESTART IDENTITY CASCADE;
TRUNCATE TABLE courses RESTART IDENTITY CASCADE;
TRUNCATE TABLE enrollments RESTART IDENTITY CASCADE;
TRUNCATE TABLE programs RESTART IDENTITY CASCADE;
TRUNCATE TABLE users RESTART IDENTITY CASCADE;


-- Insert programs
INSERT INTO programs (title, description)
VALUES ('JavaScript', 'Learn modern programming with JavaScript.'),
       ('HTML & CSS', 'Learn how to build websites with HTML and CSS.'),
       ('Python', 'Master Python programming for multiple applications.'),
       ('Databases', 'Learn how to design, query, and manage databases.');


-- JavaScript
INSERT INTO courses (program_id, title, description)
VALUES (1, 'JavaScript Fundamentals', 'Variables, data types, and basic operators.'),
       (1, 'JavaScript Functions', 'Learn how to create and use functions.'),
       (1, 'Objects and Arrays', 'Manipulation of data structures.'),
       (1, 'Asynchronous Programming', 'Using callbacks, promises, and async/await.'),
       (1, 'DOM and Events', 'Interaction with the HTML document from JS.');

-- HTML & CSS
INSERT INTO courses (program_id, title, description)
VALUES (2, 'Basic HTML Structure', 'Learn the main tags.'),
       (2, 'HTML Forms', 'Create interactive forms.'),
       (2, 'CSS Fundamentals', 'Selectors, colors, and typography.'),
       (2, 'Flexbox Layout', 'Alignment and distribution of elements.'),
       (2, 'CSS Grid', 'Advanced page layouts with Grid.');

-- Python
INSERT INTO courses (program_id, title, description)
VALUES (3, 'Introduction to Python', 'Basic syntax and first steps.'),
       (3, 'Control Structures', 'Conditionals and loops.'),
       (3, 'Functions and Modules', 'How to organize code into functions and modules.'),
       (3, 'File Handling', 'Reading and writing files.'),
       (3, 'Object-Oriented Programming', 'Classes and objects in Python.');

-- Databases
INSERT INTO courses (program_id, title, description)
VALUES (4, 'Introduction to Databases', 'Fundamental concepts of databases.'),
       (4, 'Relational Modeling', 'Designing tables and relationships.'),
       (4, 'Basic SQL', 'Simple queries with SELECT, INSERT, UPDATE, DELETE.'),
       (4, 'Advanced SQL', 'Joins, subqueries, and aggregate functions.'),
       (4, 'Database Administration', 'User management, backups, and security.');


-- Course 1: JavaScript Fundamentals
INSERT INTO lessons (course_id, title, content, order_index, duration, video_url)
VALUES (1, 'Introducción a JS', 'Historia y usos de JavaScript.', 1, 10, 'https://www.youtube.com/embed/8GTaO9XhA5M?si=Dc1Fhjmj6GT_iP5c'),
       (1, 'Variables y Constantes', 'Uso de var, let y const.', 2, 15, 'https://www.youtube.com/embed/ttpcfZUVKYs?si=AuMv9oB8onFYeq80'),
       (1, 'Tipos de Datos', 'Strings, números y booleanos.', 3, 15, 'https://www.youtube.com/embed/UUv-yBoT_Zk?si=hnPJWAbrPwyldVMS'),
       (1, 'Operadores Básicos', 'Operadores aritméticos y lógicos.', 4, 20, 'https://www.youtube.com/embed/A9TBH7tKwVk?si=x-5bYvwwmSgyqxve'),
       (1, 'Entrada y Salida', 'Uso de alert, prompt y console.log.', 5, 10, 'https://www.youtube.com/embed/-vq7bC0Fhck?si=6zSb_5ID87a6AmeK');

-- Course 2: JavaScript Functions
INSERT INTO lessons (course_id, title, content, order_index, duration)
VALUES (2, 'Definición de funciones', 'Cómo declarar funciones en JavaScript.', 1, 15),
       (2, 'Parámetros y argumentos', 'Paso de datos a funciones.', 2, 20),
       (2, 'Retorno de valores', 'Cómo devolver resultados desde funciones.', 3, 15),
       (2, 'Funciones flecha', 'Sintaxis moderna con =>.', 4, 20),
       (2, 'Ámbito y closures', 'Variables locales y cierres.', 5, 25);

-- Course 3: Objects and Arrays
INSERT INTO lessons (course_id, title, content, order_index, duration)
VALUES (3, 'Creación de objetos', 'Definición de objetos literales.', 1, 15),
       (3, 'Acceso a propiedades', 'Dot notation y bracket notation.', 2, 15),
       (3, 'Métodos de objetos', 'Funciones dentro de objetos.', 3, 20),
       (3, 'Arreglos en JS', 'Creación y manipulación de arrays.', 4, 20),
       (3, 'Métodos de arrays', 'map, filter, reduce, etc.', 5, 25);

-- Course 4: Asynchronous Programming
INSERT INTO lessons (course_id, title, content, order_index, duration)
VALUES (4, 'Callbacks', 'Uso de funciones de retorno.', 1, 15),
       (4, 'Promesas', 'Creación y uso de promesas.', 2, 20),
       (4, 'Async/Await', 'Sintaxis moderna para asincronía.', 3, 20),
       (4, 'Manejo de errores', 'try/catch en asincronía.', 4, 20),
       (4, 'Fetch API', 'Realizar peticiones HTTP.', 5, 25);

-- Course 5: DOM and Events
INSERT INTO lessons (course_id, title, content, order_index, duration)
VALUES (5, 'Introducción al DOM', 'Qué es el DOM y cómo manipularlo.', 1, 15),
       (5, 'Selección de elementos', 'getElementById, querySelector.', 2, 20),
       (5, 'Eventos básicos', 'click, change, submit.', 3, 20),
       (5, 'Manejo de estilos', 'Cambiar CSS desde JS.', 4, 20),
       (5, 'Creación de elementos', 'Crear y añadir nodos al DOM.', 5, 25);

-- Course 6: Basic HTML Structure
INSERT INTO lessons (course_id, title, content, order_index, duration)
VALUES (6, 'Introducción a HTML', 'Historia y conceptos básicos.', 1, 10),
       (6, 'Etiquetas principales', 'p, h1-h6, div, span.', 2, 15),
       (6, 'Listas y enlaces', 'ul, ol, a.', 3, 15),
       (6, 'Imágenes y multimedia', 'img, video, audio.', 4, 20),
       (6, 'Buenas prácticas de estructura', 'HTML semántico.', 5, 20);

-- Course 7: HTML Forms
INSERT INTO lessons (course_id, title, content, order_index, duration)
VALUES (7, 'Introducción a formularios', 'form, input, textarea.', 1, 15),
       (7, 'Tipos de inputs', 'text, password, email, number.', 2, 15),
       (7, 'Select y checkbox', 'Menús y opciones múltiples.', 3, 20),
       (7, 'Botones de formulario', 'submit, reset, button.', 4, 15),
       (7, 'Validación básica', 'required, pattern.', 5, 20);

-- Course 8: CSS Fundamentals
INSERT INTO lessons (course_id, title, content, order_index, duration)
VALUES (8, 'Introducción a CSS', 'Cómo enlazar CSS a HTML.', 1, 10),
       (8, 'Selectores básicos', 'Por etiqueta, clase e id.', 2, 15),
       (8, 'Colores y fondos', 'background, color.', 3, 15),
       (8, 'Tipografía', 'font-family, font-size, line-height.', 4, 20),
       (8, 'Cajas y bordes', 'box model, border, padding, margin.', 5, 20);

-- Course 9: Flexbox Layout
INSERT INTO lessons (course_id, title, content, order_index, duration)
VALUES (9, 'Introducción a Flexbox', 'Conceptos principales.', 1, 15),
       (9, 'Ejes principal y secundario', 'flex-direction, justify-content.', 2, 20),
       (9, 'Alineación de elementos', 'align-items, align-self.', 3, 20),
       (9, 'Distribución de espacio', 'flex-grow, flex-shrink.', 4, 20),
       (9, 'Ejemplos prácticos', 'Layouts con Flexbox.', 5, 25);

-- Course 10: CSS Grid
INSERT INTO lessons (course_id, title, content, order_index, duration)
VALUES (10, 'Introducción a Grid', 'Conceptos principales.', 1, 15),
       (10, 'Definición de filas y columnas', 'grid-template-rows, grid-template-columns.', 2, 20),
       (10, 'Ubicación de elementos', 'grid-row, grid-column.', 3, 20),
       (10, 'Áreas de cuadrícula', 'grid-template-areas.', 4, 20),
       (10, 'Ejemplos prácticos', 'Layouts avanzados con Grid.', 5, 25);

-- Course 11: Introduction to Python
INSERT INTO lessons (course_id, title, content, order_index, duration)
VALUES (11, 'History and uses of Python', 'General context.', 1, 10),
       (11, 'Basic syntax', 'Indentation, print.', 2, 15),
       (11, 'Variables and types', 'Strings, numbers, booleans.', 3, 15),
       (11, 'Basic operators', '+, -, *, /.', 4, 20),
       (11, 'Comments', 'Single-line and multi-line comments.', 5, 10);

-- Course 12: Control Structures
INSERT INTO lessons (course_id, title, content, order_index, duration)
VALUES (12, 'Conditionals', 'if, else, elif.', 1, 15),
       (12, 'While loops', 'Repeated execution.', 2, 20),
       (12, 'For loops', 'Iterating over lists and ranges.', 3, 20),
       (12, 'Break and continue', 'Loop control.', 4, 15),
       (12, 'List comprehensions', 'Short syntax for lists.', 5, 20);

-- Course 13: Functions and Modules
INSERT INTO lessons (course_id, title, content, order_index, duration)
VALUES (13, 'Function definition', 'Using def.', 1, 15),
       (13, 'Parameters and return', 'How to pass and return data.', 2, 20),
       (13, 'Default arguments', 'Optional values.', 3, 15),
       (13, 'Standard modules', 'import math, random.', 4, 20),
       (13, 'Creating custom modules', 'How to split code.', 5, 25);

-- Course 14: File Handling
INSERT INTO lessons (course_id, title, content, order_index, duration)
VALUES (14, 'Opening files', 'open(), modes.', 1, 15),
       (14, 'Reading files', 'read(), readline(), readlines().', 2, 20),
       (14, 'Writing to files', 'write(), writelines().', 3, 20),
       (14, 'Using with', 'Context manager.', 4, 20),
       (14, 'Common errors', 'FileNotFoundError.', 5, 15);

-- Course 15: Object-Oriented Programming
INSERT INTO lessons (course_id, title, content, order_index, duration)
VALUES (15, 'Introduction to OOP', 'Basic concepts.', 1, 15),
       (15, 'Classes and objects', 'How to define classes.', 2, 20),
       (15, 'Methods and attributes', 'Functions and data inside classes.', 3, 20),
       (15, 'Inheritance', 'Reusing classes.', 4, 25),
       (15, 'Polymorphism', 'Overriding methods.', 5, 25);

-- Course 16: Introduction to Databases
INSERT INTO lessons (course_id, title, content, order_index, duration)
VALUES (16, 'What is a database', 'Basic concepts.', 1, 10),
       (16, 'Types of databases', 'Relational vs NoSQL.', 2, 15),
       (16, 'Tables and records', 'Basic structure.', 3, 15),
       (16, 'Primary keys', 'Record identification.', 4, 20),
       (16, 'Foreign keys', 'Relationships between tables.', 5, 20);

-- Course 17: Relational Modeling
INSERT INTO lessons (course_id, title, content, order_index, duration)
VALUES (17, 'Entity-relationship diagrams', 'Graphical representation.', 1, 20),
       (17, 'One-to-one relationships', 'Practical examples.', 2, 15),
       (17, 'One-to-many relationships', 'Practical examples.', 3, 20),
       (17, 'Many-to-many relationships', 'Practical examples.', 4, 20),
       (17, 'Normalization', '1NF, 2NF, 3NF.', 5, 25);

-- Course 18: Basic SQL
INSERT INTO lessons (course_id, title, content, order_index, duration)
VALUES (18, 'SELECT', 'Basic queries.', 1, 15),
       (18, 'INSERT', 'Inserting data.', 2, 15),
       (18, 'UPDATE', 'Updating data.', 3, 15),
       (18, 'DELETE', 'Deleting data.', 4, 15),
       (18, 'WHERE filters', 'Conditions in queries.', 5, 20);

-- Course 19: Advanced SQL
INSERT INTO lessons (course_id, title, content, order_index, duration)
VALUES (19, 'JOINS', 'INNER, LEFT, RIGHT.', 1, 20),
       (19, 'Subqueries', 'Queries inside queries.', 2, 20),
       (19, 'Aggregate functions', 'COUNT, SUM, AVG.', 3, 20),
       (19, 'GROUP BY and HAVING', 'Data grouping.', 4, 20),
       (19, 'Views', 'Creating views.', 5, 20);

-- Course 20: Database Administration
INSERT INTO lessons (course_id, title, content, order_index, duration)
VALUES (20, 'Users and permissions', 'GRANT, REVOKE.', 1, 20),
       (20, 'Backups', 'Data backup.', 2, 20),
       (20, 'Restore', 'Data recovery.', 3, 20),
       (20, 'Query optimization', 'Using indexes.', 4, 25),
       (20, 'Monitoring', 'Performance supervision.', 5, 25);


-- JavaScript Challenges
INSERT INTO challenges (program_id, title, description, difficulty, type, test_cases, hint)
VALUES (1, 'Sum of two numbers', 'Create a function solve(a,b) that returns the sum of two numbers.', 'easy',
        'function', '[{"input":[2,3],"expected":5},{"input":[10,-2],"expected":8}]', 'Remember to use the + operator'),
       (1, 'Reverse a string', 'Create a function solve(str) that reverses a string.', 'medium', 'function',
        '[{"input":["hola"],"expected":"aloh"},{"input":["abc"],"expected":"cba"}]',
        'You can use split, reverse and join'),
       (1, 'Prime number', 'Create a function solve(n) that determines if a number is prime (true/false).', 'hard',
        'function', '[{"input":[7],"expected":true},{"input":[10],"expected":false}]',
        'A prime number is only divisible by 1 and itself');

-- Python Challenges
INSERT INTO challenges (program_id, title, description, difficulty, type, test_cases, hint)
VALUES (3, 'Sum of elements', 'Create solve(list) that returns the sum of a list.', 'easy', 'function',
        '[{"input":[[1,2,3]],"expected":6},{"input":[[10,20]],"expected":30}]', 'You can use sum(list)'),
       (3, 'Factorial', 'Create solve(n) that returns the factorial of n.', 'medium', 'function',
        '[{"input":[5],"expected":120},{"input":[0],"expected":1}]', 'Use recursion or a for loop'),
       (3, 'Fibonacci', 'Create solve(n) that returns the n-th Fibonacci number.', 'hard', 'function',
        '[{"input":[6],"expected":8},{"input":[7],"expected":13}]', 'Start with 0,1 and add the previous numbers');